import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../src/App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { ProjectProvider } from "./context/useContext";
import Movie from "./Pages/Movie";
import BookList from "./Pages/BookList";
import Book from "./Pages/Book";
import TvList from "./Pages/TvList";
import Show from "./Pages/Show";
import Movies from "./Pages/Movies";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";

function App() {
  return (
    <ProjectProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/book" element={<Book />} />
          <Route path="/shows" element={<TvList />} />
          <Route path="/show" element={<Show />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </ProjectProvider>
  );
}

export default App;
