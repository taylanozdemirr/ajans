import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Plus, Trash2, Users, AlertCircle, ImagePlus, User, Phone } from 'lucide-react';

import { useAuthStore } from '@/store/authStore';
import { mediaUrl } from '@/lib/media';
import api from '@/api/axios';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PanelLayout } from '@/components/panel-layout';
import { ConfirmDialog } from '@/components/confirm-dialog';

import { createModelSchema } from './types';
import type { Model, CreateModelFormValues } from './types';

export default function CompanyPage() {
  const { logout, user, updateCompanyLimit } = useAuthStore();
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateModelFormValues>({
    resolver: zodResolver(createModelSchema),
  });

  const fetchModels = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/company/models');
      setModels(data.data || data);
    } catch (error) {
      toast.error('Masörler getirilirken hata oluştu.');
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

    if (user.company.tier === 'GOLD' && fileInputRef.current?.files && fileInputRef.current.files.length > 1) {
      toast.error('GOLD üyeliğiniz gereği sadece 1 fotoğraf yükleyebilirsiniz.');
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      if (fileInputRef.current?.files?.length) {
        Array.from(fileInputRef.current.files).forEach((file) => {
          formData.append('photos', file);
        });
      }

      await api.post('/company/models', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Masör başarıyla eklendi.');
      setIsAddOpen(false);
      reset();
      if (fileInputRef.current) fileInputRef.current.value = '';

      updateCompanyLimit(user.company.usedLimit + 1);
      fetchModels();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Masör eklenirken hata oluştu.');
    }
  };

  const handleDeleteModel = async (id: string) => {
    try {
      await api.delete(`/company/models/${id}`);
      toast.success('Masör silindi.');
      if (user?.company) {
        updateCompanyLimit(Math.max(0, user.company.usedLimit - 1));
      }
      fetchModels();
    } catch (error) {
      toast.error('Masör silinirken hata oluştu.');
    }
  };

  const totalLimit = user?.company?.totalLimit ?? 0;
  const usedLimit = user?.company?.usedLimit ?? 0;
  const remainingLimit = Math.max(0, totalLimit - usedLimit);
  const isLimitReached = remainingLimit <= 0;
  const usedPct = totalLimit > 0 ? Math.min(100, (usedLimit / totalLimit) * 100) : 0;

  return (
    <PanelLayout
      tag="İşletme"
      nav={[{ label: 'Masörlerim', icon: Users, active: true }]}
      user={{ name: user?.company?.name || 'İşletme', email: user?.email, role: 'İşletme' }}
      onLogout={logout}
    >
      <div className="space-y-8">
        <header className="animate-fade-up">
          <h1 className="font-display text-3xl font-medium tracking-tight md:text-4xl">İşletme Paneli</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Masör ilanlarınızı yönetin ve ilan hakkınızı takip edin.
          </p>
        </header>

        {/* Quota ledger */}
        <section className="animate-fade-up rounded-xl border border-border bg-card p-6 [animation-delay:60ms]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Kalan ilan hakkı
              </p>
              <p className="mt-1 font-display text-5xl font-medium leading-none text-primary">
                {remainingLimit}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{usedLimit}</span> / {totalLimit} kullanıldı
            </p>
          </div>
          <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
              style={{ width: `${usedPct}%` }}
            />
          </div>
        </section>

        {/* Roster */}
        <section className="animate-fade-up overflow-hidden rounded-xl border border-border bg-card [animation-delay:120ms]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <Users className="h-4 w-4 text-muted-foreground" /> Yayındaki Masörlerim
            </h2>

            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2" disabled={isLimitReached}>
                  <Plus className="h-4 w-4" /> İlan Ekle
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-display text-xl font-medium tracking-tight">
                    Yeni Masör Profili
                  </DialogTitle>
                  <DialogDescription>Lütfen masöre ait bilgileri eksiksiz doldurun.</DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit(onAddSubmit, () => toast.error('Lütfen alanları kontrol edin.'))}
                  className="mt-4 space-y-5"
                >
                  <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-4">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <ImagePlus className="h-4 w-4 text-primary" /> Medya Yükleme
                    </h3>
                    <div className="space-y-2">
                      <Label>
                        Profil fotoğrafları {user?.company?.tier === 'GOLD' ? '(Sadece 1 fotoğraf)' : '(Birden fazla seçebilirsiniz)'}
                      </Label>
                      <Input 
                        type="file" 
                        accept="image/*" 
                        multiple={user?.company?.tier !== 'GOLD'} 
                        ref={fileInputRef} 
                        className="cursor-pointer" 
                      />
                    </div>
                  </div>

                  <div className="space-y-4 rounded-lg border border-border bg-muted/40 p-4">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <User className="h-4 w-4 text-primary" /> Temel Bilgiler
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label className={errors.firstName ? 'text-destructive' : ''}>Ad</Label>
                        <Input
                          {...register('firstName')}
                          placeholder="Masör adı"
                          className={errors.firstName ? 'border-destructive' : ''}
                        />
                        {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label className={errors.whatsappPhone ? 'text-destructive' : ''}>
                          <Phone className="mr-1 inline h-3 w-3" />
                          WhatsApp No
                        </Label>
                        <Input
                          {...register('whatsappPhone', {
                            onChange: (e) => {
                              let val = e.target.value.replace(/[^\d]/g, '');
                              if (val.length > 0 && val[0] !== '0') val = '0' + val;
                              e.target.value = val;
                            },
                          })}
                          placeholder="0555 123 45 67"
                          className={errors.whatsappPhone ? 'border-destructive' : ''}
                        />
                        {errors.whatsappPhone && <p className="text-xs text-destructive">{errors.whatsappPhone.message}</p>}
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="h-10 w-full font-medium" disabled={isSubmitting}>
                    {isSubmitting ? 'Kaydediliyor…' : 'Yayınla'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {isLimitReached && (
            <div className="flex items-center gap-3 border-b border-destructive/25 bg-destructive/10 px-6 py-3 text-destructive">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">
                İlan ekleme limitinize ulaştınız. Daha fazla masör eklemek için yeni limit talep edin.
              </p>
            </div>
          )}

          <Table className="[&_th]:px-3 [&_td]:px-3 [&_th:first-child]:pl-6 [&_td:first-child]:pl-6 [&_th:last-child]:pr-6 [&_td:last-child]:pr-6">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[80px]">Foto</TableHead>
                <TableHead>Ad</TableHead>
                <TableHead>WhatsApp</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={4}>
                      <div className="h-10 animate-pulse rounded bg-muted" />
                    </TableCell>
                  </TableRow>
                ))
              ) : models.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={4} className="h-36 text-center">
                    <p className="font-display text-lg text-foreground">Henüz masör eklemediniz</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      “İlan Ekle” ile ilk profilinizi yayınlayın.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                models.map((model) => (
                  <TableRow key={model.id}>
                    <TableCell>
                      <div className="h-11 w-11 overflow-hidden rounded-md bg-muted">
                        {model.photos?.[0]?.url ? (
                          <img src={mediaUrl(model.photos[0].url)} alt={model.firstName} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[0.65rem] text-muted-foreground">
                            Yok
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{model.firstName}</TableCell>
                    <TableCell className="text-muted-foreground">{model.whatsappPhone}</TableCell>
                    <TableCell className="text-right">
                      <ConfirmDialog
                        title="Masörü sil"
                        description={`“${model.firstName}” profili kalıcı olarak silinecek. Bu işlem geri alınamaz.`}
                        confirmLabel="Sil"
                        destructive
                        onConfirm={() => handleDeleteModel(model.id)}
                      >
                        <Button variant="ghost" size="icon" aria-label="Sil">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </ConfirmDialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </section>
      </div>
    </PanelLayout>
  );
}
