import './About.css';
export default function About({ dictionary }) {
  return (
    <main id="about">
      <h1>{dictionary.about.title}</h1>
      <p>{dictionary.about.desc}</p>
    </main>
  );
}
