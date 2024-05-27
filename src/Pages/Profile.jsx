import "../App.css";
import { NavBar } from "../components/NavBar/NavBar";
import { NavMobile } from "../components/NavBar/NavMobile";

export default function Profile() {
  return (
    <>
      <NavBar />
      <main className="main">
        <NavMobile />
        <div className="main_container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Username Here</h2>
          </div>
        </div>
      </main>
    </>
  );
}
