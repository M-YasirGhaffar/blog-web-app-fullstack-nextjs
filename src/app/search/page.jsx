"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@/components/card/Card";
import styles from "./searchPage.module.css";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState(null);
  const searchTerm = searchParams.get("searchTerm");

  useEffect(() => {
    if (searchTerm) {
      fetch(`/api/search?searchTerm=${encodeURIComponent(searchTerm)}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data.posts));
    }
  }, [searchTerm]);

  return (
    <div>
      {searchResults && (
        <div>
          <h1 className={styles.searchTitle}>Search Results</h1>
          <p className={styles.searchTerm}><i>{searchTerm}</i></p>
          {searchResults.map((result) => (
            <Card item={result} key={result._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
