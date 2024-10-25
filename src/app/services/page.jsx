import './Services.css';
import ServicesPage from '../components/ServicesStuff/ServicesPage';
import Sorter from '../components/ServicesStuff/sorter';

export default function Services({ searchParams }) {
  return (
    <main className="services-main">
      <h1 className="service-title">
        <span>ServIt Up:</span> <br></br> Let Skills Meet Opportunities!
      </h1>
      <Sorter />
      <ServicesPage searchParams={searchParams} />
    </main>
  );
}
