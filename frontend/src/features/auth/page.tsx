import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

import { Brand } from '@/components/brand';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import api from '@/api/axios';
import { loginSchema } from './types';
import type { LoginFormValues } from './types';

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', data);
      const { token, user } = response.data;

      setAuth(token, user);
      toast.success('Giriş başarılı!');
      window.location.href = '/dashboard';
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grain opacity-[0.035]" />
      <ThemeToggle className="absolute right-4 top-4 z-20" />

      <div className="relative z-10 w-full max-w-md animate-fade-up">
        <div className="mb-9 flex justify-center">
          <Brand href="/" size="lg" />
        </div>

        <Card className="border-border/70 shadow-2xl shadow-black/10">
          <CardHeader className="space-y-1.5 text-center">
            <CardTitle className="font-display text-2xl font-medium tracking-tight">
              Yönetim Paneli
            </CardTitle>
            <CardDescription>Devam etmek için hesabınıza giriş yapın.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className={errors.email ? 'text-destructive' : ''}>
                  E-posta Adresi
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@istanbulmasaj.com"
                  autoComplete="email"
                  {...register('email')}
                  className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className={errors.password ? 'text-destructive' : ''}>
                  Şifre
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register('password')}
                  className={errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="h-10 w-full font-medium" type="submit" disabled={loading}>
                {loading ? 'Giriş yapılıyor…' : 'Giriş Yap'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <a
          href="/"
          className="mt-6 inline-flex w-full items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Vitrine dön
        </a>
      </div>
    </div>
  );
}
