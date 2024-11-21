import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getItemById } from '../../utils/supabaseUtils';
import './ServicePage.css';
import { getDictionary } from '../../../../../get-dictionaries'; // Import the server-side function

interface ParamsType {
  params: {
    lang: string;
    id: string;
  };
}

type Locale = 'en' | 'ka';

export default async function ServicePage({ params }: ParamsType) {
  const dictionary = await getDictionary(params.lang as Locale); // Fetch the dictionary dynamically
  const numericId = params.id.split('-').pop();
  if (!numericId) {
    // Handle the case when numericId is undefined or null
    notFound();
  }
  const service = await getItemById(
    `Services_${params.lang}` as 'Services' | 'posts' | 'products',
    numericId
  );

  if (!service) {
    notFound();
  }

  // Find the service that matches the id from the URL

  return (
    <div className="product-page">
      <div className="cont">
        <div className="profile-info">
          {service.avatar && (
            <Image
              src={service.avatar}
              alt="avatar"
              width={100}
              height={100}
              className="rounded-full mr-4 object-cover"
            />
          )}{' '}
          <div className="profile-text-info">
            <h4>{service.name}</h4>
            <p>{service.tier}</p>
          </div>
        </div>
        <h1>{service.title}</h1>
        <p className="price">{service.price} </p>
      </div>
      <p className="desc">{service.desc}</p>
      <div className="contacts">
        <h6>{dictionary.serviceID.contacts}</h6>
        <p className="number">{service.number}</p>
        <button>{dictionary.serviceID.msg}</button>
      </div>
    </div>
  );
}
