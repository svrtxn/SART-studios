import { IPdfParser, ParsedTransaction } from './parser.interface';

export class SantanderParser implements IPdfParser {
  canParse(text: string): boolean {
    return text.includes('Banco Santander') || text.includes('Santander Chile');
  }

  parse(text: string): ParsedTransaction[] {
    const transactions: ParsedTransaction[] = [];
    // Regex simplificada para extraer movimientos (Fecha, Descripción, Monto)
    const regex = /(\d{2}\/\d{2}\/\d{4})\s+(.+?)\s+(-?\$[\d.,]+)/g;
    
    let match;
    while ((match = regex.exec(text)) !== null) {
      const [, dateStr, desc, amountStr] = match;
      const [day, month, year] = dateStr.split('/');
      
      const cleanAmount = parseInt(amountStr.replace(/[^\d-]/g, ''), 10);
      // Asumiendo CLP, multiplicamos por 100 para almacenar en "centavos" y cumplir con el estándar
      const amount = cleanAmount * 100; 
      
      transactions.push({
        date: `${year}-${month}-${day}`,
        description: desc.trim(),
        amount: Math.abs(amount),
        type: amount < 0 ? 'EXPENSE' : 'INCOME',
      });
    }

    return transactions;
  }
}
