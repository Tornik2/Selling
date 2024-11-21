interface Dictionary {
  home: {
    title: string;
    desc: string;
    omw: string;
  };
  about: {
    title: string;
    desc: string;
  };
  footer: {
    aboutLink: string;
    contactLink: string;
    policies: string;
    rights: string;
  };
  header: {
    aboutLink: string;
    tasks: string;
    services: string;
    home: string;
    logout: string;
    products: string;
    profile: string;
  };
  sorter: {
    options: string;
    prhigh: string;
    prlow: string;
    trhigh: string;
    trlow: string;
  };
  servicesPage: {
    notFound: string;
  };
  serviceID: {
    contacts: string;
    msg: string;
  };
  services: {
    span: string;
    nospan: string;
  };
  products: {
    products: string;
    noProducts: string;
  };
  productsID: {
    stock: string;
    order: string;
    cart: string;
    buy: string;
    dimensions: string;
    width: string;
    height: string;
    depth: string;
  };
  language: {
    lang: string;
  };
  profile: {
    title: string;
    name: string;
    mail: string;
  };
}

// Enumerate supported locales
export type Locale = 'en' | 'ka';

// Define the dictionaries object
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ka: () => import('./dictionaries/ka.json').then((module) => module.default),
};

// Define the getDictionary function
export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};