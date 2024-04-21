
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../store/auth-context";

import { favouritesApi } from "../api/favouritesApi";

import FavouriteTable from "../components/FavouriteTable";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Favourites() {
  const { isLoggedIn } = useContext(AuthContext);
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadFavourites();
  }, []);

  const loadFavourites = async () => {
    try {
      setIsLoading(true);
      const response = await favouritesApi.get("/favourites");
      setFavourites(response.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    // prevent directory traversal through conditional rendering
    isLoggedIn && 
    <><div>
      <h1>Favourites</h1>
      {/* <div style={{ marginBottom: 20 }}>
        <button onClick={() => navigate("/add-favourite")}>
          Add a favourite attraction
        </button>
      </div> */}
       <FavouriteTable favourites={favourites} />
    </div>
    </>
  );
}

export default Favourites;
