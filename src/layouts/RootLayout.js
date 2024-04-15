import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import TopNav from "../components/TopNav";
// import SideNav from "../components/SideNav";
import Card from "../components/Card";

function RootLayout() {
  return (
    <div className="container">
      <Header />
      <div className="content">
        <TopNav />
        <main className="main">
          <Card>
            <Outlet />
          </Card>
        </main>
      </div>
    </div>
  );
}

export default RootLayout;