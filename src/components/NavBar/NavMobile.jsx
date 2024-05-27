import styles from "./navMobile.module.css";
import { useNavigate } from "react-router-dom";

export const NavMobile = () => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    sessionStorage.setItem("path", path);
    navigate(path);
  };
  return (
    <nav className={styles.container}>
      <img src="/movie.svg" alt="movie" />
      <div className={styles.link_container}>
        <img
          src={
            sessionStorage.getItem("path") === "/home"
              ? "/shape.svg"
              : "/shape_off.svg"
          }
          alt="shape"
          onClick={() => handleClick("/home")}
        />
        <img
          src={
            sessionStorage.getItem("path") === "/movies"
              ? "/movie_on.png"
              : "/movie_off.svg"
          }
          alt="movie"
          onClick={() => handleClick("/movies")}
        />
        <img
          src={
            sessionStorage.getItem("path") === "/shows"
              ? "/tv_on.png"
              : "/tv_off.svg"
          }
          alt="tv"
          onClick={() => handleClick("/shows")}
        />
        <img
          src={
            sessionStorage.getItem("path") === "/books"
              ? "/book_on.png"
              : "/bookmark_off.svg"
          }
          alt="bookmark"
          onClick={() => handleClick("/books")}
        />
      </div>
      <img src="/avatar.svg" alt="avatar" className={styles.avatar} />
    </nav>
  );
};
