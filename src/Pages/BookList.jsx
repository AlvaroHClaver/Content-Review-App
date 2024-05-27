import "../App.css";
import { Card } from "../components/ContentCard/Card";
import { NavBar } from "../components/NavBar/NavBar";
import { NavMobile } from "../components/NavBar/NavMobile";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { Loader } from "../components/Loader/Loader";
import axios from "../api/axiosConfig";
import AddBookDialog from "../components/AddContentDialog/AddBookDialog";

export default function BookList() {
  const [isLoading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get("/book");
        if (response.status === 200) {
          setBooks(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
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
            <h2>Books</h2>
            {sessionStorage.getItem("role") === "admin" ? (
              <AddBookDialog updateBookList={setBooks} books={books} />
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
              {books &&
                books.map((book, index) => {
                  return (
                    <Card
                      title={book.title}
                      img={book.imgPath}
                      date={book.release}
                      genre={book.pages}
                      type="book"
                      key={index}
                      id={book.id}
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
