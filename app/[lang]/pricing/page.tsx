import { getDictionary, Locale } from '../../../get-dictionaries';
import SubscriptionContent from '../components/SubscriptionContent/SubscriptionContent';
import './styles.css';

export default async function SubPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang as 'en');

  return <SubscriptionContent dictionary={dictionary} />;
}
