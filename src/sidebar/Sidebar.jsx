import st from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={st.container}>
      <div className={st.appName}>
        <img src="/Logo.svg" alt="App logo" />
        <h1>
          <span>Dream</span>Music
        </h1>
      </div>
      <div className={st.menu}>
        <h4>MENU</h4>
        <div className={st.menuItem}>
          <img src="/Home.svg" alt="" />
          <h3>Home</h3>
        </div>
        <div className={st.menuItem}>
          <img src="/Trends.svg" alt="" />
          <h3>Trends</h3>
        </div>
        <div className={st.menuItem}>
          <img src="Library.svg" alt="" />
          <h3>Library</h3>
        </div>
        <div className={st.menuItem}>
          <img src="/Discover.svg" alt="" />
          <h3>Discover</h3>
        </div>
      </div>
      <div className={st.menu} id={st.general}>
        <h4>GENERAL</h4>
        <div className={st.menuItem}>
          <img src="/Settings.svg" alt="" />
          <h3>Settings</h3>
        </div>
        <div className={st.menuItem}>
          <img src="/Logout.svg" alt="" />
          <h3>Log Out</h3>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
