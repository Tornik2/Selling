import Products from '@/app/[lang]/components/Products/Products';

export default function ProductsPage({ searchParams }) {
  return <Products searchParams={searchParams} />;
}
