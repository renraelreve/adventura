import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import Rating from "@mui/material/Rating";
import { AuthContext } from "../store/AuthContext";
import { FavouritesContext } from "../store/FavouritesContext";
import { favouritesApi } from "../api/favouritesApi";
import Success from "../components/Success";
import Error from "../components/Error";
import adventura from "../assets/adventura-logo.jpeg";

const initialFavouriteState = {
  name: "",
  rating: "",
  comment: "",
};

export default function Modal( { isOpen, selectedPlace, handleClose } ) {
    const { isLoggedIn } = useContext(AuthContext);
    const favouritesctx = useContext(FavouritesContext);
    
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [newFavourite, setNewFavourite] = useState(initialFavouriteState);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault();

    const newPlace = {
      name: selectedPlace.name,
      comment: e.target.elements.comment.value,
      rating: e.target.elements.rating.value,
    };
    const newList = [...favouritesctx.favourites, newPlace];
    favouritesctx.setFavourites(newList);
    };

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
          console.log("this is being POST", newFavourite);
          await favouritesApi.post(`/favourites`, newFavourite);
          setSuccess(true);
          setError(null);
          favouritesctx.handleloadFavourites();
        } catch (error) {
          setSuccess(false);
          console.log(error.response);
          if (error.response.status === 400) setError(error.response.data.message);
          else setError(error.message);
        } finally {
          setError(null);
          
        }
    };

  return (
    <>

    {console.log('this is selectedPlace.name inside Dialog', selectedPlace.name)}
    {console.log('this is favouritesctx.favourites inside Dialog', favouritesctx.favourites)}
    <Dialog open={isOpen} onClose={() => {handleClose(); setSuccess(false)}}>
        <div>
            <Dialog.Panel className="dialogPanel">
            <span style={{ float: "right" }} onClick={() => {handleClose(); setSuccess(false)}}>❌</span>
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
                    <p>Site Ratings: {selectedPlace.rating}</p>
                  </div>
                </div>
              )}
            </Dialog.Description>

            { isLoggedIn && 
                !(favouritesctx.favourites).some((place) => place.name.includes(selectedPlace.name)) && 
                    <div>
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
                                    value={newFavourite.comment} 
                                    onChange={handleFavouriteChange} />
                            </p>

                    <p>
                      My Rating:
                      <Rating
                        name="rating"
                        value={newFavourite.rating}
                        onChange={handleFavouriteChange}
                      />
                    </p>
                           
                            <button style={{ margin: "10px" }} onClick={handleAddFavourite}>
                                Save to Favourites
                            </button>
                        </form>
                
                </div> 
            }
            {success && <Success />}
            {error && <Error message={error}/>}
            {console.log('this is selectedPlace.name at conditional Favourites',selectedPlace.name)}
            
            { isLoggedIn && (favouritesctx.favourites).some((place) => place.name.includes(selectedPlace.name)) && <p><br/>You are already tracking this Favourite!</p> }
            
            
            { isLoggedIn && <button style={{ marginLeft: "10px" }}
                onClick={() => {navigate('/favourites');
                console.log(favouritesctx.favourites);
                }}

            >
              Check Favourites
            </button>
            }
            </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
