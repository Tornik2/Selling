import { getDictionary } from '../../../get-dictionaries';
import { Locale } from '../../../get-dictionaries';

export default async function Home({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);

  return (
    <main className="home">
      <h1>
        <span>{dictionary.home.title}</span> <br />
        {dictionary.home.desc}
      </h1>
      <h2>{dictionary.home.omw}</h2>
    </main>
  );
}
