'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Sorter({ dictionary }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // Get current sort from URL or default to 'Sort Options'
  const currentSort = searchParams.get('sort') || 'Sort Options';

  const sortOptions = {
    'price-high-to-low': dictionary.sorter.prhigh,
    'price-low-to-high': dictionary.sorter.prlow,
    'tier-high-to-low': dictionary.sorter.trhigh,
    'tier-low-to-high': dictionary.sorter.trlow,
  };

  const handleSortChange = (option) => {
    setIsOpen(false);
    const sortParam = option;

    const params = new URLSearchParams(searchParams);
    params.set('sort', sortParam);

    // Update URL with the sort parameter (no need to encode manually)
    router.push(`${window.location.pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="sorter">
      <button onClick={() => setIsOpen(!isOpen)} className="SortButton">
        {sortOptions[currentSort] || dictionary.sorter.options}
        {isOpen && (
          <div className="sortMenu">
            {Object.keys(sortOptions).map((option) => (
              <div
                key={option}
                className="sortOption"
                onClick={() => handleSortChange(option)}
              >
                {sortOptions[option]}
              </div>
            ))}
          </div>
        )}
      </button>
    </div>
  );
}
