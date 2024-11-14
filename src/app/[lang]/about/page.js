import { getDictionary } from '../../../../get-dictionaries'; // Import the server-side function

import About from '../components/About/About';

export default async function AboutPage({ params }) {
  const dictionary = await getDictionary(params.lang); // Fetch the dictionary dynamically

  return <About dictionary={dictionary} />; // Pass dictionary to the About component
}
