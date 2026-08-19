import siteJson from '../data/site.json';
import { applyBase } from './base';

function httpsUrl(value: string, hosts: string[], pathPrefix?: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return '';
    if (!hosts.includes(url.hostname)) return '';
    if (pathPrefix && !url.pathname.startsWith(pathPrefix)) return '';
    return url.href;
  } catch {
    return '';
  }
}

const ga4 = /^G-[A-Z0-9]+$/.test(siteJson.ga4) ? siteJson.ga4 : '';

export const site = {
  ...siteJson,
  ga4,
  facebook: httpsUrl(siteJson.facebook, ['www.facebook.com', 'facebook.com']),
  instagram: httpsUrl(siteJson.instagram, ['www.instagram.com', 'instagram.com']),
  mapEmbed: httpsUrl(siteJson.mapEmbed, ['www.google.com'], '/maps/embed'),
  googleMaps: httpsUrl(siteJson.googleMaps, ['www.google.com', 'maps.google.com']),
};

export function withBase(path = '/') {
  return applyBase(path, import.meta.env.BASE_URL || '/');
}

export function pageTitle(seoTitle: string | undefined, title: string) {
  const label = seoTitle || title;
  if (label.includes('Dobry Dźwięk')) return label;
  return `${label} | ${site.shortName}`;
}

export function canonical(pathname: string) {
  const origin = import.meta.env.SITE || site.url;
  const path = pathname.endsWith('/') || pathname.includes('#') || pathname.includes('?') ? pathname : `${pathname}/`;
  return new URL(withBase(path), origin).href;
}

/** Safe for inline JSON-LD: JSON.stringify does not escape `<`. */
export function jsonLdText(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
