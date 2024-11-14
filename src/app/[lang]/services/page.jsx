import './Services.css';
import ServicesPage from '../components/ServicesStuff/ServicesPage';
import Sorter from '../components/ServicesStuff/sorter';
import SearchBar from '../components/ServicesStuff/searchBar';
import { getDictionary } from '../../../../get-dictionaries'; // Import the server-side function

export default async function Services({ searchParams, params }) {
  const dictionary = await getDictionary(params.lang); // Fetch the dictionary dynamically

  return (
    <main className="services-main">
      <h1 className="service-title">
        <span>{dictionary.services.span}</span> <br></br>
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
