import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import { FavouritesContext } from "../store/FavouritesContext";
import Rating from "@mui/material/Rating";

import { favouritesApi } from "../api/favouritesApi";
import Success from "../components/Success";
import Error from "../components/Error";
import DisplayRating from "../components/DisplayRating";

// const initialAdditionState = {
//   comment: "",
//   rating: "",
// };

export default function EditFavourite() {
  const { isLoggedIn } = useContext(AuthContext);
  const favouritesctx = useContext(FavouritesContext);

  const { id } = useParams();
  const [favourite, setFavourite] = useState({});
  // const [addition, setAddition] = useState({ ...initialAdditionState });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const loadFavourite = async (id) => {
    try {
      const response = await favouritesApi.get(`/favourites/${id}`);
      setFavourite(response.data);
      console.log("this is favourite within EditFavourite", favourite);
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFavourite(id);
  }, [id]);

  // const handleChangeAddition = (e) => {
  //   setAddition((addition) => {
  //     return { ...addition, [e.target.name]: e.target.value };
  //   });
  // };

  const updateFavourite = (e) => {
    setFavourite((favourite) => ({
      ...favourite,
      [e.target.name]: e.target.value,
    }));
  };

  const updateRating = (newRating) => {
    setFavourite((prevFavourite) => ({
      ...prevFavourite,
      rating: newRating,
    }));
  };

  const handlerAddAddition = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // const newAddition = {
      //   ...addition,
      //   [e.target.name]: e.target.value,
      // };
      console.log("this is being PUT", favourite);
      await favouritesApi.put(`/favourites/${id}`, favourite);
      setSuccess(true);
      // setAddition(initialAdditionState);
      setError(null);
      setIsSubmitted(true);
    } catch (error) {
      setSuccess(false);
      console.log(error.response);
      if (error.response.status === 400) setError(error.response.data.message);
      else setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // prevent directory traversal through conditional rendering
    isLoggedIn && (
      <>
        <div style={{ width: 600 }}>
          <h1>Manage Favourite</h1>

          <p style={{ marginBottom: 20 }}>
            <label>Attraction:</label>
            {favourite.name}
          </p>

          {isLoading ? (
            <p>Loading...</p>
          ) : favourite ? (
            <>
              {success && <Success message="Favourite added successfully." />}
              {error && <Error message={error} />}

              {!isSubmitted && (
                <div>
                  <p style={{ marginBottom: 20 }}>
                    <label>My rating</label>
                    <DisplayRating
                      // name="rating"
                      onChange={updateRating}
                      value={favourite.rating}
                    />
                  </p>

                  {/* <DisplayRating
                      name="rating"
                      value={newFavourite.rating}
                      onChange={(newValue) =>
                        handleFavouriteChange("rating", newValue)
                      }
                    /> */}

                  <form className="comment-form" onSubmit={handlerAddAddition}>
                    <p style={{ marginBottom: 20 }}>
                      <label>My comments:</label>
                      <textarea
                        id="comment"
                        name="comment"
                        type="text"
                        placeholder="Enter comments here..."
                        onChange={updateFavourite}
                        value={favourite.comment}
                      />
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        type="submit"
                        disabled={isLoading}
                        style={{ marginRight: "10px" }}
                      >
                        {isLoading ? "Loading ..." : "Submit Edit"}
                      </button>
                      <button
                        type="button"
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                          favouritesctx.handleDeleteFavourite(id);
                          navigate("/favourites");
                        }}
                      >
                        Delete Favourite
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate("/favourites")}
                      >
                        Return to Favourites
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          ) : (
            <p>Favourite not found.</p>
          )}
        </div>
      </>
    )
  );
}
