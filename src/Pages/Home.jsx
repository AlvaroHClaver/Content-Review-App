import "../App.css";
import { Card } from "../components/ContentCard/Card";
import { NavBar } from "../components/NavBar/NavBar";
import { NavMobile } from "../components/NavBar/NavMobile";
import { SearchBar } from "../components/SearchBar/SearchBar";

export default function Home() {
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
            <h2>Recommended</h2>
          </div>
        </div>
      </main>
    </>
  );
}
