import styles from "./search.module.css";

export const SearchBar = ({ placeholder }) => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src="/search.svg" alt="search" />
      <input type="text" placeholder={placeholder} className={styles.input} />
    </div>
  );
};
