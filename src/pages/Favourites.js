import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { simpleCrmApi } from "../api/simpleCrmApi";

import FavouriteTable from "../components/FavouriteTable";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Favourites() {
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
      const response = await simpleCrmApi.get("/favourites");
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
    <div>
      <h1>Favourites</h1>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => navigate("/add-favourite")}>
          Add a favourite attraction
        </button>
      </div>
      <FavouriteTable favourites={favourites} />
    </div>
  );
}

export default Favourites;
