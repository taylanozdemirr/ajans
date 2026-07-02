import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Plus, Trash2, Edit, Building2 } from 'lucide-react';

import { useAuthStore } from '@/store/authStore';
import api from '@/api/axios';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PanelLayout } from '@/components/panel-layout';
import { ConfirmDialog } from '@/components/confirm-dialog';

import { createCompanySchema, updateLimitSchema } from './types';
import type { Company, CreateCompanyFormValues, UpdateLimitFormValues } from './types';

export default function AdminPage() {
  const { logout, user } = useAuthStore();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCompanyId, setEditCompanyId] = useState('');

  const addForm = useForm<CreateCompanyFormValues>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: { name: '', email: '', password: '', totalLimit: 10, tier: 'GOLD' },
  });

  const editForm = useForm<UpdateLimitFormValues>({
    resolver: zodResolver(updateLimitSchema),
  });

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/companies');
      setCompanies(data.data || data);
    } catch (error) {
      toast.error('Firmalar getirilirken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const onAddSubmit = async (data: CreateCompanyFormValues) => {
    try {
      await api.post('/admin/companies', data);
      toast.success('Firma başarıyla eklendi.');
      setIsAddOpen(false);
      addForm.reset();
      fetchCompanies();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Firma eklenirken hata oluştu.');
    }
  };

  const handleDeleteCompany = async (id: string) => {
    try {
      await api.delete(`/admin/companies/${id}`);
      toast.success('Firma silindi.');
      fetchCompanies();
    } catch (error) {
      toast.error('Firma silinirken hata oluştu.');
    }
  };

  const onEditSubmit = async (data: UpdateLimitFormValues) => {
    try {
      await api.patch(`/admin/companies/${editCompanyId}/limit`, data);
      toast.success('Limit güncellendi.');
      setIsEditOpen(false);
      fetchCompanies();
    } catch (error) {
      toast.error('Limit güncellenirken hata oluştu.');
    }
  };

  const openEditModal = (company: Company) => {
    setEditCompanyId(company.id);
    editForm.reset({ totalLimit: company.totalLimit, tier: company.tier });
    setIsEditOpen(true);
  };

  return (
    <PanelLayout
      tag="Yönetim"
      nav={[{ label: 'Firmalar', icon: Building2, active: true }]}
      user={{ name: user?.email || 'Yönetici', email: 'Yönetici', role: 'ADMIN' }}
      onLogout={logout}
    >
      <div className="space-y-8">
        <header className="flex animate-fade-up flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-medium tracking-tight md:text-4xl">Firma Yönetimi</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sisteme kayıtlı tüm ajans ve firmaları buradan yönetin.
            </p>
          </div>
          <Button className="gap-2" onClick={() => setIsAddOpen(true)}>
            <Plus className="h-4 w-4" /> Yeni Firma Ekle
          </Button>
        </header>

        <section className="animate-fade-up overflow-hidden rounded-xl border border-border bg-card [animation-delay:80ms]">
          <div className="flex items-center justify-between gap-3 border-b border-border px-6 py-4">
            <h2 className="text-base font-semibold">Kayıtlı Firmalar</h2>
            {!loading && (
              <span className="text-xs text-muted-foreground">{companies.length} firma</span>
            )}
          </div>
          <Table className="[&_th]:px-3 [&_td]:px-3 [&_th:first-child]:pl-6 [&_td:first-child]:pl-6 [&_th:last-child]:pr-6 [&_td:last-child]:pr-6">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[120px] sm:w-auto">Firma Adı</TableHead>
                <TableHead className="w-[120px] sm:w-auto">E-posta</TableHead>
                <TableHead>Üyelik Tipi</TableHead>
                <TableHead>Kullanılan</TableHead>
                <TableHead>Toplam</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={5}>
                      <div className="h-10 animate-pulse rounded bg-muted" />
                    </TableCell>
                  </TableRow>
                ))
              ) : companies.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={6} className="h-28 text-center text-muted-foreground">
                    Kayıtlı firma bulunamadı.
                  </TableCell>
                </TableRow>
              ) : (
                companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell
                      className="max-w-[120px] truncate font-medium sm:max-w-[220px]"
                      title={company.name}
                    >
                      {company.name}
                    </TableCell>
                    <TableCell
                      className="max-w-[120px] truncate text-muted-foreground sm:max-w-[220px]"
                      title={company.user?.email}
                    >
                      {company.user?.email}
                    </TableCell>
                    <TableCell>
                      <Badge variant={company.tier === 'MEGA' ? 'default' : 'secondary'} className={company.tier === 'MEGA' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}>
                        {company.tier}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{company.usedLimit}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{company.totalLimit}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Limiti düzenle"
                          onClick={() => openEditModal(company)}
                        >
                          <Edit className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <ConfirmDialog
                          title="Firmayı sil"
                          description={`“${company.name}” firması ve bağlı tüm kayıtlar kalıcı olarak silinecek. Bu işlem geri alınamaz.`}
                          confirmLabel="Sil"
                          destructive
                          onConfirm={() => handleDeleteCompany(company.id)}
                        >
                          <Button variant="ghost" size="icon" aria-label="Sil">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </ConfirmDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </section>

        {/* Add Company */}
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display text-xl font-medium tracking-tight">
                Yeni Firma Oluştur
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label className={addForm.formState.errors.name ? 'text-destructive' : ''}>Firma Adı</Label>
                <Input
                  {...addForm.register('name')}
                  className={addForm.formState.errors.name ? 'border-destructive' : ''}
                />
                {addForm.formState.errors.name && (
                  <p className="text-sm text-destructive">{addForm.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className={addForm.formState.errors.email ? 'text-destructive' : ''}>E-posta</Label>
                <Input
                  type="email"
                  {...addForm.register('email')}
                  className={addForm.formState.errors.email ? 'border-destructive' : ''}
                />
                {addForm.formState.errors.email && (
                  <p className="text-sm text-destructive">{addForm.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className={addForm.formState.errors.password ? 'text-destructive' : ''}>Şifre</Label>
                <Input
                  type="password"
                  {...addForm.register('password')}
                  className={addForm.formState.errors.password ? 'border-destructive' : ''}
                />
                {addForm.formState.errors.password && (
                  <p className="text-sm text-destructive">{addForm.formState.errors.password.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className={addForm.formState.errors.totalLimit ? 'text-destructive' : ''}>İlan Limiti</Label>
                <Input
                  type="number"
                  {...addForm.register('totalLimit', { valueAsNumber: true })}
                  className={addForm.formState.errors.totalLimit ? 'border-destructive' : ''}
                />
                {addForm.formState.errors.totalLimit && (
                  <p className="text-sm text-destructive">{addForm.formState.errors.totalLimit.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className={addForm.formState.errors.tier ? 'text-destructive' : ''}>Üyelik Tipi</Label>
                <select
                  {...addForm.register('tier')}
                  className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${addForm.formState.errors.tier ? 'border-destructive' : ''}`}
                >
                  <option value="GOLD">GOLD</option>
                  <option value="MEGA">MEGA</option>
                </select>
                {addForm.formState.errors.tier && (
                  <p className="text-sm text-destructive">{addForm.formState.errors.tier.message}</p>
                )}
              </div>
              <Button type="submit" className="h-10 w-full font-medium" disabled={addForm.formState.isSubmitting}>
                {addForm.formState.isSubmitting ? 'Oluşturuluyor…' : 'Oluştur'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Limit */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display text-xl font-medium tracking-tight">Limit Güncelle</DialogTitle>
            </DialogHeader>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label className={editForm.formState.errors.totalLimit ? 'text-destructive' : ''}>Yeni Limit</Label>
                <Input
                  type="number"
                  {...editForm.register('totalLimit', { valueAsNumber: true })}
                  className={editForm.formState.errors.totalLimit ? 'border-destructive' : ''}
                />
                {editForm.formState.errors.totalLimit && (
                  <p className="text-sm text-destructive">{editForm.formState.errors.totalLimit.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className={editForm.formState.errors.tier ? 'text-destructive' : ''}>Üyelik Tipi</Label>
                <select
                  {...editForm.register('tier')}
                  className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${editForm.formState.errors.tier ? 'border-destructive' : ''}`}
                >
                  <option value="GOLD">GOLD</option>
                  <option value="MEGA">MEGA</option>
                </select>
                {editForm.formState.errors.tier && (
                  <p className="text-sm text-destructive">{editForm.formState.errors.tier.message}</p>
                )}
              </div>
              <Button type="submit" className="h-10 w-full font-medium" disabled={editForm.formState.isSubmitting}>
                {editForm.formState.isSubmitting ? 'Kaydediliyor…' : 'Kaydet'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </PanelLayout>
  );
}
