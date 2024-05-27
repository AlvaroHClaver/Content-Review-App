import "../App.css";
import { Card } from "../components/ContentCard/Card";
import { NavBar } from "../components/NavBar/NavBar";
import { NavMobile } from "../components/NavBar/NavMobile";
import { SearchBar } from "../components/SearchBar/SearchBar";
import axios from "../api/axiosConfig";
import { useState, useEffect, useContext } from "react";
import { Loader } from "../components/Loader/Loader";
import AddShowDialog from "../components/AddContentDialog/AddShowDialog";

export default function TvList() {
  const [tvShow, setShow] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShows() {
      try {
        setLoading(true);
        const response = await axios.get("/tvshow");
        if (response.status === 200) {
          setShow(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchShows();
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
            <h2>Tv Shows</h2>
            {sessionStorage.getItem("role") === "admin" ? (
              <AddShowDialog updateList={setShow} list={tvShow} />
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
              {tvShow &&
                tvShow.map((show, index) => {
                  return (
                    <Card
                      title={show.title}
                      img={show.imgPath}
                      date={show.release}
                      genre={show.season}
                      type="show"
                      key={index}
                      id={show.id}
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
