import './purchases.css';
import Link from 'next/link';
import { getAllItems, getItemIds } from '../utils/supabaseUtils';
import { createClient } from '../../../utils/supabase/server';

import { getDictionary } from '../../../get-dictionaries';
import { Locale } from '../../../get-dictionaries';
import Image from 'next/image';

interface ProductsProps {
  lang: Locale;
}

export default async function PurchasedProducts({
  lang = 'en',
}: ProductsProps) {
  const dictionary = await getDictionary(lang as 'en');
  let products: any;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  const { data, error } = await supabase
    .from('purchased_products')
    .select('*')
    .eq('user_id', userId);
  products = data;
  // to test received products
  console.log(products);
  if (error) {
    console.error('Error fetching products:', error);
    products = '';
    return null;
  }
  if (!products) {
    return (
      <main className="purchases-main">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '4.4rem',
            fontSize: '4.2rem',
          }}
        >
          {dictionary.products.noProducts}.
        </div>
      </main>
    );
  }

  return (
    <main className="purchases-main">
      <h1 className="purchases-title">
        Purchased {dictionary.products.products}
      </h1>
      <div className="purchases-list">
        {products.map((product: any) => (
          <div key={product.id} className="purchase-item">
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