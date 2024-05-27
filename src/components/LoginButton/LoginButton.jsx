import styles from "./login.module.css";

export const Button = ({ text, loading }) => {
  return (
    <button className={loading ? styles.buttonLoading : styles.button}>
      {loading ? "Loading..." : text}
    </button>
  );
};
