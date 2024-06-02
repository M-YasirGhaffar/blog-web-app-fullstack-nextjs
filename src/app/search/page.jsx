"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'

const SearchPage = () => {
    const searchParams = useSearchParams()
    const [searchResults, setSearchResults] = useState(null);
    const searchTerm = searchParams.get('searchTerm');

    useEffect(() => {
        if (searchTerm) {
          fetch(`/api/search?searchTerm=${encodeURIComponent(searchTerm)}`)
            .then(response => response.json())
            .then(data => setSearchResults(data));
        }
      }, [searchTerm]);

      return (
        <div>
          <h1>Search Results</h1>
          <p>You searched for: {searchTerm}</p>
          {searchResults && (
            <div>
              <h2>Results:</h2>
              <pre>{JSON.stringify(searchResults, null, 2)}</pre>
            </div>
          )}
        </div>
      );
    };

export default SearchPage;