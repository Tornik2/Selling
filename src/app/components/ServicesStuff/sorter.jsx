'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Sorter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // Get current sort from URL or default to 'Sort Options'
  const currentSort = searchParams.get('sort') || 'Sort Options';

  const options = [
    'Price High to Low',
    'Price Low to High',
    'Tier High to Low',
    'Tier Low to High',
  ];

  const handleSortChange = (option) => {
    setIsOpen(false);

    // Convert option to URL-friendly format
    const sortParam = option.toLowerCase().replace(/ /g, '-');

    // Update URL with new sort parameter
    const params = new URLSearchParams(searchParams);
    params.set('sort', sortParam);

    // scroll option might change in future, when pagination is added
    router.push(`/services?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="sorter">
      <button onClick={() => setIsOpen(!isOpen)} className="SortButton">
        {options.find(
          (opt) => opt.toLowerCase().replace(/ /g, '-') === currentSort
        ) || 'Sort Options'}
        {isOpen && (
          <div className="sortMenu">
            {options.map((option) => (
              <div
                key={option}
                className="sortOption"
                onClick={() => handleSortChange(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </button>
    </div>
  );
}
