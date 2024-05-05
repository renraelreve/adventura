// Home.js

import dataSetAPI from "../api/dataSetApi";
import imageAPI from "../api/imageApi";
import { useEffect, useState, useCallback } from "react";

import SearchInput from "../components/SearchInput";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import Error from "../components/Error";
import adventura from "../assets/adventura-logo.jpeg";
import Map from "../components/Map";

function Home() {
  const [places, setPlaces] = useState([]);
  const [category, setCategory] = useState("accommodation");
  const [keyword, setKeyword] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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
          .map(async ({ name, rating, description, location, images }) => {
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
              location,
              imageUrl, // Replace 'firstImageUuid' with 'imageUrl'
            };
          })
      );

      setPlaces(newData);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    } finally {
      setError(null);
      setIsLoading(false);
      console.log("this is places within apiGetAll()", places);
    }
  }, [keyword, category]);

  useEffect(() => {
    apiGetAll();
  }, [apiGetAll]);

  const handlerSetCategory = (category) => setCategory(category);
  const handlerSetKeyword = (keyword) => setKeyword(keyword);

  console.log("this is places within Home.js", places);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="App">
      <h1>Welcome to Adventura!</h1>

      <SearchInput
        onSetCategory={handlerSetCategory}
        onSetKeyword={handlerSetKeyword}
      />

      <div className="placeAndMapContainer">
        <div className="placeContainer">
          {isLoading && <Loading />}
          {!isLoading && (
            <>
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
                        <img
                          className="images"
                          src={adventura}
                          alt="Adventura"
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {console.log(
                "this is selectedPlace passed to Modal",
                selectedPlace
              )}
              <Modal
                isOpen={isOpen}
                selectedPlace={selectedPlace}
                handleClose={handleClose}
              />

              {/* <Dialog /> refactored as Modal.js */}
            </>
          )}
        </div>

        <div className="mapContainer">
          {!isLoading && <Map places={places} />}
        </div>
      </div>
    </div>
  );
}

export default Home;
