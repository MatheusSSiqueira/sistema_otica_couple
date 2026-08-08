import { PageHeader } from '@components/layout';

export default function CustomersPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        title="Clientes"
        description="Base de clientes com histórico de compra, CPF, contato e observações de prescrição."
      />

      <div className="rounded-[2rem] border border-accent-100 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
        <p className="text-sm leading-6 text-accent-600">
          Esta tela vai concentrar relacionamento, fidelidade e informações úteis para o atendimento.
        </p>
      </div>
    </section>
  );
}