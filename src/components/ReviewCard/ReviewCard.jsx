import styles from "./review.module.css";
import { ProjContext } from "../../context/useContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export const ReviewCard = ({ username, score, comment, city }) => {
  return (
    <div className={styles.card}>
      <div className={styles.details}>
        <div className={styles.container}>
          <div className={styles.rateContainer}>
            <div>{score}</div>
            <div>⭐️</div>
          </div>
          <p>
            Comment: <span className={styles.label}>{comment}</span>
          </p>
        </div>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          <img src="/avatar.svg" alt="avatar" />
          <div>
            <div>{username}</div>
            <div className={styles.country}>{city}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
