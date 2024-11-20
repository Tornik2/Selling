import './Services.css';
import ServicesPage from '../components/ServicesStuff/ServicesPage';
import Sorter from '../components/ServicesStuff/sorter';
import SearchBar from '../components/ServicesStuff/searchBar';
import { getDictionary } from '../../../../get-dictionaries';

interface ServicesProps {
  params: {
    lang: string; // The language parameter passed to the component
  };
  searchParams: {
    sort?: string; // Optional sort parameter
    search?: string; // Optional search parameter
  };
}
type Locale = 'en' | 'ka';

// The main Services component
export default async function Services({
  searchParams,
  params,
}: ServicesProps) {
  const dictionary = await getDictionary(params.lang as Locale);

  return (
    <main className="services-main">
      <h1 className="service-title">
        <span>{dictionary.services.span}</span> <br />
        {dictionary.services.nospan}
      </h1>
      <section id="filtering">
        <SearchBar />
        <Sorter dictionary={dictionary} />
      </section>
      <ServicesPage
        dictionary={dictionary}
        searchParams={searchParams}
        lang={params.lang}
      />
    </main>
  );
}
