import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Ruler, Scale } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
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
        <title>Modellerimiz | LUXE AGENCY</title>
        <meta name="description" content="Luxe Agency'nin özel ve profesyonel manken kadrosu. Şehrinizdeki en iyi yetenekleri keşfedin." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/50 bg-card/50 backdrop-blur-md sticky top-0 z-10">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-primary">LUXE <span className="text-foreground">AGENCY</span></h1>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a href="#" className="text-primary transition-colors">Modeller</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Hakkımızda</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">İletişim</a>
            </nav>
            <Button variant="outline" onClick={() => window.location.href = '/login'}>Ajans Girişi</Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <Badge variant="secondary" className="mb-4">Seçkin Kadro</Badge>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Profesyonel Mankenlerimiz</h2>
            <p className="text-lg text-muted-foreground">
              Projeniz için en uygun yüzleri keşfedin. Türkiye'nin önde gelen yetenekleri burada.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="overflow-hidden border-border/50">
                  <div className="w-full h-[400px] bg-muted animate-pulse"></div>
                  <CardContent className="p-5 space-y-4">
                    <div className="h-6 bg-muted animate-pulse rounded w-2/3"></div>
                    <div className="h-4 bg-muted animate-pulse rounded w-1/3"></div>
                    <div className="h-10 bg-muted animate-pulse rounded w-full mt-4"></div>
                  </CardContent>
                </Card>
              ))
            ) : models.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <p className="text-xl text-muted-foreground">Şu an gösterilecek manken bulunmuyor.</p>
              </div>
            ) : (
              models.map((model) => (
                <Card key={model.id} className="group overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
                  <div className="relative w-full h-[400px] overflow-hidden bg-muted">
                    {model.photoUrl ? (
                      <img 
                        src={`http://localhost:5000${model.photoUrl}`} 
                        alt={`${model.firstName} ${model.lastName}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary/20">
                        Fotoğraf Yok
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-foreground">
                        {model.company.name}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight">{model.firstName} {model.lastName}</h3>
                        <div className="flex items-center text-muted-foreground mt-1 text-sm">
                          <MapPin className="w-3.5 h-3.5 mr-1" /> {model.city}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">{model.age} Yaş</Badge>
                    </div>
                    
                    <div className="flex gap-4 mb-6">
                      <div className="flex items-center text-sm">
                        <Ruler className="w-4 h-4 mr-1.5 text-primary" />
                        <span className="font-medium">{model.height} cm</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Scale className="w-4 h-4 mr-1.5 text-primary" />
                        <span className="font-medium">{model.weight} kg</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full gap-2 transition-all" 
                      onClick={() => handleWhatsApp(model.whatsappPhone)}
                    >
                      <Phone className="w-4 h-4" /> WhatsApp'tan Ulaş
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
}
