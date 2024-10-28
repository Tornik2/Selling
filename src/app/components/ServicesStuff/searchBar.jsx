'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar() {
  return (
    <form id="searchForm" action="">
      <input
        id="searchBar"
        type="text"
        placeholder="Search services"
        autoComplete="off"
      />
      <FontAwesomeIcon icon={faSearch} id="searchIcon" />
    </form>
  );
}
