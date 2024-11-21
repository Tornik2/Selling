import Link from 'next/link';
import { getAllItems, getItemIds } from '../../utils/supabaseUtils';
import Image from 'next/image';
import './Products.css';

export const revalidate = 60;

export async function generateStaticParams() {
  const productIds = await getItemIds('products');
  if (!productIds) {
    return [];
  }

  return productIds.map((id) => ({
    id: id.toString(),
  }));
}

interface ProductsProps {
  lang: string;
}

export default async function Products({ lang }: ProductsProps) {
  const products = await getAllItems(
    `products_${lang}` as 'Services' | 'posts' | 'products'
  );
  console.log(products);

  if (!products) {
    return <p>No products found.</p>;
  }

  return (
    <main className="products-main">
      <h1 className="products-title">Products</h1>
      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <Link href={`/${lang}/products/${product.id}`} passHref>
              <div className="img-container">
                <Image
                  src={product.thumbnail || '/path/to/default-image.png'} // Provide fallback image
                  alt={product.title || 'Product Image'}
                  fill
                  priority
                  className="product-image"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="text-container">
                <h6>
                  <p>{product.category}</p>
                </h6>
                <h2>
                  <div>{product.title}</div>
                </h2>
                <p className="desc">{product.description}</p>
                <div className="attract">
                  <h3 className="brand">{product.brand}</h3>
                  <h4 className="pricing">{product.price}$</h4>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
