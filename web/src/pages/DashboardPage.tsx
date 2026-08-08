import { PageHeader } from '@components/layout';

import { formatCurrencyBRL, formatDatePtBR } from '@/utils';

const metrics = [
  { label: 'Vendas do dia', value: formatCurrencyBRL(12840.9), detail: '24 atendimentos concluídos' },
  { label: 'Produtos ativos', value: '2.418', detail: '36 itens com estoque baixo' },
  { label: 'Clientes cadastrados', value: '1.086', detail: '12 novos neste mês' },
  { label: 'Última sincronização', value: formatDatePtBR(new Date()), detail: 'Base atualizada há poucos minutos' }
];

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Acompanhe o fluxo de vendas, estoque e atendimento do dia em uma visão consolidada do PDV."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-[1.75rem] border border-accent-100 bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.05)]"
          >
            <p className="text-sm text-accent-500">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-accent-900">{metric.value}</p>
            <p className="mt-2 text-sm leading-6 text-accent-600">{metric.detail}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-[2rem] border border-accent-100 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
          <h3 className="text-lg font-semibold text-accent-900">Resumo operacional</h3>
          <p className="mt-2 text-sm leading-6 text-accent-600">
            A interface já nasce pronta para conectar estoque, caixa e CRM com foco em atendimento
            rápido no balcão.
          </p>
        </div>

        <div className="rounded-[2rem] border border-primary-200 bg-primary-50 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
          <h3 className="text-lg font-semibold text-accent-900">Próximo passo</h3>
          <p className="mt-2 text-sm leading-6 text-accent-700">
            Conecte as rotas do backend e substitua os placeholders por dados reais do caixa e do estoque.
          </p>
        </div>
      </div>
    </section>
  );
}