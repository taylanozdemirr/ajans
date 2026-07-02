import { useState, useEffect, useCallback } from 'react';

import { mediaUrl } from '@/lib/media';
import api from '@/api/axios';
import type { PublicModel } from './types';

type Photo = PublicModel['photos'][number];

/** Shared gold focus ring — the one legitimate, functional use of the accent. */
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/**
 * Repeat a masseur's photos into a seamless marquee track. `min` guarantees one
 * half is wide enough to fill the row; the doubled track makes the
 * translateX(-50%) loop seamless — correct even for a single photo.
 */
function marqueeTrack(photos: Photo[], min = 18): Photo[] {
  if (!photos || photos.length === 0) return [];
  const half: Photo[] = [];
  while (half.length < min) half.push(...photos);
  return [...half, ...half];
}

/**
 * Bold, eye-catching tier heading. A gold accent bar + large Bodoni display with
 * the tier name in gold, a small caption, and a gold-to-transparent underline —
 * the vitrin sections read as premium banners, not quiet hairline dividers.
 */
function SectionHeading({ tier, caption }: { tier: 'MEGA' | 'GOLD'; caption: string }) {
  return (
    <div className="pb-5 pt-11 md:pt-16">
      <div className="flex items-center gap-3.5">
        <span aria-hidden className="h-9 w-1.5 shrink-0 rounded-full bg-primary md:h-12" />
        <div>
          <h2 className="font-display text-3xl font-bold leading-[0.9] tracking-tight text-foreground md:text-5xl">
            <span className="text-primary">{tier}</span> VİTRİN
          </h2>
          <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            {caption}
          </p>
        </div>
      </div>
      <div className="mt-4 h-0.5 w-full rounded-full bg-gradient-to-r from-primary via-primary/40 to-transparent" />
    </div>
  );
}

function MarqueeSkeleton() {
  return (
    <div className="flex flex-col gap-4 md:gap-5">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i}>
          <div className="mb-1.5 h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="flex h-16 items-center gap-[2px] overflow-hidden rounded-sm md:h-24">
            {Array.from({ length: 18 }).map((__, j) => (
              <div key={j} className="aspect-[3/4] h-full shrink-0 animate-pulse bg-muted" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-md border border-dashed border-border py-24 text-center">
      <p className="font-display text-2xl text-foreground">Masör listesi hazırlanıyor</p>
      <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
        Henüz yayında masör bulunmuyor. İşletmeler profillerini ekledikçe burada görünecekler.
      </p>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-md border border-dashed border-border py-24 text-center">
      <p className="font-display text-2xl text-foreground">Masörler yüklenemedi</p>
      <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
        Bağlantı kurulamadı. Lütfen tekrar deneyin.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className={`mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2 text-xs font-medium uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/10 ${FOCUS_RING}`}
      >
        Tekrar dene
      </button>
    </div>
  );
}

/**
 * The live masseur roster — the one interactive island on the otherwise
 * server-rendered public pages. Fetches the roster and renders the VIP marquee
 * rows + the dense photo-wall grid. All SEO chrome (headings, intro, district
 * links) lives server-side in the surrounding .astro page.
 */
export default function VitrinRoster() {
  const [models, setModels] = useState<PublicModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchModels = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await api.get('/public/models?limit=100');
      setModels(data.data || data);
    } catch (err) {
      console.error('Masörler yüklenemedi', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}`, '_blank', 'noopener');
  };

  const megaModels = models.filter((m) => m.company?.tier === 'MEGA');
  const goldModels = models.filter((m) => m.company?.tier === 'GOLD' || !m.company?.tier);

  return (
    <>
      {/* ── MEGA Vitrin ─────────────────────────────────────────── */}
      <SectionHeading tier="MEGA" caption="Öne Çıkan Masörler" />

      <section className="flex flex-col gap-4 md:gap-5">
        {loading ? (
          <MarqueeSkeleton />
        ) : error ? (
          <ErrorState onRetry={fetchModels} />
        ) : models.length === 0 ? (
          <EmptyState />
        ) : megaModels.length === 0 ? (
          <div className="rounded-md border border-dashed border-border py-12 text-center">
            <p className="font-display text-lg text-foreground">MEGA Vitrin şu an boş</p>
          </div>
        ) : (
          megaModels.map((model, index) => (
            <article
              key={`mega-${model.id}`}
              style={{ animationDelay: `${Math.min(index, 6) * 60}ms` }}
              className="animate-fade-up"
            >
              <div className="mb-1.5 flex items-baseline gap-2 px-0.5">
                <h3 className="font-display text-base text-foreground md:text-lg">
                  {model.firstName}
                </h3>
                <span className="rounded-sm bg-primary px-1.5 py-0.5 text-[0.5rem] font-bold uppercase tracking-[0.18em] text-primary-foreground">
                  MEGA
                </span>
              </div>

              <div className="group relative overflow-hidden rounded-sm">
                {model.photos && model.photos.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => handleWhatsApp(model.whatsappPhone)}
                    aria-label={`${model.firstName} ile WhatsApp üzerinden iletişime geç`}
                    className={`relative block w-full ${FOCUS_RING}`}
                  >
                    <div className="animate-marquee flex h-16 items-center gap-[2px] md:h-24">
                      {marqueeTrack(model.photos).map((photo, i) => (
                        <div
                          key={`${photo?.id || 'photo'}-${i}`}
                          className="aspect-[3/4] h-full shrink-0 overflow-hidden bg-muted"
                        >
                          <img
                            src={mediaUrl(photo.url)}
                            alt=""
                            loading="eager"
                            decoding="async"
                            className="h-full w-full object-cover transition duration-500 group-hover:brightness-105"
                          />
                        </div>
                      ))}
                    </div>
                  </button>
                ) : (
                  <div className="flex h-16 w-full items-center justify-center text-[0.65rem] uppercase tracking-widest text-muted-foreground md:h-24">
                    Fotoğraf yüklenmedi
                  </div>
                )}

                {/* Edge fades — narrow so the portraits stay the hero */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent" />
              </div>
            </article>
          ))
        )}
      </section>

      {/* ── Masör Kadrosu ─────────────────────────────────────────── */}
      {!loading && !error && goldModels.length > 0 && (
        <>
          <SectionHeading tier="GOLD" caption="Masör Kadrosu" />
          <section className="grid grid-cols-5 gap-[2px] pb-4 xs:grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
            {goldModels.map((model, index) => (
              <article
                key={`gold-${model.id}`}
                style={{ animationDelay: `${Math.min(index, 12) * 22}ms` }}
                className="animate-fade-up"
              >
                <button
                  type="button"
                  onClick={() => handleWhatsApp(model.whatsappPhone)}
                  aria-label={`${model.firstName} ile WhatsApp üzerinden iletişime geç`}
                  className={`group relative block aspect-[3/4] w-full overflow-hidden bg-muted transition-transform duration-300 hover:z-10 ${FOCUS_RING}`}
                >
                  {model.photos && model.photos.length > 0 ? (
                    <img
                      src={mediaUrl(model.photos[0].url)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[0.55rem] uppercase tracking-widest text-muted-foreground">
                      Foto Yok
                    </div>
                  )}

                  {/* Name — hidden at rest so the wall stays pure photography,
                      revealed on hover/focus. Keeps max density on screen. */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-1.5 pb-1 pt-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <h3 className="truncate font-display text-xs text-white md:text-sm">
                      {model.firstName}
                    </h3>
                  </div>
                </button>
              </article>
            ))}
          </section>
        </>
      )}
    </>
  );
}
