import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { LogOut, Plus, Trash2, Edit } from 'lucide-react';

import { useAuthStore } from '../../store/authStore';
import api from '../../api/axios';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

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
    defaultValues: {
      name: '', email: '', password: '', totalLimit: 10
    }
  });

  const editForm = useForm<UpdateLimitFormValues>({
    resolver: zodResolver(updateLimitSchema),
  });

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/companies');
      // Adapting for pagination response format
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
    if (!window.confirm('Bu firmayı silmek istediğinize emin misiniz?')) return;
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
    editForm.reset({ totalLimit: company.totalLimit });
    setIsEditOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-background flex">
        <aside className="w-64 border-r bg-card flex flex-col hidden md:flex">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold tracking-tight text-primary">TMÖ <span className="text-foreground">ADMIN</span></h2>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Button variant="secondary" className="w-full justify-start font-medium">Firmalar</Button>
          </nav>
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">A</div>
              <div className="text-sm">
                <p className="font-medium">{user?.email}</p>
                <p className="text-xs text-muted-foreground">Yönetici</p>
              </div>
            </div>
            <Button variant="outline" className="w-full gap-2" onClick={logout}>
              <LogOut className="w-4 h-4" /> Çıkış Yap
            </Button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="h-16 border-b flex items-center justify-between px-4 md:hidden bg-card">
            <h2 className="text-xl font-bold">TMÖ ADMIN</h2>
            <Button variant="ghost" size="icon" onClick={logout}><LogOut className="w-5 h-5" /></Button>
          </header>

          <div className="flex-1 overflow-auto p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Firma Yönetimi</h1>
                  <p className="text-muted-foreground">Sisteme kayıtlı tüm ajans ve firmaları buradan yönetebilirsiniz.</p>
                </div>
                <Button className="gap-2" onClick={() => setIsAddOpen(true)}>
                  <Plus className="w-4 h-4" /> Yeni Firma Ekle
                </Button>
              </div>

              <Card className="border-border/50 shadow-sm">
                <CardHeader className="bg-muted/50 border-b">
                  <CardTitle className="text-lg">Kayıtlı Firmalar</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px] sm:w-auto">Firma Adı</TableHead>
                        <TableHead className="w-[120px] sm:w-auto">Email</TableHead>
                        <TableHead>Kullanılan Limit</TableHead>
                        <TableHead>Toplam Limit</TableHead>
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
                      ) : companies.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                            Kayıtlı firma bulunamadı.
                          </TableCell>
                        </TableRow>
                      ) : (
                        companies.map((company) => (
                          <TableRow key={company.id}>
                            <TableCell className="font-medium max-w-[100px] sm:max-w-[200px] truncate" title={company.name}>
                              {company.name}
                            </TableCell>
                            <TableCell className="max-w-[100px] sm:max-w-[200px] truncate" title={company.user?.email}>
                              {company.user?.email}
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{company.usedLimit}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{company.totalLimit}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="icon" onClick={() => openEditModal(company)}>
                                  <Edit className="w-4 h-4 text-muted-foreground" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteCompany(company.id)}>
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Add Company Modal */}
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Yeni Firma Oluştur</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label className={addForm.formState.errors.name ? 'text-destructive' : ''}>Firma Adı</Label>
                      <Input {...addForm.register('name')} className={addForm.formState.errors.name ? 'border-destructive' : ''} />
                      {addForm.formState.errors.name && <p className="text-sm text-destructive">{addForm.formState.errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className={addForm.formState.errors.email ? 'text-destructive' : ''}>Email</Label>
                      <Input type="email" {...addForm.register('email')} className={addForm.formState.errors.email ? 'border-destructive' : ''} />
                      {addForm.formState.errors.email && <p className="text-sm text-destructive">{addForm.formState.errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className={addForm.formState.errors.password ? 'text-destructive' : ''}>Şifre</Label>
                      <Input type="password" {...addForm.register('password')} className={addForm.formState.errors.password ? 'border-destructive' : ''} />
                      {addForm.formState.errors.password && <p className="text-sm text-destructive">{addForm.formState.errors.password.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className={addForm.formState.errors.totalLimit ? 'text-destructive' : ''}>İlan Limiti</Label>
                      <Input type="number" {...addForm.register('totalLimit', { valueAsNumber: true })} className={addForm.formState.errors.totalLimit ? 'border-destructive' : ''} />
                      {addForm.formState.errors.totalLimit && <p className="text-sm text-destructive">{addForm.formState.errors.totalLimit.message}</p>}
                    </div>
                    <Button type="submit" className="w-full" disabled={addForm.formState.isSubmitting}>
                      {addForm.formState.isSubmitting ? 'Oluşturuluyor...' : 'Oluştur'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              {/* Edit Limit Modal */}
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Limit Güncelle</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label className={editForm.formState.errors.totalLimit ? 'text-destructive' : ''}>Yeni Limit</Label>
                      <Input type="number" {...editForm.register('totalLimit', { valueAsNumber: true })} className={editForm.formState.errors.totalLimit ? 'border-destructive' : ''} />
                      {editForm.formState.errors.totalLimit && <p className="text-sm text-destructive">{editForm.formState.errors.totalLimit.message}</p>}
                    </div>
                    <Button type="submit" className="w-full" disabled={editForm.formState.isSubmitting}>
                      {editForm.formState.isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}
