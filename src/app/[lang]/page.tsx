import { getDictionary } from '../../../get-dictionaries';

interface HomeProps {
  params: {
    lang: string;
  };
}

export default async function Home({ params: { lang } }: HomeProps) {
  const dictionary = await getDictionary(lang);

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
