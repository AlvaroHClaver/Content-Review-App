import "../App.css";
import { Card } from "../components/ContentCard/Card";
import { NavBar } from "../components/NavBar/NavBar";
import { NavMobile } from "../components/NavBar/NavMobile";
import { SearchBar } from "../components/SearchBar/SearchBar";
import axios from "../api/axiosConfig";
import { useState, useEffect, useContext } from "react";
import { Loader } from "../components/Loader/Loader";
import AddMovieDialog from "../components/AddContentDialog/AddMovieDialog";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const response = await axios.get("/movie");
        if (response.status === 200) {
          setMovies(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <NavBar />
      <main className="main">
        <NavMobile />
        <div className="main_container">
          <SearchBar placeholder="Search..." />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Movies</h2>
            {sessionStorage.getItem("role") === "admin" ? (
              <AddMovieDialog updateMovieList={setMovies} movies={movies} />
            ) : (
              ""
            )}
          </div>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {" "}
              <Loader />
            </div>
          ) : (
            <div className="cards_list">
              {movies &&
                movies.map((movie, index) => {
                  return (
                    <Card
                      title={movie.title}
                      img={movie.imgPath}
                      date={movie.release}
                      genre={movie.genre}
                      type="movie"
                      key={index}
                      id={movie.id}
                    />
                  );
                })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
