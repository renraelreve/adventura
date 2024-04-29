import { createContext, useState } from 'react';
// import { useParams } from "react-router-dom";
import { favouritesApi } from "../api/favouritesApi";

export function FavouritesContextProvider({ children }) {
  const [favourites, setFavourites] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleloadFavourites = async () => {
    try {
      const response = await favouritesApi.get(`/favourites/`);
      setFavourites(response.data);
      setError(null);
      setSuccess(true);
    } catch (error) {
          setSuccess(false);
          console.log(error.response);
          if (error.response.status === 400) setError(error.response.data.message);
          else setError(error.message);
        } finally {
        }
  };
  
  const handleDeleteFavourite = async (id) => {
    try {
      console.log("deleting record");
      await favouritesApi.delete(`/favourites/${id}`);
      setSuccess(true);
      setError(null);
    } catch (error) {
      setSuccess(false);
      console.log(error.response);
      if (error.response.status === 400) setError(error.response.data.message);
      else setError(error.message);
    } finally {
      const newFavourites = favourites.filter((item) => item.id !== id);
      console.log('newFavourites', newFavourites)
      setFavourites(newFavourites);

    }
  };

  const context = {
    favourites,
    success,
    error,
    handleloadFavourites,
    handleDeleteFavourite,
  }
 
  return (
    <FavouritesContext.Provider value={context}>
      {children}
    </FavouritesContext.Provider>
  )
}

export const FavouritesContext = createContext({
  handleloadFavourites: () => {},
  handleDeleteFavourite: () => {}
}
);