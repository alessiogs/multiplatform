import { Link, Outlet } from 'react-router-dom';
import { Card } from '@multiplatform/ui';

export function AuthLayout() {
  return (
    <main className="auth-page">
      <div className="auth-content">
        <Link className="auth-brand" to="/login">
          <span className="auth-brand-mark" aria-hidden="true">M</span>
          Multiplatform
        </Link>
        <Card variant="elevated" padding="lg" style={{ width: '100%' }}>
          <Outlet />
        </Card>
        <p className="auth-footer">A shared place for what matters.</p>
      </div>
    </main>
  );
}
