import { useState, useContext } from "react";
import { Dialog } from "@headlessui/react";
import Rating from "@mui/material/Rating";
import { AuthContext } from "../store/AuthContext";
import { favouritesApi } from "../api/favouritesApi";
import Success from "../components/Success";
import adventura from "../assets/adventura-logo.jpeg";

const initialFavouriteState = {
  name: "",
  rating: "",
  comment: "",
};

export default function Modal({
  isOpen,
  selectedPlace,
  favourites,
  onHandleSubmit,
  onHandleClose,
}) {
  const { isLoggedIn } = useContext(AuthContext);
  // const [newFavourite, setNewFavourite] = useState(initialFavouriteState);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const newPlace = {
      name: selectedPlace.name,
      comment: e.target.elements.comment.value,
      rating: e.target.elements.rating.value,
    };

    // Pass the newPlace object to the onHandleSubmit function
    onHandleSubmit(newPlace);

    try {
      setIsLoading(true);
      // setNewFavourite((favourite) => {
      //   return {
      //     ...favourite,
      //     name: selectedPlace.name,
      //     [e.target.name]: e.target.value,
      //   };
      // });

      console.log("this is being post", newPlace);
      await favouritesApi.post(`/favourites`, newPlace);
      setSuccess(true);
      setError(null);
      // setNewFavourite(initialFavouriteState);
      setIsSubmitted(true);
    } catch (error) {
      setSuccess(false);
      console.log(error.response);
      if (error.response.status === 400) setError(error.response.data.message);
      else setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleFavouriteChange = async (e) => {};

  return (
    <>
      <Dialog open={isOpen} onClose={() => onHandleClose()}>
        <div>
          <Dialog.Panel className="dialogPanel">
            <Dialog.Title>Details</Dialog.Title>
            <Dialog.Description style={{ margin: "2px" }}>
              {selectedPlace && (
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "20px" }}>
                    {/* Image */}
                    {selectedPlace.imageUrl && (
                      <img
                        className="imageDialog"
                        src={selectedPlace.imageUrl}
                        alt="Place"
                      />
                    )}
                    {!selectedPlace.imageUrl && (
                      <img
                        className="imageDialog"
                        src={adventura}
                        alt="Place"
                      />
                    )}
                  </div>
                  <div>
                    {/* Place details */}
                    <p>
                      <strong>Name: {selectedPlace.name}</strong>{" "}
                    </p>
                    <br></br>
                    <p>Description: {selectedPlace.description}</p>
                    <br></br>
                    <p>Ratings: {selectedPlace.rating}</p>
                  </div>
                </div>
              )}
            </Dialog.Description>
            {isLoggedIn && (
              <div>
                {!favourites.some((place) =>
                  place.name.includes(selectedPlace.name)
                ) && (
                  <form onSubmit={handleSubmit}>
                    <p>
                      Comments:
                      <textarea
                        name="comment"
                        rows={2} // Set the number of visible rows
                        cols={50} // Set the number of visible columns
                        style={{
                          border: "1px solid black",
                          marginTop: "15px",
                          marginBottom: "10px",
                        }}
                        // onChange={handleFavouriteChange}
                        // value={newFavourite.comment}
                      />
                    </p>

                    <p>
                      My Rating:
                      <Rating
                        name="rating"
                        // value={newFavourite.rating}
                        // onChange={handleFavouriteChange}
                      />
                    </p>

                    <button style={{ margin: "10px" }}>
                      Save to Favourites
                    </button>
                  </form>
                )}
              </div>
            )}
            {success && <Success />}
            <button
              style={{ margin: "10px" }}
              onClick={() => {
                onHandleClose();
                setIsSubmitted(false);
                setSuccess(false);
              }}
            >
              Back
            </button>
            <button
              onClick={() => {
                console.log(favourites);
              }}
            >
              Check Favourites
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
