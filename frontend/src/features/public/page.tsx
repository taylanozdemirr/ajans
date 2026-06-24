import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { Brand } from '@/components/brand';
import { mediaUrl } from '@/lib/media';
import api from '@/api/axios';
import type { PublicModel } from './types';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export default function PublicPage() {
  const [models, setModels] = useState<PublicModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // The vitrin is always presented in the dark palette.
    document.documentElement.classList.add('dark');

    const fetchModels = async () => {
      try {
        const { data } = await api.get('/public/models?limit=100');
        setModels(data.data || data);
      } catch (error) {
        console.error('Mankenler yüklenemedi', error);
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, []);

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}`, '_blank', 'noopener');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-5 md:px-8">
          <Brand href="/" size="md" />
          <a
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Ajans Girişi <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        {/* ── Masthead ─────────────────────────────────────────── */}
        <section className="animate-fade-up border-b border-border/60 py-14 md:py-20">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-primary">
            Vitrin
          </p>
          <h1 className="mt-4 font-display text-5xl font-medium leading-[0.95] tracking-tight text-foreground md:text-7xl">
            Mankenlerimiz
          </h1>
          <p className="mt-5 max-w-[58ch] text-sm leading-relaxed text-muted-foreground md:text-base">
            Partner ajanslarımızın vitrindeki yüzleri. Beğendiğiniz profile dokunarak
            WhatsApp üzerinden anında iletişime geçin.
          </p>
          {!loading && models.length > 0 && (
            <p className="mt-8 font-display text-sm tracking-widest text-muted-foreground">
              {String(models.length).padStart(2, '0')} aktif profil
            </p>
          )}
        </section>

        {/* ── Roster ───────────────────────────────────────────── */}
        <section className="flex flex-col gap-5 pt-10">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-1 overflow-hidden rounded-xl border border-border bg-card md:grid-cols-[minmax(220px,17rem)_1fr]"
              >
                <div className="space-y-3 border-b border-border p-6 md:border-b-0 md:border-r">
                  <div className="h-3 w-8 animate-pulse rounded bg-muted" />
                  <div className="h-7 w-40 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                </div>
                <div className="flex h-44 items-center gap-3 p-4">
                  {Array.from({ length: 6 }).map((__, j) => (
                    <div key={j} className="aspect-[3/4] h-full animate-pulse rounded-md bg-muted" />
                  ))}
                </div>
              </div>
            ))
          ) : models.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border py-24 text-center">
              <p className="font-display text-2xl text-foreground">Vitrin şu an hazırlanıyor</p>
              <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
                Henüz yayında profil bulunmuyor. Ajanslar profillerini ekledikçe burada
                görünecekler.
              </p>
            </div>
          ) : (
            models.map((model, index) => (
              <article
                key={model.id}
                style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
                className="group grid animate-fade-up grid-cols-1 overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40 md:grid-cols-[minmax(220px,17rem)_1fr]"
              >
                {/* Label */}
                <div className="flex items-center justify-between gap-4 border-b border-border p-6 md:flex-col md:items-start md:justify-center md:border-b-0 md:border-r">
                  <div className="min-w-0">
                    <span className="font-display text-sm tracking-widest text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-1 truncate font-display text-3xl font-medium uppercase leading-none tracking-wide text-primary md:text-4xl">
                      {model.firstName}
                    </h3>
                    {model.company?.name && (
                      <p className="mt-2 truncate text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {model.company.name}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleWhatsApp(model.whatsappPhone)}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:mt-6"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> İletişim
                  </button>
                </div>

                {/* Marquee */}
                <div className="relative flex h-44 items-center overflow-hidden md:h-52">
                  {model.photos && model.photos.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => handleWhatsApp(model.whatsappPhone)}
                      aria-label={`${model.firstName} ile iletişime geç`}
                      className="flex h-full w-full cursor-pointer items-center"
                    >
                      <div className="animate-marquee h-full items-center gap-3 py-4 pl-4">
                        {[...model.photos, ...model.photos, ...model.photos, ...model.photos].map(
                          (photo, i) => (
                            <div
                              key={`${photo.id}-${i}`}
                              className="aspect-[3/4] h-full shrink-0 overflow-hidden rounded-md border border-border/70 bg-muted shadow-lg shadow-black/40"
                            >
                              <img
                                src={mediaUrl(photo.url)}
                                alt={model.firstName}
                                loading="lazy"
                                className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:opacity-100"
                              />
                            </div>
                          ),
                        )}
                      </div>
                    </button>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-widest text-muted-foreground">
                      Fotoğraf yüklenmedi
                    </div>
                  )}

                  {/* Edge fades */}
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-card to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-card to-transparent" />
                </div>
              </article>
            ))
          )}
        </section>
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
