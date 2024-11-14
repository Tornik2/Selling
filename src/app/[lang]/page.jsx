import { getDictionary } from '../../../get-dictionaries';

export default async function Home({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  return (
    <main className="home">
      <h1>
        <span>{dictionary.home.title}</span> <br></br>
        {dictionary.home.desc}
      </h1>
      <h2>{dictionary.home.omw}</h2>
    </main>
  );
}
