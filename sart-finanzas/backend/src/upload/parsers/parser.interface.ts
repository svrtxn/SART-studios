export interface ParsedTransaction {
  date: string; // YYYY-MM-DD
  description: string;
  amount: number; // in cents
  type: 'INCOME' | 'EXPENSE';
}

export interface IPdfParser {
  parse(text: string): ParsedTransaction[];
  canParse(text: string): boolean;
}
