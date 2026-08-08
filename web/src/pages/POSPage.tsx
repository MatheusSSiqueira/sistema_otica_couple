import { PageHeader } from '@components/layout';

export default function POSPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        title="POS"
        description="Espaço destinado ao fluxo de venda, busca de produtos e finalização do atendimento no balcão."
      />

      <div className="rounded-[2rem] border border-accent-100 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
        <p className="text-sm leading-6 text-accent-600">
          A tela do ponto de venda será conectada ao catálogo, ao carrinho e aos métodos de pagamento.
        </p>
      </div>
    </section>
  );
}