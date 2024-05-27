import styles from "./date.module.css";
export const DateInput = ({ input, error }) => {
  return (
    <div className={styles.date_container}>
      <label htmlFor="date">Birth Date</label>
      <input
        type="date"
        name="date"
        id="date"
        className={styles.date}
        {...input}
      />
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
};
