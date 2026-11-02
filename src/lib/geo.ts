import type { LangCode } from './types';

const GEO_LABELS: Record<string, { eu: string; es: string; en: string }> = {
  'Bizkaia': { eu: 'Bizkaia', es: 'Bizkaia', en: 'Biscay' },
  'Busturialdea': { eu: 'Busturialdea', es: 'Busturialdea', en: 'Busturialdea' },
  'Véneto': { eu: 'Veneto', es: 'Véneto', en: 'Veneto' },
  'Trentino-Alto Ádige': { eu: 'Trentino-Alto Ádige', es: 'Trentino-Alto Ádige', en: 'Trentino-Alto Adige' },
  'Toscana': { eu: 'Toskana', es: 'Toscana', en: 'Tuscany' },
  "Val d'Orcia": { eu: "Val d'Orcia", es: "Val d'Orcia", en: "Val d'Orcia" },
  'Dolomiti': { eu: 'Dolomiti', es: 'Dolomitas', en: 'Dolomites' },
  'Pirinioak (Sobrarbe)': { eu: 'Pirinioak (Sobrarbe)', es: 'Pirineos (Sobrarbe)', en: 'Pyrenees' },
};

export function geoLabel(key: string, lang: LangCode): string {
  const entry = GEO_LABELS[key];
  if (!entry) return key;
  if (lang === 'EUS') return entry.eu;
  if (lang === 'ES') return entry.es;
  return entry.en;
}
