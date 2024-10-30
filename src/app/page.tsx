import { PaginatedTable } from "./templates/paginated-table"

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CoinLore',
  description:
    'a simple web app that displays information on cryptocurrency coin prices',
};

export default function Home() {
  return (
    <PaginatedTable />
  );
}
