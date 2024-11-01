'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // have to use call back function for performace, so debounce timers and routing work correctly
  //and after ecah search bar rerender new debounce function isnt created
  const updateSearchQuery = useDebouncedCallback((typedStuff) => {
    const params = new URLSearchParams(searchParams);
    if (typedStuff) {
      params.set('search', typedStuff);
    } else {
      params.delete('search');
    }
    router.push(`/services?${params.toString()}`, {
      scroll: false,
    });
  }, 300);

  return (
    <form id="searchForm" action="" onSubmit={(e) => e.preventDefault()}>
      <input
        id="searchBar"
        type="text"
        placeholder="Search services"
        autoComplete="off"
        defaultValue={searchParams.get('search') || ''}
        onChange={(e) => updateSearchQuery(e.target.value)}
      />
      <FontAwesomeIcon icon={faSearch} id="searchIcon" />
    </form>
  );
}
