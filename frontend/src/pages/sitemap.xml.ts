import type { APIRoute } from 'astro';
import { DISTRICTS } from '@/data/districts';

/**
 * Otomatik sitemap: ana sayfa + 39 ilçe masaj landing sayfası.
 * `site` astro.config.mjs'teki `site` değerinden gelir; yayına alırken orayı
 * gerçek alan adıyla güncellemek yeterli — sitemap ve canonical'lar uyar.
 */
export const GET: APIRoute = ({ site }) => {
	const origin = (site ?? new URL('https://ajans-d8e.pages.dev')).origin;

	const paths = ['/', ...DISTRICTS.map((d) => `/${d.slug}`)];

	const urls = paths
		.map((path) => {
			const priority = path === '/' ? '1.0' : '0.8';
			return `  <url>\n    <loc>${origin}${path}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
		})
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
};
