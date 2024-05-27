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
import DialogBook from "../components/FullScreenDialog/DialogBook";
import ReviewDialog from "../components/ReviewDialog/ReviewDialog";
import { ReviewCard } from "../components/ReviewCard/ReviewCard";

export default function Book() {
  const navigate = useNavigate();
  const { Id } = useContext(ProjContext);
  const [book, setBook] = useState("");
  const [isLoading, setLoading] = useState(true);

  const addReview = (newReview) => {
    setBook((prevMovie) => ({
      ...prevMovie,
      reviews: [newReview, ...prevMovie.reviews],
    }));
  };

  async function deleteBook() {
    try {
      setLoading(true);
      const response = await axios.delete(`/book/${Id}`);
      if (response.status === 200) {
        navigate("/books");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadBook() {
      try {
        setLoading(true);
        if (!Id) {
          navigate("/books");
        }
        const response = await axios.get(`/book/${Id}`);
        if (response.status === 200) {
          setBook(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadBook();
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
                <img src={book.imgPath} alt="img" className="movie_img" />
                <div>
                  <h1>{book.title}</h1>
                  <p className="custom">
                    Author: <span>{book.author}</span>
                  </p>
                  <p className="custom">
                    Release: <span>{book.release}</span>
                  </p>
                  <p className="custom">
                    País: <span>{book.country}</span>
                  </p>
                  <p className="custom">
                    Páginas: <span>{book.pages}</span>
                  </p>
                  <p className="custom">
                    Editora: <span>{book.publisher}</span>
                  </p>
                  {sessionStorage.getItem("role") === "admin" ? (
                    <div className="button_container">
                      <Button
                        variant="contained"
                        endIcon={<DeleteIcon />}
                        style={{ backgroundColor: "#FC4747" }}
                        onClick={() => deleteBook()}
                      >
                        Delete
                      </Button>
                      <DialogBook selected={book} setChanges={setBook} />
                    </div>
                  ) : (
                    <ReviewDialog type="book" id={Id} updateView={addReview} />
                  )}
                </div>
              </div>
              {book &&
                book.reviews.map((review, index) => {
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
