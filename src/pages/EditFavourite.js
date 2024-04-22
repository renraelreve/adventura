import { useEffect, useState, useContext } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import Rating from '@mui/material/Rating';
import { favouritesApi } from "../api/favouritesApi";
import Success from "../components/Success";
import Error from "../components/Error";
import DisplayRating from "../components/DisplayRating"

const initialAdditionState = {
  comment: "", 
  rating: ""
};

export default function EditFavourite() {
  const { isLoggedIn } = useContext(AuthContext);

  const { id } = useParams();
  const [favourite, setFavourite] = useState({});
  const [addition, setAddition] = useState({ ...initialAdditionState });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadFavourite(id);
  }, [id]);

  const loadFavourite = async (id) => {
    try {
      const response = await favouritesApi.get(`/favourites/${id}`);
      setFavourite(response.data);
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleChangeAddition = (e) => {
    setAddition((addition) => {
      return { ...addition, [e.target.name]: e.target.value };
    });
  };

    const handlerAddAddition = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const newAddition = {
        ...addition,
        [e.target.name]: e.target.value,
      };
      console.log("this is being patched", newAddition);
      await favouritesApi.patch(`/favourites/${id}`, newAddition);
      setSuccess(true);
      setAddition(initialAdditionState);
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
    isLoggedIn &&
    <>
      <div style={{ width: 600 }}>
        <h1>Edit Favourite</h1>
        <p style={{ marginBottom: 20 }}>
        <label htmlFor="attractionname">Attraction:</label>{" "}
          {/* <NavLink to={`/favourites/${favourite.id}`}> */}
            {favourite.name}
          {/* </NavLink> */}
        </p>

        { success && <Success message="Favourite added successfully." />}
        { error && <Error message={error} />}

        {!isSubmitted && 
        <div style={{ marginBottom: 20 }}>
          <p style={{ marginBottom: 20 }}>
          <label htmlFor="presentrating">Present rating</label>
          <DisplayRating value={favourite.rating} />
          </p>

          <p style={{ marginBottom: 20 }}>
          <label htmlFor="newrating">New rating</label>
            <Rating
              name="rating"
              value={addition.rating}
              onChange={(event, value) => {
                setAddition({ ...addition, rating: value })
              }} />
          </p> 
          
          <p style={{ marginBottom: 20 }}>
          <label htmlFor="presentcomment">Present comments</label>
          {favourite.comment}
          </p>

          <form className="comment-form" onSubmit={ handlerAddAddition }>
            <p style={{ marginBottom: 20 }}>
              <label htmlFor="newcomment">New comments:</label>
              <textarea
                id="comment"
                name="comment"
                type="text"
                placeholder="Enter comments here..."
                onChange={ handleChangeAddition }
                value={ addition.comment } />
            </p>

            <button disabled={isLoading}>
              {isLoading ? "Loading ..." : "Submit Edit"}
            </button> 
            </form>
          </div>
        }

          <button onClick={() => navigate('/favourites')} >
            Return to Favourites
          </button>
        
      </div>
    </>
  );
}
