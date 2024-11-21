import './productPage.css';
import ImageSlider from '../../utils/imageSlider';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import QuantitySelector from '../../utils/quantitySelector';
import { getItemById } from '../../utils/supabaseUtils'; // Import the function to fetch data from Supabase
import { Database } from '../../utils/database.types'; // Make sure you have this type for your database

// Function to render the stars based on rating
const renderStars = (rating: number) => {
  const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
  const fullStars = Math.floor(roundedRating); // Get the full star count
  const hasHalfStar = roundedRating - fullStars === 0.5; // Check if there's a half star
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
  }

  if (hasHalfStar) {
    stars.push(<FontAwesomeIcon key={fullStars} icon={faStarHalfAlt} />);
  }
  return stars;
};

// Function to format the date if necessary
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
};

interface ProductPageProps {
  params: { id: string; lang: string }; // Product ID from URL params
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params; // Get the ID from URL parameters

  // Fetch product details from Supabase
  const product = await getItemById(
    `products_${params.lang}` as 'Services' | 'posts' | 'products',
    id
  );

  if (!product) {
    return <p>No product found.</p>;
  }

  return (
    <div id="productPage">
      <div className="heading">
        <h1 className="productTitle">{product.title}</h1>
        <div className="stars">{renderStars(product.rating || 0)}</div>
      </div>
      <div className="grouping">
        <Link href={`/categories/${product.category}`} className="category">
          {product.category}
        </Link>
        <div className="tags">
          {product.tags?.map((tag, index) => (
            <Link key={index} href={`/tags/${tag}`} className="tag">
              {tag}
            </Link>
          ))}
        </div>
      </div>
      <div className="gridCont">
        <ImageSlider images={product.thumbnail ? [product.thumbnail] : []} />
        <div className="sideBar">
          <div className="sideBarHeading">
            <p className="brand">{product.brand}</p>
            <div className="pricing">
              <p className="price">{product.price}$</p>
              {product.discountPercentage && (
                <div className="discounting">
                  <p className="discount">{product.discountPercentage}% </p>
                  <p className="off">Off</p>
                </div>
              )}
            </div>
          </div>
          <div className="legalInfo">
            <p className="waranty">{product.warrantyInformation}</p>
            <p className="shipping">{product.shippingInformation}</p>
            <p className="return">{product.returnPolicy}</p>
          </div>
          <div className="stocks">
            <p className="stock">
              Amount in stock: <span>{product.stock}</span>
            </p>
            <p className="minOrder">
              Minimum order quantity:{' '}
              <span>{product.minimumOrderQuantity}</span>
            </p>
            <QuantitySelector
              stock={product.stock}
              minOrder={product.minimumOrderQuantity}
            />
          </div>
          <div className="buttons">
            <button className="addCartBtn">Add to cart</button>
            <button className="buyBtn">Buy now</button>
          </div>
        </div>
        <div className="textSection">
          <p className="desc">{product.description}</p>
          <div className="additionalInfo">
            <div className="dimensions">
              <h6>Dimensions:</h6>
              <p>Width: {product.width}</p>
              <p>Height: {product.height}</p>
              <p>Depth: {product.depth}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
