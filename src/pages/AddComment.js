import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

import { favouritesApi } from "../api/favouritesApi";

import Success from "../components/Success";
import Error from "../components/Error";

const initialCommentState = {
  comment: "",
  createdAt: "",
};

function AddComment() {
  const { id } = useParams();
  const [favourite, setFavourite] = useState({});
  const [comment, setComment] = useState(initialCommentState);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleChangeComment = (e) => {
    setComment((comment) => {
      return { ...comment, [e.target.name]: e.target.value };
    });
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const newComment = {
        comment: e.target.comment.value,
        // createdAt: e.target.createdAt.value,
      };
      await favouritesApi.patch(`/favourites/${id}`, newComment );
      setSuccess(true);
      setComment(initialCommentState);
      setError(null);
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
    <div style={{ width: 600 }}>
      <h1>Log Interaction</h1>
      <p style={{ marginBottom: 20 }}>
        Attraction:{" "}
        <NavLink to={`/favourites/${favourite.id}`}>
          {favourite.name}
        </NavLink>
      </p>

      {success && <Success message="Comment added successfully." />}
      {error && <Error message={error} />}

      <form className="comment-form" onSubmit={handleAddComment}>
        <label htmlFor="comment">Comments:</label>
        <textarea
          id="comment"
          name="comment"
          type="text"
          placeholder="Enter comments here..."
          onChange={handleChangeComment}
          value={comment.comment}
        />
        <label htmlFor="createdAt">Comment Date:</label>
        <input
          id="createdAt"
          name="createdAt"
          type="date"
          placeholder="Enter comment date here..."
          onChange={handleChangeComment}
          value={comment.createdAt}
        />
        <button disabled={isLoading}>
          {isLoading ? "Adding ..." : "Add Comment"}
        </button>
      </form>
    </div>
  );
}

export default AddComment;
