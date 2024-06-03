"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@/components/card/Card";
import styles from "./searchPage.module.css";
import Head from 'next/head';

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
    <>
      <head>
        <title>{`${searchTerm} - My Next Blog`}</title>
        <meta name="description" content={`Search results for ${searchTerm} on our website.`} />
        <meta property="og:title" content={`Search Results for ${searchTerm} - Your Website Name`} />
        <meta property="og:description" content={`Search results for ${searchTerm} on our website.`} />
        <meta property="og:url" content={`https://yourwebsite.com/search?searchTerm=${encodeURIComponent(searchTerm)}`} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://yourwebsite.com/search?searchTerm=${encodeURIComponent(searchTerm)}`} />
      </head>
      <div>
        <h1 className={styles.searchTitle}>Search Results</h1>
        <p className={styles.searchTerm}>
          <i>{searchTerm}</i>
        </p>
        {searchResults && (
          <div>
            {searchResults.map((result) => (
              <Card item={result} key={result._id} />
            ))}
          </div>
        )}

        {searchResults == 0 && <p>No results found!</p>}
        
      </div>
    </>
  );
};

export default SearchPage;
