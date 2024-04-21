import { NavLink } from "react-router-dom";
import BasicRating from "./Rating";

function FavouriteTable({ favourites }) {
  return (
    <table className="favourite-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rating</th>
          <th>Comment</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {favourites.map((favourite) => (
          <tr key={favourite.id}>
            <td>
              <NavLink to={`/favourites/${favourite.id}`}>
                {favourite.name}
              </NavLink>
            </td>
            {/* <td>{favourite.rating}</td> */}
            <td><BasicRating rating={favourite.rating}/></td>
            <td>{favourite.comment}</td>
            <td>
              <NavLink to={`/add-comment/${favourite.id}`}>
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
