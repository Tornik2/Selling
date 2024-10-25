// app/components/ServicesStuff/ServicesPage.jsx
import ServiceItem from './ServiceItem/ServiceItem';
import services from '../../database/ServicesData';

const convertTierToNumber = (tier) => {
  const match = tier.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

const convertPriceToNumber = (price) => {
  if (price === 'TBD') return 0;
  const match = price.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

// Change the function signature to destructure searchParams with a default empty object
export default async function ServicesPage({ searchParams = {} }) {
  // Now safely access sort from searchParams
  const sortType = searchParams?.sort || '';
  let sortedServices = [...services];

  switch (sortType) {
    case 'price-high-to-low':
      sortedServices.sort(
        (a, b) => convertPriceToNumber(b.price) - convertPriceToNumber(a.price)
      );
      break;
    case 'price-low-to-high':
      sortedServices.sort(
        (a, b) => convertPriceToNumber(a.price) - convertPriceToNumber(b.price)
      );
      break;
    case 'tier-high-to-low':
      sortedServices.sort(
        (a, b) => convertTierToNumber(b.tier) - convertTierToNumber(a.tier)
      );
      break;
    case 'tier-low-to-high':
      sortedServices.sort(
        (a, b) => convertTierToNumber(a.tier) - convertTierToNumber(b.tier)
      );
      break;
    default:
      break;
  }

  return (
    <div className="services-list">
      {sortedServices.map((service) => (
        <ServiceItem
          key={service.id}
          img={service.img}
          avatar={service.avatar}
          category={service.category}
          subCategory={service.subCategory}
          title={service.title}
          desc={service.desc}
          tier={service.tier}
          price={service.price}
          name={service.name}
          id={`${service.title.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}-${
            service.id
          }`}
        />
      ))}
    </div>
  );
}
