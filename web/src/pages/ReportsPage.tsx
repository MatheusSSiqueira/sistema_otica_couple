import { PageHeader } from '@components/layout';

export default function ReportsPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        title="Relatórios"
        description="Indicadores de faturamento, estoque, produtos mais vendidos e performance do time."
      />

      <div className="rounded-[2rem] border border-accent-100 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
        <p className="text-sm leading-6 text-accent-600">
          Conecte gráficos e tabelas nessa área quando o backend expuser as consultas analíticas.
        </p>
      </div>
    </section>
  );
}