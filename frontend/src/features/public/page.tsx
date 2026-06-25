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

  const megaModels = models.filter((m) => m.company?.tier === 'MEGA');
  const goldModels = models.filter((m) => m.company?.tier === 'GOLD' || !m.company?.tier);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-5 md:px-8">
          <Brand href="/" size="md" />
          <button
            type="button"
            onClick={() => handleWhatsApp('905555555555')}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] px-5 py-2 text-xs md:text-sm font-bold text-black shadow-lg shadow-[#D4AF37]/20 transition-transform hover:scale-105 active:scale-95"
          >
            <span>İLAN VER</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        {/* ── Mega Vitrin Banner ─────────────────────────────────────────── */}
        <section className="animate-fade-up pt-1 pb-1 flex flex-col gap-2">

          {/* Ana Mega Vitrin */}
          <div className="relative flex items-center justify-between overflow-hidden border-y-2 border-red-600 bg-[#1e0024] px-4 py-3 shadow-2xl md:px-8 md:py-4">
            
            {/* Sol Siluet (Placeholder) */}
            <div className="flex h-10 w-10 items-center justify-center text-[#D4AF37] md:h-16 md:w-16">
              {/* Not: Müşterinin tam siluet görseli buraya gelecek */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full opacity-90 drop-shadow-md">
                <path d="M12 2L15 9L22 9L16.5 14L18.5 22L12 17.5L5.5 22L7.5 14L2 9L9 9L12 2Z" />
              </svg>
            </div>

            {/* Orta Metin */}
            <div className="flex items-center gap-2 md:gap-4">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#D4AF37] drop-shadow-md md:h-6 md:w-6">
                <path d="M12 2L15 9L22 9L16.5 14L18.5 22L12 17.5L5.5 22L7.5 14L2 9L9 9L12 2Z" />
              </svg>
              <h1 className="font-display text-lg font-black italic tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] md:text-2xl">
                MEGA VİTRİN
              </h1>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#D4AF37] drop-shadow-md md:h-6 md:w-6">
                <path d="M12 2L15 9L22 9L16.5 14L18.5 22L12 17.5L5.5 22L7.5 14L2 9L9 9L12 2Z" />
              </svg>
            </div>

            {/* Sağ Siluet (Placeholder - Aynalanmış) */}
            <div className="flex h-10 w-10 scale-x-[-1] items-center justify-center text-[#D4AF37] md:h-16 md:w-16">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full opacity-90 drop-shadow-md">
                <path d="M12 2L15 9L22 9L16.5 14L18.5 22L12 17.5L5.5 22L7.5 14L2 9L9 9L12 2Z" />
              </svg>
            </div>
            
          </div>
        </section>

        {/* ── Mega Vitrin Roster ───────────────────────────────────────────── */}
        <section className="flex flex-col gap-2 pt-0">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="flex h-28 items-center gap-3 p-4 md:h-36">
                  {Array.from({ length: 8 }).map((__, j) => (
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
          ) : megaModels.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border py-12 text-center">
              <p className="font-display text-lg text-foreground">Mega Vitrin şu an boş</p>
            </div>
          ) : (
            megaModels.map((model, index) => (
              <article
                key={`mega-${model.id}`}
                style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
                className="group relative animate-fade-up overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40"
              >
                {/* Overlay Name and Details */}
                <div className="pointer-events-none absolute left-0 top-0 z-20 flex h-full w-48 flex-col justify-start bg-gradient-to-r from-background/90 via-background/60 to-transparent p-4 md:w-64 md:p-6">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#D4AF37]">
                      <path d="M12 2L15 9L22 9L16.5 14L18.5 22L12 17.5L5.5 22L7.5 14L2 9L9 9L12 2Z" />
                    </svg>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-wide text-primary drop-shadow-md md:text-3xl">
                    {model.firstName}
                  </h3>
                </div>

                {/* Marquee */}
                <div className="relative flex h-28 items-center overflow-hidden md:h-36">
                  {model.photos && model.photos.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => handleWhatsApp(model.whatsappPhone)}
                      aria-label={`${model.firstName} ile iletişime geç`}
                      className="flex h-full w-full cursor-pointer items-center"
                    >
                      <div className="animate-marquee h-full items-center gap-1 py-1 pl-1">
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

        {/* ── Gold Vitrin Banner ─────────────────────────────────────────── */}
        {!loading && goldModels.length > 0 && (
          <>
            <section className="animate-fade-up pt-1 pb-1 flex flex-col gap-2 mt-4">
              {/* Ana Gold Vitrin */}
              <div className="relative flex items-center justify-between overflow-hidden border-y-2 border-[#D4AF37] bg-[#1e0024] px-4 py-3 shadow-2xl md:px-8 md:py-4">
                
                {/* Sol Siluet (Placeholder) */}
                <div className="flex h-10 w-10 items-center justify-center text-[#D4AF37] md:h-16 md:w-16">
                  {/* Not: Müşterinin tam siluet görseli buraya gelecek */}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full opacity-90 drop-shadow-md">
                    <path d="M12 2L15 9L22 9L16.5 14L18.5 22L12 17.5L5.5 22L7.5 14L2 9L9 9L12 2Z" />
                  </svg>
                </div>

                {/* Orta Metin */}
                <div className="flex items-center gap-2 md:gap-4">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#D4AF37] drop-shadow-md md:h-6 md:w-6">
                    <path d="M12 2L15 9L22 9L16.5 14L18.5 22L12 17.5L5.5 22L7.5 14L2 9L9 9L12 2Z" />
                  </svg>
                  <h2 className="font-display text-lg font-black italic tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] md:text-2xl">
                    GOLD VİTRİN
                  </h2>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#D4AF37] drop-shadow-md md:h-6 md:w-6">
                    <path d="M12 2L15 9L22 9L16.5 14L18.5 22L12 17.5L5.5 22L7.5 14L2 9L9 9L12 2Z" />
                  </svg>
                </div>

                {/* Sağ Siluet (Placeholder - Aynalanmış) */}
                <div className="flex h-10 w-10 scale-x-[-1] items-center justify-center text-[#D4AF37] md:h-16 md:w-16">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full opacity-90 drop-shadow-md">
                    <path d="M12 2L15 9L22 9L16.5 14L18.5 22L12 17.5L5.5 22L7.5 14L2 9L9 9L12 2Z" />
                  </svg>
                </div>
                
              </div>
            </section>

            {/* ── Gold Vitrin Grid ─────────────────────────────────────────── */}
            <section className="grid grid-cols-4 gap-1 md:gap-3 pt-0 pb-12">
              {goldModels.map((model, index) => (
                <article
                  key={`gold-${model.id}`}
                  style={{ animationDelay: `${Math.min(index, 20) * 30}ms` }}
                  className="group relative animate-fade-up overflow-hidden rounded-md border border-border/70 bg-card shadow-lg shadow-black/40 transition-colors hover:border-[#D4AF37]/50 aspect-[3/4] w-full max-w-[84px] md:max-w-[108px] mx-auto"
                >
                  <button
                    type="button"
                    onClick={() => handleWhatsApp(model.whatsappPhone)}
                    aria-label={`${model.firstName} ile iletişime geç`}
                    className="relative flex h-full w-full flex-col items-center justify-center"
                  >
                    {model.photos && model.photos.length > 0 ? (
                      <img
                        src={mediaUrl(model.photos[0].url)}
                        alt={model.firstName}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted text-[10px] uppercase tracking-widest text-muted-foreground">
                        Foto Yok
                      </div>
                    )}
                    
                    {/* Alt Bilgi Overlay */}
                    <div className="absolute bottom-0 left-0 flex w-full flex-col items-start justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 md:p-3">
                      <h3 className="font-display text-xs md:text-sm font-bold text-[#D4AF37] drop-shadow-md">
                        {model.firstName}
                      </h3>
                    </div>
                    
                    {/* Sol Üst Kral Tacı */}
                    <div className="absolute left-1 top-1 md:left-2 md:top-2 z-20">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 md:h-5 md:w-5 text-[#D4AF37] drop-shadow-md">
                        <path d="M2 20h20v2H2v-2zm1.6-1.8L2 7l5 3 5-8 5 8 5-3-1.6 11.2H3.6z" />
                      </svg>
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
