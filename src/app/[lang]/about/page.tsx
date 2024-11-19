import { getDictionary } from '../../../../get-dictionaries'; // Import the server-side function
import About from '../components/About/About';

interface AboutPageProps {
  params: {
    lang: string,
  };
}

interface Dictionary {
  home: {
    title: string,
    desc: string,
    omw: string,
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  // Fetch the dictionary dynamically
  const dictionary: Dictionary = await getDictionary(params.lang);

  return <About dictionary={dictionary} />; // Pass dictionary to the About component
}
