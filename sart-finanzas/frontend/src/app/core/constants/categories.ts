export const CATEGORY_ICONS: { [key: string]: string } = {
  'Alimentación': '🛒',
  'Ingresos': '💼',
  'Transporte': '🚗',
  'Entretenimiento': '🎬',
  'Salud': '💊',
  'Servicios': '⚡',
  'Transferencias': '🔄',
  'Otros': '📌'
};

export const CATEGORIES = Object.keys(CATEGORY_ICONS);

export function getCategoryIcon(category: string): string {
  return CATEGORY_ICONS[category] || '📌';
}
