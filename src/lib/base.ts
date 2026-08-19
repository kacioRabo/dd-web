/** Prefix a site-root path with Astro `base`. Leave hashes, mailto, and absolute URLs alone. */
export function applyBase(path = '/', base = '/') {
  if (!path || path.startsWith('#') || path.startsWith('?')) return path;
  if (/^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith('//')) return path;
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
  if (path === '/') return `${prefix}/`;
  if (prefix && (path === prefix || path.startsWith(`${prefix}/`))) return path;
  return `${prefix}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Prefix root-relative href/src in rendered Markdown HTML. */
export function prefixHtml(html: string, base = '/') {
  return html.replace(/\b(href|src)="(\/(?!\/)[^"]*)"/g, (_match, attr: string, path: string) => {
    return `${attr}="${applyBase(path, base)}"`;
  });
}

export function renderedHtml(entry: { rendered?: { html?: string } }) {
  return entry.rendered?.html ?? '';
}

