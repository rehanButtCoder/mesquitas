import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="Dashboard">
      <div class="sidenav">
        <div className="sidebar-container">
          <div className="sidebar-img">
            <img src="/assets/images/Mesquitas -logo.png" alt="" />
          </div>
          <div className="sidebar-icons">
            <NavLink to="/" className="sidebarIconss">
              <img
                src="/assets/images/dashbo.svg"
                className="sidebarIcon"
                alt=""
              />
              <span className="ctnnn">Dashboard</span>
            </NavLink>
            <NavLink to="/mosques" className="sidebarIconss">
              <img
                className="sidebarIcon"
                src="/assets/images/Mesquitas Dashboard- Mosque-v1.svg"
                alt=""
              />
              <span className="ctnnn">Mosque</span>
            </NavLink>
            <NavLink to="/duas" className="sidebarIconss">
              <img
                className="sidebarIcon"
                src="/assets/images/Mesquitas Dashboard- Duas-v1.svg"
                alt=""
              />
              <span className="ctnnn">Duas</span>
            </NavLink>
            <NavLink to="/events" className="sidebarIconss">
              <img
                className="sidebarIcon"
                src="/assets/images/envt.png"
                alt=""
              />
              <span className="ctnnn">Events</span>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="side_dashboard_container">
        <div style={{ height: "95px" }} className="main_nav">
          <div></div>
          <div className="right_nav">
          <div style={{opacity:"0",visibility:"hidden"}}>
              <img src="/assets/images/dashbord/Group 20280.png" alt="" />
            </div>
            <div style={{opacity:"0",visibility:"hidden"}}>
              {" "}
              <a className="main_btn" href="#" style={{ marginLeft: "-20px" }}>
                Admin
              </a>
            </div>
            <div>
              {" "}
              <img
                className="profile"
                src="/assets/images/dashbord/Profile.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
