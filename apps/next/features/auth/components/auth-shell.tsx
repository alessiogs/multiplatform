import Link from 'next/link';
import { Card } from '@multiplatform/ui';

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="auth-page">
      <div className="auth-content">
        <Link className="auth-brand" href="/login">
          <span className="auth-brand-mark" aria-hidden="true">M</span>
          Multiplatform
        </Link>
        <Card variant="elevated" padding="lg" style={{ width: '100%' }}>
          {children}
        </Card>
        <p className="auth-footer">A shared place for what matters.</p>
      </div>
    </main>
  );
}
