import './About.css';

interface AboutContent {
  title: string;
  desc: string;
}

interface Dictionary {
  about: AboutContent;
}

interface AboutProps {
  dictionary: Dictionary;
}

export default function About({ dictionary }: AboutProps) {
  return (
    <main id="about">
      <h1>{dictionary.about.title}</h1>
      <p>{dictionary.about.desc}</p>
    </main>
  );
}
