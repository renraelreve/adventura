import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import TopNav from "../components/TopNav";
import Card from "../components/Card";
import Footer from "../components/Footer"

import { AuthContextProvider } from "../store/auth-context";

function RootLayout() {
  return (
    <div className="container">
      <AuthContextProvider>
        <Header />
      <div className="content">
      <TopNav />
        </div>
          <main className="main">
          <Card>
          <span className="span"><Outlet /></span>
          </Card>
         </main>  
         </AuthContextProvider>
        <Footer />
    </div>
  );
}

export default RootLayout;
