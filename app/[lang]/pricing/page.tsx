'use client';
import { useState, useEffect } from 'react';
import { getDictionary, Locale } from '../../../get-dictionaries';
import { getStripe } from '../../../lib/stripe-client';
import './styles.css';

// Original interfaces
export interface SubTierFrequency {
  id: string;
  value: string;
  label: string;
  priceSuffix: string;
}

export interface SubTier {
  name: string;
  id: string;
  href: string;
  price: string | Record<string, string>;
  description: string | React.ReactNode;
  features: string[];
  featured?: boolean;
  highlighted?: boolean;
  cta: string;
  soldOut?: boolean;
}

// New interface for Stripe price IDs
interface PriceIds {
  [key: string]: {
    monthly: string;
    annual: string;
  };
}

// Define your Stripe price IDs
const PRICE_IDS: PriceIds = {
  middle: {
    monthly: 'price_1QYlwxKYelKYEeeeHGgP2by3', // Replace with your Stripe price ID for monthly plan
    annual: 'price_1QYlz1KYelKYEeeeHmGfAvdL', // Replace with your Stripe price ID for annual plan
  },
  senior: {
    monthly: 'price_1QYm0EKYelKYEeeebEwxK4yQ', // Replace with your Stripe price ID for monthly plan
    annual: 'price_1QYm0VKYelKYEeeeJdB6mQGY', // Replace with your Stripe price ID for annual plan
  },
};

const getFrequencies = (dictionary: any): SubTierFrequency[] => [
  {
    id: '1',
    value: '1',
    label: dictionary.sub.frequencies.monthly,
    priceSuffix: '/month',
  },
  {
    id: '2',
    value: '2',
    label: dictionary.sub.frequencies.annually,
    priceSuffix: '/year',
  },
];

const getTiers = (dictionary: any): SubTier[] => [
  {
    name: dictionary.sub.tiers.junior.name,
    id: '0',
    href: '/',
    price: { '1': '$0', '2': '$0' },
    description: dictionary.sub.tiers.junior.description,
    features: dictionary.sub.tiers.junior.features,
    featured: false,
    highlighted: false,
    soldOut: false,
    cta: dictionary.sub.tiers.junior.cta,
  },
  {
    name: dictionary.sub.tiers.middle.name,
    id: '1',
    href: '/subscribe',
    price: { '1': '$4.99', '2': '$49.99' },
    description: dictionary.sub.tiers.middle.description,
    features: dictionary.sub.tiers.middle.features,
    featured: true,
    highlighted: false,
    soldOut: false,
    cta: dictionary.sub.tiers.middle.cta,
  },
  {
    name: dictionary.sub.tiers.senior.name,
    id: '2',
    href: '/subscribe',
    price: { '1': '$14.99', '2': '$139.99' },
    description: dictionary.sub.tiers.senior.description,
    features: dictionary.sub.tiers.senior.features,
    featured: false,
    highlighted: false,
    soldOut: false,
    cta: dictionary.sub.tiers.senior.cta,
  },
];

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('w-6 h-6', className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const cn = (...args: Array<string | boolean | undefined | null>) =>
  args.filter(Boolean).join(' ');

function SubscriptionContent({ dictionary }: { dictionary: any }) {
  const [frequency, setFrequency] = useState<SubTierFrequency>(
    getFrequencies(dictionary)[0]
  );
  const [loading, setLoading] = useState<string | null>(null);
  const tiers = getTiers(dictionary);

  const handleSubscription = async (tier: SubTier) => {
    try {
      setLoading(tier.id);

      // Skip for free tier
      if (tier.id === '0') {
        // Handle free tier signup
        return;
      }

      console.log('Starting subscription for tier:', tier.name); // Add logging

      const priceId =
        PRICE_IDS[tier.name.toLowerCase()][
          frequency.value === '1' ? 'monthly' : 'annual'
        ];

      console.log('Using price ID:', priceId); // Add logging

      const response = await fetch('api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          frequency: frequency.value,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${JSON.stringify(
            errorData
          )}`
        );
      }

      const { sessionId } = await response.json();
      const stripe = await getStripe();

      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Detailed subscription error:', error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="sub-main">
      <div className="titles">
        <h1>{dictionary.sub.title}</h1>
        <p>{dictionary.sub.subtitle}</p>
      </div>

      <div className="toggle">
        <div
          role="radiogroup"
          className="radiogroup"
          style={{ gridTemplateColumns: `repeat(2, minmax(0, 1fr))` }}
        >
          <p className="sr-only">Payment frequency</p>
          {getFrequencies(dictionary).map((option) => (
            <label
              className={cn(
                frequency.value === option.value
                  ? 'bg-purple-700 text-white dark:bg-purple-700 dark:text-white'
                  : 'bg-white text-black hover:bg-stone-500/10',
                'cursor-pointer rounded-full px-2.5 py-2 transition-all'
              )}
              key={option.value}
              htmlFor={option.value}
            >
              {option.label}
              <button
                value={option.value}
                id={option.value}
                className="hidden"
                role="radio"
                aria-checked={frequency.value === option.value}
                onClick={() => setFrequency(option)}
              >
                {option.label}
              </button>
            </label>
          ))}
        </div>
      </div>

      <div className="sub-cont">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={cn('sub-type', tier.featured ? 'featured' : '')}
          >
            <h3>{tier.name}</h3>
            <p className="desc">{tier.description}</p>
            <p>
              <span className="price">
                {typeof tier.price === 'string'
                  ? tier.price
                  : tier.price[frequency.value]}
              </span>
              {typeof tier.price !== 'string' && (
                <span className="suffix">{frequency.priceSuffix}</span>
              )}
            </p>
            <button
              onClick={() => handleSubscription(tier)}
              disabled={tier.soldOut || loading === tier.id}
              className="btn"
            >
              {loading === tier.id
                ? 'Loading...'
                : tier.soldOut
                ? 'Sold out'
                : tier.cta}
            </button>

            <ul>
              {tier.features.map((feature) => (
                <li key={feature}>
                  <CheckIcon className="checkIcon" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function SubPage({ params }: { params: { lang: Locale } }) {
  const [dictionary, setDictionary] = useState<any>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const dict = await getDictionary(params.lang);
      setDictionary(dict);
    };

    fetchDictionary();
  }, [params.lang]);

  if (!dictionary) return <div>Loading...</div>;

  return <SubscriptionContent dictionary={dictionary} />;
}
