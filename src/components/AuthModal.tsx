import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useT } from '@/lib/i18n';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const t = useT();
  const { isAnonymous, signInWithGoogle, signInWithEmail, signUpWithEmail, linkWithGoogle, linkWithEmail, error, clearError } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  const isLinking = !isAnonymous;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLoading(true);

    try {
      if (mode === 'signin') {
        if (isLinking) {
          await linkWithEmail(email, password);
        } else {
          await signInWithEmail(email, password);
        }
        onClose();
      } else {
        await signUpWithEmail(email, password, displayName || undefined);
        onClose();
      }
    } catch {
      // Error is handled by useAuth
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    clearError();
    setLoading(true);
    try {
      if (isLinking) {
        await linkWithGoogle();
      } else {
        await signInWithGoogle();
      }
      onClose();
    } catch {
      // Error is handled by useAuth
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-md" style={{ backgroundColor: '#f6f5f1' }}>
        <DialogHeader>
          <DialogTitle className="text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            {isLinking ? t('auth.linkAccount') : mode === 'signin' ? t('auth.signIn') : t('auth.signUp')}
          </DialogTitle>
        </DialogHeader>

        {isAnonymous && (
          <div className="p-3 rounded-lg bg-terracotta/5 border border-terracotta/10">
            <p className="text-sm text-deep/70">
              <span className="font-semibold text-deep">{t('auth.why')}</span>{' '}
              {t('auth.whyBody')}
            </p>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="text-sm">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleGoogle}
          disabled={loading}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 h-11"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {t('auth.google')}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-deep/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#f6f5f1] px-2 text-deep/40">or</span>
          </div>
        </div>

        <Tabs value={mode} onValueChange={(v) => { setMode(v as 'signin' | 'signup'); clearError(); }}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">{t('auth.signIn')}</TabsTrigger>
            <TabsTrigger value="signup">{t('auth.signUp')}</TabsTrigger>
          </TabsList>

          <TabsContent value={mode}>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-sm text-deep/70">Display Name</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your name"
                    className="bg-white"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-deep/70">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-deep/70">{t('auth.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="bg-white"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-deep hover:bg-deep/90 text-inverse"
              >
                {loading ? '...' : mode === 'signin' ? t('auth.signIn') : t('auth.signUp')}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
