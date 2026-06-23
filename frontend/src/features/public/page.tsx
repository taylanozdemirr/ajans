import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
        const { data } = await api.get('/public/models');
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
      <Helmet>
        <title>Modellerimiz | TMÖ AGENCY</title>
        <meta name="description" content="TMÖ Agency'nin özel ve profesyonel manken kadrosu. Şehrinizdeki en iyi yetenekleri keşfedin." />
      </Helmet>
      
      <div className="min-h-screen bg-background overflow-hidden">
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
                <div key={model.id} className="flex flex-col md:flex-row items-center border-b border-border/30 py-2 hover:bg-muted/5 transition-colors group">
                  {/* Left Side - Model Info */}
                  <div className="w-full md:w-[280px] shrink-0 px-4 md:px-6 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-lg font-medium">
                        {model.firstName} {model.lastName}
                      </h3>
                      <Button 
                        size="sm"
                        className="h-7 px-2.5 text-[10px] bg-[#25D366] hover:bg-[#128C7E] text-white transition-colors gap-1.5 rounded-full" 
                        onClick={() => handleWhatsApp(model.whatsappPhone)}
                      >
                        <Phone className="w-3 h-3" /> WhatsApp
                      </Button>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      {model.age} Y • {model.height} cm • {model.weight} kg • {model.city}
                    </p>
                  </div>

                  {/* Right Side - Marquee Photos */}
                  <div className="w-full relative overflow-hidden flex-1 flex items-center">
                    {model.photos && model.photos.length > 0 ? (
                      <div className="animate-marquee gap-3 h-[120px]">
                        {/* Render photos 3 times to ensure a smooth infinite loop even if there are few photos */}
                        {[...model.photos, ...model.photos, ...model.photos, ...model.photos].map((photo, i) => (
                          <div key={`${photo.id}-${i}`} className="h-full w-[90px] shrink-0 rounded-sm overflow-hidden bg-muted/20">
                            <img 
                              src={`http://localhost:5000${photo.url}`} 
                              alt={`${model.firstName} ${model.lastName}`}
                              loading="lazy"
                              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="w-full h-[120px] flex items-center text-xs text-muted-foreground/50">
                        Fotoğraf yok
                      </div>
                    )}
                    
                    {/* Gradient Fades for left/right edges */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent z-10"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent z-10"></div>
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
