// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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

const redirects = {
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

/** @param {string} page */
function includeInSitemap(page) {
  const path = new URL(page).pathname;
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

const githubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: githubPages ? 'https://kaciorabo.github.io' : 'https://dobrydzwiek.pl',
  base: githubPages ? '/dd-web/' : '/',
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
