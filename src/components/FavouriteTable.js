import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FavouritesContext } from "../store/FavouritesContext";
import DisplayRating from "./DisplayRating";

function FavouriteTable({ favourites }) {
  const favouritesctx = useContext(FavouritesContext);
  console.log('this is favouritesctx.favourites within FavouriteTable', favouritesctx.favourites);
  return (
    <table className="favourite-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rating</th>
          <th>Comment</th>
          <th>Edit / Delete</th>
        </tr>
      </thead>
      <tbody>
        {(favouritesctx.favourites).map((favourite) => (
          <tr key={favourite.id}>
            <td>
                {favourite.name}
            </td>
            <td><DisplayRating value={favourite.rating}/></td>
            <td>{favourite.comment}</td>
            <td>
              <NavLink to={`/edit-favourite/${favourite.id}`}>
                📝 
              </NavLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FavouriteTable;
