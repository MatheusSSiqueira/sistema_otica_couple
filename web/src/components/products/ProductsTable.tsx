import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { useMemo } from 'react';

import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { Product } from '@/types';
import { formatCurrency } from '@/utils/formatters';

interface ProductsTableProps {
  products: Product[];
  isLoading?: boolean;
}

export function ProductsTable({
  products,
  isLoading = false,
}: ProductsTableProps) {
  const columns: ColumnDef<Product>[] = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'Name',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === 'asc')
            }
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="font-medium text-accent-700">
            {row.getValue('Name')}
          </div>
        ),
      },
      {
        accessorKey: 'SKU',
        header: 'SKU',
        cell: ({ row }) => (
          <div className="text-sm text-muted-foreground font-mono">
            {row.getValue('SKU')}
          </div>
        ),
      },
      {
        accessorKey: 'SalePrice',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === 'asc')
            }
          >
            Preço
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-sm text-muted-foreground">
            {formatCurrency(row.getValue('SalePrice') as number)}
          </div>
        ),
      },
      {
        accessorKey: 'StockQuantity',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === 'asc')
            }
          >
            Estoque
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const stock = row.getValue('StockQuantity') as number;
          const minAlert = (row.original as Product).MinStockAlert || 10;
          const isLow = stock < minAlert;

          return (
            <div
              className={`text-sm font-medium ${
                isLow ? 'text-danger' : 'text-green-600'
              }`}
            >
              {stock} un.
            </div>
          );
        },
      },
      {
        accessorKey: 'IsActive',
        header: 'Status',
        cell: ({ row }) => (
          <div
            className={`text-xs font-semibold px-2.5 py-1.5 rounded-full w-fit ${
              row.getValue('IsActive')
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {row.getValue('IsActive') ? 'Ativo' : 'Inativo'}
          </div>
        ),
      },
    ],
    []
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Carregando produtos...</p>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={products}
      searchPlaceholder="Buscar por nome..."
      filterKey="Name"
    />
  );
}
