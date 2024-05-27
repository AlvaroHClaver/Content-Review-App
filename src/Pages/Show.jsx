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
import ShowDialog from "../components/FullScreenDialog/ShowDialog";
import ReviewDialog from "../components/ReviewDialog/ReviewDialog";
import { ReviewCard } from "../components/ReviewCard/ReviewCard";

export default function Show() {
  const navigate = useNavigate();
  const { Id } = useContext(ProjContext);
  const [show, setShow] = useState("");
  const [isLoading, setLoading] = useState(true);

  const addReview = (newReview) => {
    setShow((prevMovie) => ({
      ...prevMovie,
      reviews: [newReview, ...prevMovie.reviews],
    }));
  };

  async function deleteShow() {
    try {
      setLoading(true);
      const response = await axios.delete(`/tvshow/${Id}`);
      if (response.status === 200) {
        navigate("/shows");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadShow() {
      try {
        setLoading(true);
        if (!Id) {
          navigate("/shows");
        }
        const response = await axios.get(`/tvshow/${Id}`);
        if (response.status === 200) {
          setShow(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadShow();
  }, [Id]);
  return (
    <>
      <NavBar />
      <main className="main">
        <NavMobile />
        <div className="contentContainer">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="contentDetailsContainer">
              <div className="contentDetails">
                <img src={show.imgPath} alt="img" className="movie_img" />
                <div>
                  <h1>{show.title}</h1>
                  <p className="custom">
                    Director: <span>{show.director}</span>
                  </p>
                  <p className="custom">
                    Release: <span>{show.release}</span>
                  </p>
                  <p className="custom">
                    País: <span>{show.country}</span>
                  </p>
                  <p className="custom">
                    Temporadas: <span>{show.season}</span>
                  </p>
                  <p className="custom">
                    Elenco: <span>{show.cast}</span>
                  </p>
                  {sessionStorage.getItem("role") === "admin" ? (
                    <div className="button_container">
                      <Button
                        variant="contained"
                        endIcon={<DeleteIcon />}
                        style={{ backgroundColor: "#FC4747" }}
                        onClick={() => deleteShow()}
                      >
                        Delete
                      </Button>
                      <ShowDialog selected={show} setNew={setShow} />
                    </div>
                  ) : (
                    <ReviewDialog
                      id={Id}
                      type="tvshow"
                      updateView={addReview}
                    />
                  )}
                </div>
              </div>
              {show &&
                show.reviews.map((review, index) => {
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
