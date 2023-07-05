import NavBar from "../navBar/NavBar";
import LeftBar from "../leftBar/LeftBar";
import { Outlet } from "react-router-dom";
import RightBar from "../rightBar/RightBar";

const Layout = () => {
    return (
        <div>
        <NavBar />
          <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
          </div>
        </div>
    )
}

export default Layout;