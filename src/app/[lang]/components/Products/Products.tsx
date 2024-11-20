import Link from 'next/link';
import { getAllItems, getItemIds } from '../../utils/supabaseUtils'; // Update the path if needed

export const revalidate = 60; // Enable ISR

// Generate static params for dynamic routes
export async function generateStaticParams() {
  const productIds = await getItemIds('products'); // Fetch only IDs from the 'products' table

  if (!productIds) {
    return [];
  }

  return productIds.map((id) => ({
    id: id.toString(), // Convert IDs to strings as route parameters
  }));
}

export default async function Products() {
  const products = await getAllItems('products');

  if (!products) {
    return <p>No products found.</p>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              {product.title || 'Untitled Product'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
