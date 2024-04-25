// Home.js

import dataSetAPI from "../api/dataSetApi";
import imageAPI from "../api/imageApi";
import { useEffect, useState, useCallback } from "react";

import SearchInput from "../components/SearchInput";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import Error from "../components/Error";
import adventura from "../assets/adventura-logo.jpeg";

function Home() {
  const [places, setPlaces] = useState([]);
  const [category, setCategory] = useState("accommodation");
  const [keyword, setKeyword] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false); add in react-spinner like async-dog
  const [favourites, setFavourites] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // define a function to convert UUID to imageUrl
  const getImages = async (mediaFileUUID) => {
    try {
      const response = await imageAPI.get(`/${mediaFileUUID}`, {
        responseType: "arraybuffer",
        params: {
          fileType: "",
        },
      });
      // Handle the response data here
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const dataUrl = URL.createObjectURL(blob);
      return dataUrl; // Return the dataUrl
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

//   useEffect(() => {
//     apiGetAll();
//   }, [keyword, category]);

  // Getting all places from category
  const apiGetAll = useCallback(async () => {
    try {

      setIsLoading(true);

      const response = await dataSetAPI.get("/search", {
        params: { dataset: category, keyword: keyword },
      });

      console.log("this is response within apiGetAll", response);

      const newData = await Promise.all(
        response.data.data
          .slice(0, 12)
          .map(async ({ name, rating, description, images }) => {
            // Check if 'images' is an array and not empty
            const firstImageUuid =
              Array.isArray(images) && images.length > 0
                ? images[0].uuid
                : null;

            // Call getImages to convert UUID to image URL
            const imageUrl = firstImageUuid
              ? await getImages(firstImageUuid)
              : null;

            return {
              name,
              rating,
              description,
              imageUrl, // Replace 'firstImageUuid' with 'imageUrl'
            };
          }
        )
      );

      setPlaces(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } 
    
    finally {
      setIsLoading(false);
      console.log('this is places within apiGetAll()', places);  
    }
  }, [keyword, category]);


  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  const handlerSetCategory = (category) => setCategory(category);
  const handlerSetKeyword = (keyword) => setKeyword(keyword);

  console.log('this is places within Home.js', places);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const newPlace = {
  //     name: selectedPlace.name,
  //     comment: e.target.elements.comment.value,
  //     rating: e.target.elements.rating.value,
  //   };
  //   const newList = [...favourites, newPlace];
  //   setFavourites(newList);
  // };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    apiGetAll();
  }, [apiGetAll]);

  // useEffect(() => {
  //   if (isMounted) {
  //     apiGetAll();
  //   }
  // }, []);

  return (
    <div className="App">
      <h1>Welcome to Adventura!</h1>

      <SearchInput
        onSetCategory={handlerSetCategory}
        onSetKeyword={handlerSetKeyword}
      />

      {places && (
        <div>
          <ul className="list">
            {places.slice(0, 12).map((item, index) => (
              <li
                onClick={() => {
                  setIsOpen(true);
                  setSelectedPlace(item);
                }}
                className="items"
                key={index}
                style={{
                  border: "2px solid #FFEBB2",
                  margin: "10px",
                  padding: "10px",
                  backgroundColor: "#F7EEDD",
                  width: "500px",
                  borderRadius: "10px",
                }}
              >
                <div>{item.name}</div>
                {/* <div>Description: {item.description}</div>
              <div>Ratings: {item.rating}</div> */}
                <div>
                  {item.imageUrl && (
                    <img
                      className="images"
                      src={item.imageUrl}
                      alt="Downloaded"
                    />
                  )}

                  {!item.imageUrl && (
                    <img className="images" src={adventura} alt="Adventura" />
                  )}
                </div>
              </li>
            ))}
          </ul>

          {console.log('this is selectedPlace passed to Modal',selectedPlace)}
          <Modal 
            isOpen={isOpen}
            selectedPlace={selectedPlace} 
            favourites={favourites} 
//             handleSubmit={handleSubmit}
            handleClose={handleClose} />

          {/* <Dialog /> refactored as Modal.js, original code block below */}
        </div>
      )}

      {/* <button onClick={apiGetSelect}>Search Keywords</button> */}
    </div>
  );
}

// <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
//             <div>
//               <Dialog.Panel className="dialogPanel">
//                 <Dialog.Title>Details</Dialog.Title>
//                 <Dialog.Description style={{ margin: "10px" }}>
//                   {selectedPlace && (
//                     <div style={{ display: "flex" }}>
//                       <div style={{ marginRight: "20px" }}>
//                         {/* Image */}
//                         {selectedPlace.imageUrl && (
//                           <img
//                             className="imageDialog"
//                             src={selectedPlace.imageUrl}
//                             alt="Place"
//                           />
//                         )}
//                       </div>
//                       <div>
//                         {/* Place details */}
//                         <p>
//                           <strong>Name: {selectedPlace.name}</strong>{" "}
//                         </p>
//                         <br></br>
//                         <p>Description: {selectedPlace.description}</p>
//                         <br></br>
//                         <p>Ratings: {selectedPlace.rating}</p>
//                       </div>
//                     </div>
//                   )}
//                 </Dialog.Description>

//                 <form onSubmit={handlerSubmit}>
//                   <span>Comments: </span>
//                   <textarea
//                     name="comment"
//                     rows={2} // Set the number of visible rows
//                     cols={50} // Set the number of visible columns
//                     style={{
//                       border: "1px solid black",
//                       marginTop: "15px",
//                       marginBottom: "10px",
//                     }}
//                     // value={keyword}
//                     // onChange={(e) => {
//                     //   onSetKeyword(e.target.value);
//                     // }
//                   />

//                   <br />

//                   <span>Ratings: </span>
//                   <input
//                     name="rating"
//                     type="number"
//                     style={{
//                       width: "100px",
//                       height: "20px",
//                       border: "1px solid black",
//                       marginTop: "5px",
//                       marginBottom: "10px",
//                     }}
//                   />
//                   <br />

//                   {!favourites.some((place) =>
//                     place.name.includes(selectedPlace.name)
//                   ) && (
//                     <button style={{ margin: "10px" }}>
//                       Save to Favourites
//                     </button>
//                   )}
//                 </form>
//                 <button
//                   style={{ margin: "10px" }}
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => {
//                     console.log(favourites);
//                   }}
//                 >
//                   check favourites
//                 </button>
//               </Dialog.Panel>
//             </div>
//           </Dialog>

export default Home;
