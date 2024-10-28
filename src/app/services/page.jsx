import './Services.css';
import ServicesPage from '../components/ServicesStuff/ServicesPage';
import Sorter from '../components/ServicesStuff/sorter';
import SearchBar from '../components/ServicesStuff/searchBar';

export default function Services({ searchParams }) {
  return (
    <main className="services-main">
      <h1 className="service-title">
        <span>ServIt Up:</span> <br></br> Let Skills Meet Opportunities!
      </h1>
      <section id="filtering">
        <SearchBar />
        <Sorter />
      </section>
      <ServicesPage searchParams={searchParams} />
    </main>
  );
}
