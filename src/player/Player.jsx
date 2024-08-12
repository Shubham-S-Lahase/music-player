import st from "./Player.module.css";
import List from "../molecules/list/List";

const Player = () => {
  return (
    <div className={st.container}>
      <div className={st.topnav}>
        <div className={st.labs}>
          <h4>Music</h4>
          <h4>Podcast</h4>
          <h4>Live</h4>
          <h4>Radio</h4>
        </div>
        <div className={st.searchbar}>
          <input
            type="text"
            placeholder="Michael Jackson"
            className={st.searchinput}
          />
          <button className={st.searchbutton}>
            <img className={st.searchicon} src="/Search.svg" alt="" />
          </button>
        </div>
      </div>
      <div className={st.banner}>
        <img src="/Artist.png" alt="" />
      </div>
      <div className={st.songs}>
        <List/>
      </div>
    </div>
  );
};

export default Player;
