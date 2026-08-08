import { useAuth } from '@/hooks';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="flex flex-col gap-4 border-b border-accent-100 bg-neutral-50 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-400">
          Painel operacional
        </p>
        <h2 className="mt-1 text-lg font-semibold text-accent-900">
          Bem-vindo ao centro de operações
        </h2>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="rounded-2xl border border-accent-100 bg-white px-4 py-3 text-sm text-accent-700 shadow-sm">
          {isAuthenticated ? `Sessão ativa: ${user?.Name ?? 'Operador'}` : 'Sessão não autenticada'}
        </div>
        {isAuthenticated ? (
          <button
            type="button"
            onClick={logout}
            className="rounded-2xl bg-accent-900 px-4 py-3 text-sm font-medium text-neutral-50 transition hover:bg-accent-700"
          >
            Sair
          </button>
        ) : null}
      </div>
    </header>
  );
}