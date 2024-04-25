import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import TopNav from "../components/TopNav";
import Card from "../components/Card";
import Footer from "../components/Footer";

import { AuthContextProvider } from "../store/AuthContext";
import { FavouritesContextProvider } from "../store/FavouritesContext";

function RootLayout() {
  return (
    <div className="container">
      <AuthContextProvider>
        <Header />
        <div className="content">
          <TopNav />
        </div>
        <FavouritesContextProvider>
          <main className="main">
            <Card>
              <span className="span">
                <Outlet />
              </span>
            </Card>
          </main>
        </FavouritesContextProvider>
      </AuthContextProvider>
      <Footer />
    </div>
  );
}

export default RootLayout;
