import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, Link } from "react-router-dom";
import { Store } from "react-notifications-component";

function App() {
  window.addEventListener("offline", function (e) {
    Store.addNotification({
      title: "You are offline",
      message: "Some functionality may not work properly",
      type: "danger",
      insert: "top",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
    });
  });
  return (
    <div className="App container-fluid p-0">
      <header className="App-header">
        <Link to="/search-books-pwa/">
          <p>
            <span style={{ color: "#0085f8" }}>G</span>
            <span style={{ color: "#ff4131" }}>o</span>
            <span style={{ color: "#febd00" }}>o</span>
            <span style={{ color: "#0086f8" }}>g</span>
            <span style={{ color: "#00aa4a" }}>l</span>
            <span style={{ color: "#ff4131" }}>e</span>
            <span> </span>
            <span style={{ color: "#fff" }}>Search Books </span>
          </p>
        </Link>
        <Link to="/search-books-pwa/favs" id="favs-link">
          <button className="btn btn-primary">Favourites</button>
        </Link>
      </header>
      <div className="app-body">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
