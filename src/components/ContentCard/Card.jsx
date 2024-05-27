import styles from "./card.module.css";
import { ProjContext } from "../../context/useContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export const Card = ({ img, title, genre, date, type, id }) => {
  const navigate = useNavigate();
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const { setId } = useContext(ProjContext);

  function handleClick() {
    setId(id);
    if (type === "movie") navigate("/movie");
    else if (type === "book") navigate("/book");
    else navigate("/show");
  }
  return (
    <div className={styles.card} onClick={() => handleClick()}>
      <div className={styles.img_div}>
        <img className={styles.img} src={img} alt={title} />
      </div>

      <div className={styles.details}>
        <p>{year}</p>
        <div>•</div>
        <img
          src={
            type === "movie"
              ? "movie_detail_icon.svg"
              : type === "book"
              ? "card_bookmark.png"
              : "tv.png"
          }
        />
        <p>{type}</p>
        <div>•</div>
        <p>{genre}</p>
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};
