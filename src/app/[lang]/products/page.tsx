import Products from '../components/Products/Products';

interface ProductsPageProps {
  params: {
    lang: string;
  };
}

export default function ProductsPage({ params }: ProductsPageProps) {
  return <Products lang={params.lang} />;
}
