
import { useState, useContext } from "react";

import { AuthContext } from "../store/AuthContext";
import { FavouritesContext } from "../store/FavouritesContext";
import FavouriteTable from "../components/FavouriteTable";
import LocaliseFavourites from "../components/LocaliseFavourites";
import Error from "../components/Error";

function Favourites() {
  const { isLoggedIn } = useContext(AuthContext);
  const favouritesctx = useContext(FavouritesContext);
  const [error, setError] = useState(null);

  if (error) return <Error message={error} />;

  return (
    // prevent directory traversal through conditional rendering
    isLoggedIn && 
    <><div>
      <h1>Favourites</h1>
       <LocaliseFavourites />
       <FavouriteTable favourites={favouritesctx.favourites} />
    </div>
    </>
  );
}

export default Favourites;
