import { useState, useContext } from 'react';
import { Dialog } from "@headlessui/react";
import Rating from '@mui/material/Rating';
import { AuthContext } from "../store/AuthContext";
import { favouritesApi } from "../api/favouritesApi";
import Success from "../components/Success"

const initialFavouriteState = {
    name: "",
    rating: "",
    comment: "",
  };

export default function Modal( { isOpen, selectedPlace, favourites, handleSubmit, handleClose } ) {
    const { isLoggedIn } = useContext(AuthContext);
    const [newFavourite, setNewFavourite] = useState(initialFavouriteState);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleFavouriteChange = (e) => {
        setNewFavourite((favourite) => {
          return {...favourite,
            name: selectedPlace.name,
            [e.target.name]: e.target.value };
        });
      };
    
    const handleAddFavourite = async (e) => {
        e.preventDefault();
        try {
          setIsLoading(true);
          console.log("this is being post", newFavourite);
          await favouritesApi.post(`/favourites`, newFavourite);
          setSuccess(true);
          setError(null);
          setNewFavourite(initialFavouriteState);
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
    <>
    <Dialog open={isOpen} onClose={() => handleClose()}>
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
            { isLoggedIn && 
                <div>
                    {/* {!favourites.some((place) => place.name.includes(selectedPlace.name)) &&  (                 */}
                        { !isSubmitted  &&
                        <form onSubmit={handleSubmit}>
                            <p>Comments: 
                            <textarea
                                    name="comment"
                                    rows={2} // Set the number of visible rows
                                    cols={50} // Set the number of visible columns
                                    style={{
                                        border: "1px solid black",
                                        marginTop: "15px",
                                        marginBottom: "10px",
                                    }}
                                    onChange={handleFavouriteChange}
                                    value={newFavourite.comment} />
                            </p>

                            <p>My Rating: 
                            <Rating
                                name="rating"
                                value={newFavourite.rating}
                                onChange={handleFavouriteChange} />
                            </p>

                            
                            <button style={{ margin: "10px" }} onClick={handleAddFavourite}>
                                Save to Favourites
                            </button>
                    
                        </form>
                    }
                </div> 
            }
            { success && <Success /> }
            <button
                style={{ margin: "10px" }}
                onClick={() => {handleClose(); setIsSubmitted(false); setSuccess(false)}}
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
    )
}