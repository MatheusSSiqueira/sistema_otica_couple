import { PageHeader } from '@components/layout';

export default function SettingsPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        title="Configurações"
        description="Preferências gerais, integrações, usuários e parâmetros operacionais da loja."
      />

      <div className="rounded-[2rem] border border-accent-100 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
        <p className="text-sm leading-6 text-accent-600">
          Este espaço abriga as definições do sistema, perfis de acesso e integrações de suporte.
        </p>
      </div>
    </section>
  );
}