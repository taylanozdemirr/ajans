import { useState, useEffect } from 'react';
import { Phone, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import api from '../../api/axios';
import type { PublicModel } from './types';

export default function PublicPage() {
  const [models, setModels] = useState<PublicModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  return (
    <>
      <div className="min-h-screen bg-black overflow-hidden">
        <header className="border-b border-border/50 bg-card/50 backdrop-blur-md sticky top-0 z-10">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-primary">TMÖ <span className="text-foreground">AGENCY</span></h1>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a href="#" className="text-primary transition-colors">Modeller</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Hakkımızda</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">İletişim</a>
            </nav>
          </div>
        </header>

        <main className="py-4">
          <div className="flex flex-col border-t border-border/50">
            {loading ? (
              <div className="py-20 text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Vitrinler yükleniyor...</p>
              </div>
            ) : models.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-xl text-muted-foreground">Şu an gösterilecek manken bulunmuyor.</p>
              </div>
            ) : (
              models.map((model) => (
                <div key={model.id} className="relative w-full overflow-hidden mb-4 border border-[#D4AF37]/50 rounded-lg bg-black group">
                  
                  {/* Absolute Name Overlay on the Left */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <h3 className="text-xl md:text-2xl font-bold text-[#D4AF37] tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                      {model.firstName}
                    </h3>
                  </div>

                  {/* Marquee Photos */}
                  <div className="w-full relative overflow-hidden flex items-center h-[120px]">
                    {model.photos && model.photos.length > 0 ? (
                      <div className="animate-marquee gap-3 h-full py-3 pl-4 flex items-center">
                        {/* Render photos 3 times to ensure a smooth infinite loop */}
                        {[...model.photos, ...model.photos, ...model.photos, ...model.photos].map((photo, i) => (
                          <div 
                            key={`${photo.id}-${i}`} 
                            className="h-[80px] w-[60px] shrink-0 rounded-md overflow-hidden border border-[#D4AF37]/30 shadow-md shadow-black cursor-pointer"
                            onClick={() => handleWhatsApp(model.whatsappPhone)}
                          >
                            <img 
                              src={`http://localhost:5000${photo.url}`} 
                              alt={`${model.firstName}`}
                              loading="lazy"
                              className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#D4AF37]/50">
                        Fotoğraf yüklenmedi
                      </div>
                    )}
                    
                    {/* Gradient Fades for left/right edges */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/90 to-transparent z-10"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/90 to-transparent z-10"></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
}
