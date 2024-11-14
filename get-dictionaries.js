import 'server-only';

// We enumerate all dictionaries here for better linting and support
// We also get the default import for cleaner handling
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ka: () => import('./dictionaries/ka.json').then((module) => module.default),
};

export const getDictionary = async (locale) =>
  dictionaries[locale]?.() ?? dictionaries.en();
