import "./App.css";
import Sidebar from "./sidebar/Sidebar";
import Player from "./player/Player";
import Playercard from "./molecules/playercard/Playercard";
import { MusicProvider } from "./context";
import { useState } from "react";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <MusicProvider>
        <div className="container">
          <div className={`sidenav ${isSidebarOpen ? "open" : ""}`}>
            <Sidebar />
          </div>
          <div className="mainarea">
            <div className="player">
              <Player />
            </div>
            <div className="sidemore">
              <Playercard />
            </div>
          </div>
          <div
            className={`overlay ${isSidebarOpen ? "active" : ""}`}
            onClick={toggleSidebar}
          ></div>
          <button
            className="menu-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>
      </MusicProvider>
    </div>
  );
}

export default App;
