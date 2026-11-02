import { Fragment, type ReactNode } from 'react';
import { useApp, type RankingsFilter } from '@/lib/app-context';
import { continentOf } from '@/lib/data';
import { geoLabel } from '@/lib/geo';
import type { Spot } from '@/lib/types';
import { flagEmoji, getLocalizedCountry } from '@/lib/utils';
import { Ikurrina } from './Ikurrina';

interface Crumb {
  key: string;
  label: string;
  icon?: ReactNode;
  filter: RankingsFilter;
}

interface Props {
  spot: Spot;
  tone?: 'onDark' | 'onLight';
  className?: string;
}

const TONE = {
  onDark: 'text-white/85 hover:text-white hover:bg-white/15',
  onLight: 'text-forest-700 dark:text-sand-300 hover:text-forest-900 dark:hover:text-sand-100 hover:bg-forest-100/70 dark:hover:bg-slate2-800',
};

export function PlaceBreadcrumb({ spot, tone = 'onLight', className = '' }: Props) {
  const { lang, navigateToRankings } = useApp();
  const country = getLocalizedCountry(spot, lang);
  const base: RankingsFilter = {
    continent: continentOf(spot.country_code) ?? 'all',
    country: spot.euskal_herria ? 'EUS' : spot.country_code,
    province: 'all',
    comarca: 'all',
  };

  const crumbs: Crumb[] = [{
    key: 'country',
    label: country.name,
    icon: country.isEH ? <Ikurrina className="w-3.5 h-2" /> : <span>{flagEmoji(spot.country_code)}</span>,
    filter: base,
  }];
  if (spot.province) {
    const province = spot.province;
    crumbs.push({ key: 'province', label: geoLabel(province, lang), filter: { ...base, province } });
    if (spot.comarca) {
      crumbs.push({ key: 'comarca', label: geoLabel(spot.comarca, lang), filter: { ...base, province, comarca: spot.comarca } });
    }
  }

  return (
    <span className={`inline-flex flex-wrap items-center gap-0.5 text-xs ${TONE[tone]} ${className}`}>
      {crumbs.map((c, i) => (
        <Fragment key={c.key}>
          {i > 0 && <span aria-hidden="true" className="opacity-50 px-0.5">›</span>}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); navigateToRankings(c.filter); }}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full cursor-pointer underline-offset-2 hover:underline transition-colors"
          >
            {c.icon}
            {c.label}
          </button>
        </Fragment>
      ))}
    </span>
  );
}
