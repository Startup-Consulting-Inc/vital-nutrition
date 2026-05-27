import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useT } from '@/lib/i18n';
import AuthModal from './AuthModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function UserMenu() {
  const t = useT();
  const { user, isAnonymous, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  const displayName = user?.displayName || user?.email?.split('@')[0] || t('auth.guest');
  const avatarUrl = user?.photoURL;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 px-3 py-1.5 h-auto hover:bg-deep/5"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt=""
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-terracotta/20 flex items-center justify-center">
                <span className="text-xs font-medium text-terracotta">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-xs text-deep/70 hidden sm:inline max-w-[80px] truncate">
              {displayName}
            </span>
            {isAnonymous && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                Guest
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56" style={{ backgroundColor: '#f6f5f1' }}>
          <div className="px-3 py-2">
            <p className="text-sm font-medium text-deep">{displayName}</p>
            {user?.email && (
              <p className="text-xs text-deep/50 truncate">{user.email}</p>
            )}
          </div>

          <DropdownMenuSeparator />

          {isAnonymous ? (
            <DropdownMenuItem onClick={() => setAuthOpen(true)} className="cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2 text-terracotta">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              {t('auth.signIn')} / {t('auth.signUp')}
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem onClick={() => setAuthOpen(true)} className="cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2 text-deep/40">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
                {t('auth.linkAccount')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                {t('auth.signOut')}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
