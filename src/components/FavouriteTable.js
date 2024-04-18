import { NavLink } from "react-router-dom";

function FavouriteTable({ favourites }) {
  return (
    <table className="favourite-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date Visited</th>
          <th>Rating</th>
          <th>Comment</th>
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

            <td>{favourite.createdAt}</td>
            <td>{favourite.rating}</td>
            <td>{favourite.comment}</td>
            <td>
              <NavLink to={`/add-comment/${favourite.id}`}>
                📝 Add a Comment
              </NavLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FavouriteTable;
