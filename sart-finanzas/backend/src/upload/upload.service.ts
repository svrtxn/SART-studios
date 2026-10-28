import { Injectable, Logger } from '@nestjs/common';
// @ts-ignore
const pdfParse = require('pdf-parse');
import * as crypto from 'crypto';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  /**
   * Generate password variations from a RUT.
   * Chilean banks commonly use these as PDF passwords:
   * - Full RUT with dots and dash: 12.345.678-9
   * - RUT without dots: 12345678-9
   * - RUT numbers only: 123456789
   * - Last 4 digits before verifier: 5678
   * - First 4 digits: 1234
   * - RUT body (no verifier): 12345678
   */
  private generateRutPasswords(rut: string): string[] {
    if (!rut) return [];
    
    const clean = rut.replace(/[.\-\s]/g, ''); // e.g. "215860906"
    const body = clean.slice(0, -1); // e.g. "21586090"
    const verifier = clean.slice(-1); // e.g. "6"
    const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + verifier; // "21.586.090-6"
    const noDotsWithDash = body + '-' + verifier; // "21586090-6"
    const last4 = body.slice(-4); // "6090"
    const first4 = body.slice(0, 4); // "2158"

    return [
      clean,           // 215860906
      body,            // 21586090
      formatted,       // 21.586.090-6
      noDotsWithDash,  // 21586090-6
      last4,           // 6090
      first4,          // 2158
      rut,             // original as-is
    ];
  }

  /**
   * Try to parse a PDF with multiple password attempts.
   */
  private async parsePdfWithPasswords(buffer: Buffer, rut?: string): Promise<any> {
    // First try without password
    try {
      const data = await pdfParse(buffer);
      return data;
    } catch (err: any) {
      if (!err.message?.includes('password') && err.code !== 1) {
        throw err;
      }
      this.logger.warn('PDF is password-protected. Attempting RUT-based passwords...');
    }

    // Generate password candidates from RUT
    const passwords = this.generateRutPasswords(rut || '');
    
    if (passwords.length === 0) {
      throw new Error(
        'El PDF está protegido con contraseña y no se encontró un RUT asociado a esta cuenta. ' +
        'Por favor, registra el RUT del titular en la Billetera Segura antes de adjuntar la cartola.'
      );
    }

    for (const password of passwords) {
      try {
        this.logger.debug(`Trying password variation: ${password.substring(0, 2)}***`);
        const data = await pdfParse(buffer, { password });
        this.logger.log('PDF unlocked successfully!');
        return data;
      } catch (e) {
        // Continue trying
      }
    }

    throw new Error(
      'El PDF está protegido y no se pudo desbloquear con las variaciones del RUT registrado. ' +
      'Verifica que el RUT del titular esté correcto en la Billetera Segura, o desprotege el PDF manualmente.'
    );
  }

  async processCartola(file: Express.Multer.File, bankId: number, ownerRut?: string): Promise<any[]> {
    const results: any[] = [];
    
    try {
      // Parse the PDF buffer (with password attempts if needed)
      const data = await this.parsePdfWithPasswords(file.buffer, ownerRut);
      const text = data.text;
      
      this.logger.log(`PDF Parsed. Number of pages: ${data.numpages}`);
      require('fs').writeFileSync('pdf_debug.txt', text);
      
      const lines = text.split('\n');
      this.logger.debug('First 30 lines: ' + JSON.stringify(lines.slice(0, 30)));
      let lastSaldo = 0;
      let hasFoundSaldo = false;
      
      for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        if (!hasFoundSaldo) {
          const saldoMatch = line.match(/Saldo inicial\s+([\d.]+)/);
          if (saldoMatch) {
            lastSaldo = parseFloat(saldoMatch[1].replace(/\./g, ''));
            hasFoundSaldo = true;
          }
          continue;
        }

        // Nuevo Regex matemático para Scotiabank sin espacios
        const match = line.match(/^(\d{2}\/\d{2}\/\d{4})(.*?)(\d{9})\s*([\d.]+)\s+([\d.]+)\s*$/);
        
        if (match) {
          const rawDate = match[1];
          const description = match[2].trim();
          const amountParsed = parseFloat(match[4].replace(/\./g, ''));
          const saldoParsed = parseFloat(match[5].replace(/\./g, ''));
          
          let type: 'INCOME' | 'EXPENSE' = 'EXPENSE';
          let amount = amountParsed;
          
          if (hasFoundSaldo) {
             if (saldoParsed > lastSaldo) {
               type = 'INCOME';
             } else {
               type = 'EXPENSE';
               amount = -Math.abs(amountParsed);
             }
          } else {
             type = line.toLowerCase().includes('abono') || line.toLowerCase().includes('remuneraci') ? 'INCOME' : 'EXPENSE';
             amount = type === 'EXPENSE' ? -Math.abs(amountParsed) : amountParsed;
          }
          
          lastSaldo = saldoParsed;

          const descLower = description.toLowerCase();
          let category = 'Otros';
          if (descLower.includes('mercadopago') || descLower.includes('lider') || descLower.includes('mayorista') || descLower.includes('almac')) category = 'Alimentación';
          else if (descLower.includes('uber') || descLower.includes('didi') || descLower.includes('cabify') || descLower.includes('autopista')) category = 'Transporte';
          else if (descLower.includes('remuneraci') || descLower.includes('sueldo')) category = 'Ingresos';
          else if (descLower.includes('tef ')) category = 'Transferencias';
          else if (descLower.includes('netflix') || descLower.includes('spotify') || descLower.includes('cine')) category = 'Entretenimiento';
          else if (descLower.includes('clinica') || descLower.includes('farmacia') || descLower.includes('salcobrand') || descLower.includes('dr. simi') || descLower.includes('cruz verde')) category = 'Salud';
          else if (descLower.includes('aguas') || descLower.includes('enel') || descLower.includes('vtr') || descLower.includes('entel') || descLower.includes('movistar')) category = 'Servicios';

          const hashString = `${rawDate}-${description}-${Math.abs(amount)}-${bankId}`;
          const hash = crypto.createHash('sha256').update(hashString).digest('hex');

          results.push({
            date: rawDate.split('/').reverse().join('-'), // YYYY-MM-DD
            description,
            amount,
            type,
            category,
            bankId,
            hash,
            status: 'PENDING'
          });
        }
      }
      
      if (results.length === 0) {
        this.logger.debug('First 15 lines parsed: ' + lines.slice(0, 15).join(' | '));
      }
      this.logger.log(`Found ${results.length} transactions in PDF.`);
      return results;
      
    } catch (error) {
      this.logger.error('Error parsing PDF', error);
      throw error;
    }
  }
}
