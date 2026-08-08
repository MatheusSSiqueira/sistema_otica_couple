import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 rounded-[2rem] border border-accent-100 bg-white/90 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.06)] backdrop-blur sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-700">
          Otica Couple POS
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-accent-900">
          {title}
        </h1>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-accent-600">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}