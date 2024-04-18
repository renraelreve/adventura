import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import TopNav from "../components/TopNav";
import Card from "../components/Card";

function RootLayout() {
  return (
    <div className="container">
      <Header />
      <div className="content">
      <TopNav />
        </div>
        
          <main className="main">
          <Card>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}><Outlet /></span>
          </Card>
         </main>  
    </div>
  );
}

export default RootLayout;
