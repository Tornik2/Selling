import ServiceItem from './ServiceItem/ServiceItem';
import { getAllItems } from '../../utils/supabaseUtils';

type Service = {
  id: number;
  img: string;
  avatar: string;
  category: string;
  subCategory: string;
  title: string;
  desc: string;
  tier: string;
  price: string;
  name: string;
};

type Dictionary = {
  servicesPage: {
    notFound: string;
  };
};

type ServicesPageProps = {
  searchParams?: {
    sort?:
      | 'price-high-to-low'
      | 'price-low-to-high'
      | 'tier-high-to-low'
      | 'tier-low-to-high';
    search?: string;
  };
  dictionary: Dictionary;
  lang: string;
};

const convertTierToNumber = (tier: string): number => {
  const match = tier.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

const convertPriceToNumber = (price: string): number => {
  if (price === 'TBD') return 0;
  const match = price.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

export default async function ServicesPage({
  searchParams = {},
  dictionary,
  lang,
}: ServicesPageProps) {
  // Ensure the return type is of type `Service[]`
  const services: Service[] = (await getAllItems('Services')) as Service[];

  const sortType = searchParams?.sort || '';
  const searchTerm = searchParams?.search || '';

  // Filtering by title and description
  let filteredServices: Service[] = searchTerm
    ? services.filter((service) => {
        const searchWords = searchTerm.toLowerCase().split(' ');
        const titleLower = service.title.toLowerCase();
        const descLower = service.desc.toLowerCase();

        return searchWords.every(
          (word) => titleLower.includes(word) || descLower.includes(word)
        );
      })
    : [...services];

  // Sorting logic
  switch (sortType) {
    case 'price-high-to-low':
      filteredServices.sort(
        (a, b) => convertPriceToNumber(b.price) - convertPriceToNumber(a.price)
      );
      break;
    case 'price-low-to-high':
      filteredServices.sort(
        (a, b) => convertPriceToNumber(a.price) - convertPriceToNumber(b.price)
      );
      break;
    case 'tier-high-to-low':
      filteredServices.sort(
        (a, b) => convertTierToNumber(b.tier) - convertTierToNumber(a.tier)
      );
      break;
    case 'tier-low-to-high':
      filteredServices.sort(
        (a, b) => convertTierToNumber(a.tier) - convertTierToNumber(b.tier)
      );
      break;
    default:
      break;
  }

  return (
    <div className="services-list">
      {filteredServices.length === 0 ? (
        <div className="no-results">{dictionary.servicesPage.notFound}</div>
      ) : (
        filteredServices.map((service) => (
          <ServiceItem
            key={service.id}
            lang={lang}
            img={service.img}
            avatar={service.avatar}
            category={service.category}
            subCategory={service.subCategory}
            title={service.title}
            desc={service.desc}
            tier={service.tier}
            price={service.price}
            name={service.name}
            id={`${service.title
              .replace(/[^a-zA-Z0-9]+/g, '-')
              .toLowerCase()}-${service.id}`}
          />
        ))
      )}
    </div>
  );
}
