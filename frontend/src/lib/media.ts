import api from '@/api/axios';

/**
 * Resolve a backend-relative media path (e.g. "/uploads/x.jpg") to an absolute
 * URL, derived from the axios baseURL so the host lives in exactly one place.
 */
export function mediaUrl(path?: string | null): string {
  if (!path) return '';
  if (/^https?:\/\//.test(path)) return path;
  const base = (api.defaults.baseURL ?? '').replace(/\/api\/?$/, '');
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}
