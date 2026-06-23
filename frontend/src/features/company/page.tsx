import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { LogOut, Plus, Trash2, Users, AlertCircle, ImagePlus, User, Ruler, MapPin, Phone } from 'lucide-react';

import { useAuthStore } from '../../store/authStore';
import api from '../../api/axios';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

import { createModelSchema } from './types';
import type { Model, CreateModelFormValues } from './types';

export default function CompanyPage() {
  const { logout, user, updateCompanyLimit } = useAuthStore();
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateModelFormValues>({
    resolver: zodResolver(createModelSchema),
  });

  const fetchModels = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/company/models');
      setModels(data.data || data);
    } catch (error) {
      toast.error('Mankenler getirilirken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const onAddSubmit = async (data: CreateModelFormValues) => {
    if (!user?.company) return;
    if (user.company.usedLimit >= user.company.totalLimit) {
      toast.error('İlan limitiniz dolmuştur.');
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      
      if (fileInputRef.current?.files?.length) {
        Array.from(fileInputRef.current.files).forEach(file => {
          formData.append('photos', file);
        });
      }

      await api.post('/company/models', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Manken başarıyla eklendi.');
      setIsAddOpen(false);
      reset();
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      updateCompanyLimit(user.company.usedLimit + 1);
      fetchModels();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Manken eklenirken hata oluştu.');
    }
  };

  const handleDeleteModel = async (id: string) => {
    if (!window.confirm('Bu mankeni silmek istediğinize emin misiniz?')) return;
    try {
      await api.delete(`/company/models/${id}`);
      toast.success('Manken silindi.');
      if (user?.company) {
        updateCompanyLimit(Math.max(0, user.company.usedLimit - 1));
      }
      fetchModels();
    } catch (error) {
      toast.error('Manken silinirken hata oluştu.');
    }
  };

  const remainingLimit = user?.company ? user.company.totalLimit - user.company.usedLimit : 0;
  const isLimitReached = remainingLimit <= 0;

  return (
    <>
      <Helmet>
        <title>Ajans Paneli | TMÖ AGENCY</title>
      </Helmet>
      <div className="min-h-screen bg-background flex">
        <aside className="w-64 border-r bg-card flex flex-col hidden md:flex">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold tracking-tight text-primary">TMÖ <span className="text-foreground">AGENCY</span></h2>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Button variant="secondary" className="w-full justify-start font-medium">Mankenlerim</Button>
          </nav>
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {user?.company?.name?.charAt(0).toUpperCase() || 'C'}
              </div>
              <div className="text-sm overflow-hidden">
                <p className="font-medium truncate">{user?.company?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full gap-2" onClick={logout}>
              <LogOut className="w-4 h-4" /> Çıkış Yap
            </Button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="h-16 border-b flex items-center justify-between px-4 md:hidden bg-card">
            <h2 className="text-xl font-bold">TMÖ AGENCY</h2>
            <Button variant="ghost" size="icon" onClick={logout}><LogOut className="w-5 h-5" /></Button>
          </header>

          <div className="flex-1 overflow-auto p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Ajans Paneli</h1>
                <p className="text-muted-foreground">Manken ilanlarınızı yönetin ve durumunuzu takip edin.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Toplam İlan Hakkı</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{user?.company?.totalLimit}</div>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Kullanılan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{user?.company?.usedLimit}</div>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-primary">Kalan İlan Hakkı</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{remainingLimit}</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border/50 shadow-sm">
                <CardHeader className="bg-muted/50 border-b flex flex-row items-center justify-between py-4">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="w-5 h-5" /> Yayındaki Mankenlerim
                    </CardTitle>
                  </div>
                  
                  <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2" disabled={isLimitReached}>
                        <Plus className="w-4 h-4" /> İlan Ekle
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Yeni Manken Profili</DialogTitle>
                        <CardDescription>Lütfen mankene ait bilgileri eksiksiz doldurun.</CardDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit(onAddSubmit)} className="space-y-5 mt-4">
                        
                        {/* Fotoğraf Alanı */}
                        <div className="p-4 bg-muted/30 border border-border/50 rounded-xl space-y-3">
                          <h3 className="text-sm font-semibold flex items-center gap-2 text-primary">
                            <ImagePlus className="w-4 h-4" /> Medya Yükleme
                          </h3>
                          <div className="space-y-2">
                            <Label>Profil Fotoğrafları (Birden fazla seçebilirsiniz)</Label>
                            <Input type="file" accept="image/*" multiple ref={fileInputRef} className="cursor-pointer bg-background" />
                          </div>
                        </div>

                        {/* Kişisel Bilgiler */}
                        <div className="p-4 bg-muted/30 border border-border/50 rounded-xl space-y-4">
                          <h3 className="text-sm font-semibold flex items-center gap-2 text-primary">
                            <User className="w-4 h-4" /> Kişisel Bilgiler
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className={errors.firstName ? 'text-destructive' : ''}>Ad</Label>
                              <Input {...register('firstName')} placeholder="Manken Adı" className={`bg-background ${errors.firstName ? 'border-destructive' : ''}`} />
                              {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
                            </div>
                            <div className="space-y-2">
                              <Label className={errors.lastName ? 'text-destructive' : ''}>Soyad</Label>
                              <Input {...register('lastName')} placeholder="Manken Soyadı" className={`bg-background ${errors.lastName ? 'border-destructive' : ''}`} />
                              {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
                            </div>
                          </div>
                        </div>

                        {/* Fiziksel & Konum */}
                        <div className="p-4 bg-muted/30 border border-border/50 rounded-xl space-y-4">
                          <h3 className="text-sm font-semibold flex items-center gap-2 text-primary">
                            <Ruler className="w-4 h-4" /> Fiziksel Özellikler & İletişim
                          </h3>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label className={errors.height ? 'text-destructive' : ''}>Boy (cm)</Label>
                              <Input type="number" placeholder="175" {...register('height', { valueAsNumber: true })} className={`bg-background ${errors.height ? 'border-destructive' : ''}`} />
                            </div>
                            <div className="space-y-2">
                              <Label className={errors.weight ? 'text-destructive' : ''}>Kilo (kg)</Label>
                              <Input type="number" placeholder="55" {...register('weight', { valueAsNumber: true })} className={`bg-background ${errors.weight ? 'border-destructive' : ''}`} />
                            </div>
                            <div className="space-y-2">
                              <Label className={errors.age ? 'text-destructive' : ''}>Yaş</Label>
                              <Input type="number" placeholder="22" {...register('age', { valueAsNumber: true })} className={`bg-background ${errors.age ? 'border-destructive' : ''}`} />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="space-y-2">
                              <Label className={errors.city ? 'text-destructive' : ''}><MapPin className="w-3 h-3 inline mr-1"/>Şehir</Label>
                              <Input {...register('city')} placeholder="İstanbul" className={`bg-background ${errors.city ? 'border-destructive' : ''}`} />
                              {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
                            </div>
                            <div className="space-y-2">
                              <Label className={errors.whatsappPhone ? 'text-destructive' : ''}><Phone className="w-3 h-3 inline mr-1"/>WhatsApp No</Label>
                              <Input 
                                {...register('whatsappPhone', {
                                  onChange: (e) => {
                                    let val = e.target.value.replace(/[^\d]/g, '');
                                    if (val.length > 0 && val[0] !== '0') {
                                      val = '0' + val;
                                    }
                                    e.target.value = val;
                                  }
                                })} 
                                placeholder="0555 123 45 67" 
                                className={`bg-background ${errors.whatsappPhone ? 'border-destructive' : ''}`} 
                              />
                              {errors.whatsappPhone && <p className="text-xs text-destructive">{errors.whatsappPhone.message}</p>}
                            </div>
                          </div>
                        </div>

                        <Button type="submit" className="w-full font-bold h-10 shadow-md hover:shadow-lg transition-all" disabled={isSubmitting}>
                          {isSubmitting ? 'Kaydediliyor...' : 'Yayınla'}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>

                <CardContent className="p-0">
                  {isLimitReached && (
                    <div className="p-4 bg-destructive/10 border-b border-destructive/20 flex items-center gap-3 text-destructive">
                      <AlertCircle className="w-5 h-5" />
                      <p className="text-sm font-medium">İlan ekleme limitinize ulaştınız. Daha fazla manken eklemek için yeni limit talep ediniz.</p>
                    </div>
                  )}
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Foto</TableHead>
                        <TableHead>Ad Soyad</TableHead>
                        <TableHead>Şehir</TableHead>
                        <TableHead>Fiziksel</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                          <TableRow key={i}>
                            <TableCell colSpan={5}>
                              <div className="h-10 bg-muted animate-pulse rounded"></div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : models.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                            Henüz hiç manken eklemediniz.
                          </TableCell>
                        </TableRow>
                      ) : (
                        models.map((model) => (
                          <TableRow key={model.id}>
                            <TableCell>
                              <div className="w-10 h-10 rounded-md overflow-hidden bg-muted">
                                {model.photos?.[0]?.url ? (
                                  <img src={`http://localhost:5000${model.photos[0].url}`} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">Yok</div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{model.firstName} {model.lastName}</TableCell>
                            <TableCell>{model.city}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {model.height}cm / {model.weight}kg / {model.age}y
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteModel(model.id)}>
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}
