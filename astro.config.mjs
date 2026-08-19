// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { applyBase } from './src/lib/base';

const ofertaSlugs = [
  'imprezy-plenerowe-i-klubowe',
  'targi-konferencje-eventy-firmowe',
  'konstrukcje-sceniczne',
  'rental-i-obsluga',
  'oswietlenie-architektoniczne',
  'moda-teatr-kabaret',
  'imprezy-okolicznosciowe',
  'instalacje-audio-video-av',
];

const newsSlugs = ['portman-p3', 'dom-dobrego-dzwieku'];

const githubPages = process.env.GITHUB_PAGES === 'true';
const siteBase = githubPages ? '/dd-web/' : '/';

const redirectTargets = {
  '/galeria/': '/referencje/',
  '/wp-login.php': '/',
  '/wp-admin/': '/',
  '/przykladowa-strona/': '/',
  '/feed/': '/aktualnosci/',
  '/zaufali-nam/': '/referencje/',
  '/polityka-plikow-cookies-eu/': '/cookies/',
  '/x-urodziny-dobrego-dzwieku/': '/aktualnosci/',
  ...Object.fromEntries(ofertaSlugs.map((slug) => [`/oferta/${slug}/`, `/${slug}/`])),
  ...Object.fromEntries(newsSlugs.map((slug) => [`/${slug}/`, `/aktualnosci/${slug}/`])),
};

const redirects = Object.fromEntries(
  Object.entries(redirectTargets).map(([from, to]) => [from, applyBase(to, siteBase)]),
);

/** @param {string} page */
function includeInSitemap(page) {
  let path = new URL(page).pathname;
  const prefix = siteBase.endsWith('/') ? siteBase.slice(0, -1) : siteBase;
  if (prefix && (path === prefix || path.startsWith(`${prefix}/`))) {
    path = path.slice(prefix.length) || '/';
  }
  if (['/admin', '/galeria', '/wp-admin', '/wp-login', '/przykladowa-strona'].some((part) => path.includes(part))) {
    return false;
  }
  if (newsSlugs.some((slug) => path === `/${slug}/` || path === `/${slug}`)) {
    return false;
  }
  if (path.startsWith('/oferta/') && path !== '/oferta/') {
    return false;
  }
  return true;
}

export default defineConfig({
  site: githubPages ? 'https://kaciorabo.github.io' : 'https://dobrydzwiek.pl',
  base: siteBase,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'pl',
        locales: { pl: 'pl' },
      },
      filter: includeInSitemap,
    }),
  ],
  redirects,
});
