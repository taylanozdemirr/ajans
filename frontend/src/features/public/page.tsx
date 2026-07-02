import { useState, useEffect, useCallback } from 'react';

import { Brand } from '@/components/brand';
import { ThemeToggle } from '@/components/theme-toggle';
import { mediaUrl } from '@/lib/media';
import api from '@/api/axios';
import type { PublicModel } from './types';

type Photo = PublicModel['photos'][number];

/** Shared gold focus ring — the one legitimate, functional use of the accent. */
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/**
 * Repeat a model's photos into a seamless marquee track. `min` guarantees one
 * half is wide enough to fill the row; the doubled track makes the
 * translateX(-50%) loop seamless — ≈10× fewer DOM nodes than the old
 * Array(20).fill and correct even for models with a single photo.
 */
function marqueeTrack(photos: Photo[], min = 18): Photo[] {
  if (!photos || photos.length === 0) return [];
  const half: Photo[] = [];
  while (half.length < min) half.push(...photos);
  return [...half, ...half];
}

/** Quiet editorial section divider — a single Bodoni word between hairlines. */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 pb-3 pt-9 md:pt-12">
      <span aria-hidden className="h-px flex-1 bg-border" />
      <h2 className="font-display text-lg uppercase tracking-[0.2em] text-foreground md:text-2xl">
        {label}
      </h2>
      <span aria-hidden className="h-px flex-1 bg-border" />
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
      <p className="font-display text-2xl text-foreground">Vitrin şu an hazırlanıyor</p>
      <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
        Henüz yayında profil bulunmuyor. Ajanslar profillerini ekledikçe burada görünecekler.
      </p>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-md border border-dashed border-border py-24 text-center">
      <p className="font-display text-2xl text-foreground">Vitrin yüklenemedi</p>
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

export default function PublicPage() {
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
      console.error('Mankenler yüklenemedi', err);
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
    <div className="min-h-screen bg-background">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-5 md:px-8">
          <Brand href="/" size="md" />
          <div className="flex items-center gap-1.5 md:gap-2">
            <ThemeToggle className="text-muted-foreground hover:text-foreground" />
            <button
              type="button"
              onClick={() => handleWhatsApp('905555555555')}
              className={`inline-flex items-center rounded-full border border-primary/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/10 md:px-5 md:text-sm ${FOCUS_RING}`}
            >
              İlan Ver
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <h1 className="sr-only">Luxe Agency - Türkiye'nin Lider Manken ve Model Ajansı</h1>

        {/* ── Masthead ────────────────────────────────────────────── */}
        <section className="pb-2 pt-10 text-center md:pt-16">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.32em] text-muted-foreground md:text-xs">
            İstanbul · Profesyonel Manken &amp; Model Ajansı
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-[1.05] text-foreground md:text-6xl">
            Türkiye'nin seçkin yüzleri,
            <span className="text-primary"> tek karede.</span>
          </p>
        </section>

        {/* ── Mega Vitrin ─────────────────────────────────────────── */}
        <SectionDivider label="Mega Vitrin" />

        <section className="flex flex-col gap-4 md:gap-5">
          {loading ? (
            <MarqueeSkeleton />
          ) : error ? (
            <ErrorState onRetry={fetchModels} />
          ) : models.length === 0 ? (
            <EmptyState />
          ) : megaModels.length === 0 ? (
            <div className="rounded-md border border-dashed border-border py-12 text-center">
              <p className="font-display text-lg text-foreground">Mega Vitrin şu an boş</p>
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
                  <span className="text-[0.55rem] font-medium uppercase tracking-[0.24em] text-primary">
                    Mega
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
                              // MEGA is the premium tier with few rows, all above the
                              // fold — load eagerly so the hero never paints empty.
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

        {/* ── Gold Vitrin ─────────────────────────────────────────── */}
        {!loading && !error && goldModels.length > 0 && (
          <>
            <SectionDivider label="Gold Vitrin" />
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
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center md:px-8">
          <Brand href="/" size="sm" />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LUXE AGENCY · Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
}
