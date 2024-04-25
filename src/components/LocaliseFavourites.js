import { useEffect, useState, useContext } from "react";
import { FavouritesContext } from "../store/FavouritesContext";
// import { favouritesApi } from "../api/favouritesApi";

export default function LocaliseFavourites() {
    // const [favourites, setFavourites] = useState([]);
    const favouritesctx = useContext(FavouritesContext);

    // useEffect( () => {
        favouritesctx.handleloadFavourites();
    // }, [])

    console.log('List of localised favourites', favouritesctx.favourites);
        //  setFavourites([{name: 'a'}, {name: 'b'},{name: 'c'}])
    
    return (
        <>
          
        </>
      );
};


// https://stackoverflow.com/questions/60797756/store-api-response-to-an-array-using-react-usestate

// const loadFavourites = async () => {
//     try {
//       setIsLoading(true);
//       const response = await favouritesApi.get("/favourites");
//       setFavourites(response.data);
//       setError(null);
//     } catch (error) {
//       console.log(error);
//       setError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };