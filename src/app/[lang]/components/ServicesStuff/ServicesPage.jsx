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
``;
export default async function ServicesPage({
  searchParams = {},
  dictionary,
  lang,
}) {
  const sortType = searchParams?.sort || '';
  const searchTerm = searchParams?.search || '';

  //filterin by title and description
  let filteredServices = searchTerm
    ? services.filter((service) => {
        const searchWords = searchTerm.toLowerCase().split(' ');
        const titleLower = service.title.toLowerCase();
        const descLower = service.desc.toLowerCase();

        return searchWords.every(
          (word) => titleLower.includes(word) || descLower.includes(word)
        );
      })
    : [...services];

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
