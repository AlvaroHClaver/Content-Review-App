import "../App.css";
import { NavBar } from "../components/NavBar/NavBar";
import { NavMobile } from "../components/NavBar/NavMobile";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProjContext } from "../context/useContext";
import { useState, useEffect, useContext } from "react";
import axios from "../api/axiosConfig";
import { Loader } from "../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import FullScreenDialog from "../components/FullScreenDialog/FullScreenDialog";
import ReviewDialog from "../components/ReviewDialog/ReviewDialog";
import { ReviewCard } from "../components/ReviewCard/ReviewCard";
import SnackBar from "../components/SnackBar/SnackBar";

export default function Movie() {
  const navigate = useNavigate();
  const { Id } = useContext(ProjContext);
  const [movie, setMovie] = useState("");
  const [isLoading, setLoading] = useState(true);

  const addReview = (newReview) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      reviews: [newReview, ...prevMovie.reviews],
    }));
  };

  async function deleteMovie() {
    try {
      setLoading(true);
      const response = await axios.delete(`/movie/${Id}`);
      if (response.status === 200) {
        navigate("/movie");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadMovie() {
      try {
        setLoading(true);
        if (!Id) {
          navigate("/movies");
        }
        const response = await axios.get(`/movie/${Id}`);
        if (response.status === 200) {
          setMovie(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadMovie();
  }, [Id]);
  return (
    <>
      <SnackBar />
      <NavBar />
      <main className="main">
        <NavMobile />
        <div className="contentContainer">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="contentDetailsContainer">
              <div className="contentDetails">
                <img src={movie.imgPath} alt="img" className="movie_img" />
                <div>
                  <h1>{movie.title}</h1>
                  <p className="custom">
                    Diretor: <span>{movie.director}</span>
                  </p>
                  <p className="custom">
                    Release: <span>{movie.release}</span>
                  </p>
                  <p className="custom">
                    País: <span>{movie.country}</span>
                  </p>
                  <p className="custom">
                    Gênero: <span>{movie.genre}</span>
                  </p>
                  <p className="custom">
                    Elenco: <span>{movie.cast}</span>
                  </p>
                  {sessionStorage.getItem("role") === "admin" ? (
                    <div className="button_container">
                      <Button
                        variant="contained"
                        endIcon={<DeleteIcon />}
                        style={{ backgroundColor: "#FC4747" }}
                        onClick={() => deleteMovie()}
                      >
                        Delete
                      </Button>
                      <FullScreenDialog
                        selectedMovie={movie}
                        setNewMovie={setMovie}
                      />
                    </div>
                  ) : (
                    <ReviewDialog type="movie" id={Id} updateView={addReview} />
                  )}
                </div>
              </div>
              {movie &&
                movie.reviews.map((review, index) => {
                  return (
                    <ReviewCard
                      username={review.user.username}
                      score={review.score}
                      city={review.user.city}
                      comment={review.comment}
                      key={index}
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
