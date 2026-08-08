import { PageHeader } from '@components/layout';

import { useAuth } from '@/hooks';
import type { FormEvent } from 'react';
import { useState } from 'react';

export default function LoginPage() {
  const { loginWithCredentials } = useAuth();
  const [email, setEmail] = useState('operador@oticacouple.com.br');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await loginWithCredentials({ email, password });
    } catch {
      setErrorMessage('Não foi possível autenticar. Verifique suas credenciais e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-6">
      <PageHeader
        title="Login"
        description="Tela de autenticação do operador com foco em entrada rápida para o balcão e o caixa."
      />

      <div className="mx-auto max-w-xl rounded-[2rem] border border-accent-100 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
        <form className="space-y-4" onSubmit={handleLogin}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-accent-700">E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-accent-100 bg-neutral-50 px-4 py-3 outline-none transition focus:border-primary-400"
              placeholder="operador@oticacouple.com.br"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-accent-700">Senha</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-accent-100 bg-neutral-50 px-4 py-3 outline-none transition focus:border-primary-400"
              placeholder="••••••••"
            />
          </label>

          {errorMessage ? <p className="text-sm text-danger">{errorMessage}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-accent-900 px-4 py-3 font-medium text-neutral-50 transition hover:bg-accent-700"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </section>
  );
}