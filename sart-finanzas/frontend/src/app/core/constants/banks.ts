export const BANKS = [
  { name: 'Banco de Chile', keywords: ['chile', 'banco de chile'], color: '#002464', logo: 'https://raw.githubusercontent.com/Eitol/chile_iconos/master/bancos_chile/low/logo/logo_banco_de_chile.png' },
  { name: 'BancoEstado', keywords: ['estado', 'bancoestado'], color: '#ec6b02', logo: 'https://raw.githubusercontent.com/Eitol/chile_iconos/master/bancos_chile/low/logo/logo_banco_estado.png' },
  { name: 'Santander', keywords: ['santander'], color: '#ec0000', logo: 'https://raw.githubusercontent.com/Eitol/chile_iconos/master/bancos_chile/low/logo/logo_santander.png' },
  { name: 'BCI', keywords: ['bci'], color: '#000000', logo: 'https://raw.githubusercontent.com/Eitol/chile_iconos/master/bancos_chile/low/logo/logo_bci.png' },
  { name: 'Scotiabank', keywords: ['scotiabank', 'scotia'], color: '#ed1b2d', logo: 'https://raw.githubusercontent.com/Eitol/chile_iconos/master/bancos_chile/low/logo/logo_scotiabank.png' },
  { name: 'Itaú', keywords: ['itau', 'itaú'], color: '#ec7000', logo: 'https://raw.githubusercontent.com/Eitol/chile_iconos/master/bancos_chile/low/logo/logo_itau.png' },
  { name: 'Falabella', keywords: ['falabella'], color: '#b2d235', logo: 'https://raw.githubusercontent.com/Eitol/chile_iconos/master/bancos_chile/low/logo/logo_banco_falabella.png' },
  { name: 'BICE', keywords: ['bice'], color: '#002855', logo: 'https://raw.githubusercontent.com/Eitol/chile_iconos/master/bancos_chile/low/logo/logo_banco_bice.png' },
  { name: 'Security', keywords: ['security'], color: '#001a4e', logo: 'https://raw.githubusercontent.com/Eitol/chile_iconos/master/bancos_chile/low/logo/logo_banco_security.png' },
  { name: 'Consorcio', keywords: ['consorcio'], color: '#eb5e1e', logo: 'https://raw.githubusercontent.com/Eitol/chile_iconos/master/bancos_chile/low/logo/logo_consorcio.png' },
  { name: 'Internacional', keywords: ['internacional'], color: '#ec6b02', logo: 'https://raw.githubusercontent.com/Eitol/chile_iconos/master/bancos_chile/low/logo/logo_banco_internacional.png' },
  { name: 'Ripley', keywords: ['ripley'], color: '#684589', logo: 'https://raw.githubusercontent.com/Eitol/chile_iconos/master/bancos_chile/low/logo/logo_banco_ripley.png' },
  { name: 'Condell', keywords: ['condell'], color: '#f3b204', logo: null },
  { name: 'CrediChile', keywords: ['credichile'], color: '#002464', logo: null },
  { name: 'Edwards Citi', keywords: ['edwards', 'citi'], color: '#003a70', logo: null }
];

export function getBankInfo(name: string) {
  if (!name) return { color: 'var(--color-primary)', logo: null };
  const lowerName = name.toLowerCase();
  for (const bank of BANKS) {
    if (bank.keywords.some(k => lowerName.includes(k))) {
      return bank;
    }
  }
  return { color: 'var(--color-primary)', logo: null };
}
