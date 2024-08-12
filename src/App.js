import "./App.css";
import Sidebar from "./sidebar/Sidebar";
import Player from "./player/Player";
import Playercard from "./molecules/playercard/Playercard";
import { MusicProvider } from "./context";

function App() {
  return (
    <div className="App">
      <MusicProvider>
      <div className="container">
        <div className="sidenav">
          <Sidebar/>
        </div>
        <div className="mainarea">
          <div className="player">
            <Player/>
          </div>
          <div className="sidemore">
            <Playercard/>
          </div>
        </div>
      </div>
      </MusicProvider>
    </div>
  );
}

export default App;
