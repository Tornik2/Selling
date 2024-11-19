import React from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
}

interface ProductsData {
  products: Product[];
  total: number;
}

interface ProductsProps {
  searchParams: {
    page: string | undefined;
  };
}

const fetchProducts = async (page: number): Promise<ProductsData> => {
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const res = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], total: 0 };
  }
};

const Products: React.FC<ProductsProps> = ({ searchParams }) => {
  const page = parseInt(searchParams.page ?? '1', 10);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [totalPages, setTotalPages] = React.useState<number>(0);

  React.useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts(page);
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / 10));
    };

    loadData();
  }, [page]);

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
      {/* <Pagination currentPage={page} totalPages={totalPages} /> */}
    </div>
  );
};

export default Products;
