import styles from './searchBar.module.css';

const SearchBar = ({ action = '/search' }) => {
  return (
    <form action={action} method="get" className={styles.searchBar}>
      <input
        type="text"
        name="searchTerm"
        className={styles.searchInput}
        placeholder="Search..."
        required
      />
      <button type="submit" className={styles.searchButton}>Search</button>
    </form>
  );
};

export default SearchBar;