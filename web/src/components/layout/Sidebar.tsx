const navigation = [
  { label: 'Dashboard', description: 'Visão geral da operação' },
  { label: 'POS', description: 'Frente de caixa e vendas' },
  { label: 'Produtos', description: 'Catálogo e estoque' },
  { label: 'Clientes', description: 'Cadastro e relacionamento' },
  { label: 'Relatórios', description: 'Indicadores gerenciais' },
  { label: 'Configurações', description: 'Preferências do sistema' }
];

export function Sidebar() {
  return (
    <aside className="border-b border-accent-100 bg-accent-500 px-5 py-6 text-neutral-50 lg:border-b-0 lg:border-r lg:border-accent-800">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-400/30 bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary-200">
          Otica Couple
        </div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-50">
          Optical store POS
        </h1>
        <p className="mt-2 max-w-xs text-sm leading-6 text-neutral-200">
          Operação de vendas, estoque e relacionamento em uma única superfície.
        </p>
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => (
          <button
            key={item.label}
            type="button"
            className="w-full rounded-2xl border border-transparent px-4 py-3 text-left transition hover:border-primary-400/30 hover:bg-neutral-50/5"
          >
            <div className="text-sm font-medium text-neutral-50">{item.label}</div>
            <div className="mt-0.5 text-xs text-neutral-300">{item.description}</div>
          </button>
        ))}
      </nav>
    </aside>
  );
}