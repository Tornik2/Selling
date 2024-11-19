import { getDictionary } from '../../../../get-dictionaries';
import About from '../components/About/About';

interface AboutContent {
  title: string;
  desc: string;
}

interface Dictionary {
  about: AboutContent;
}

export default async function AboutPage({
  params,
}: {
  params: { lang: string };
}) {
  const dictionary: Dictionary = await getDictionary(params.lang);

  return <About dictionary={dictionary} />;
}
