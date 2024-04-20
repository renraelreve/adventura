// Home.js

import dataSetAPI from "../api/dataSetApi";
import imageAPI from "../api/imageApi";
import { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import { Dialog } from "@headlessui/react";

function Home() {
  const [places, setPlaces] = useState([]);
  const [category, setCategory] = useState("accommodation");
  const [keyword, setKeyword] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  let [isOpen, setIsOpen] = useState(false);

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
  const apiGetAll = async () => {
    try {
      const response = await dataSetAPI.get("/search", {
        params: { dataset: category, keyword: keyword },
      });

      console.log("places", response);

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
          })
      );

      setPlaces(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlerSetCategory = (category) => setCategory(category);
  const handlerSetKeyword = (keyword) => setKeyword(keyword);

  console.log(places);

  useEffect(() => {
    apiGetAll();
  }, [keyword, category]);

  return (
    <div className="App">
      <h1>Hello Adventura! This is branch.</h1>

      <SearchInput
        onSetCategory={handlerSetCategory}
        onSetKeyword={handlerSetKeyword}
      />

      {places && (
        <div>
          <ul className="list">
            {places.slice(0, 12).map((item, index) => (
              <li className="items"
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
                <div
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedPlace(item);
                  }}
                >
                  {item.imageUrl && (
                    <img className="images"
                      src={item.imageUrl}
                      alt="Downloaded"
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div style={{ margin: "auto" }}>
              <Dialog.Panel className="dialogPanel">
                <Dialog.Title>Details</Dialog.Title>
                <Dialog.Description style={{ margin: "10px" }}>
                  {selectedPlace && (
                    <div style={{ display: "flex" }}>
                      <div style={{ marginRight: "20px" }}>
                        {/* Image */}
                        {selectedPlace.imageUrl && (
                          <img className="imageDialog"
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

                <p style={{ margin: "10px" }}>
                  <br></br>
                  You can save this attraction to your favourites!
                </p>

                {/*
       You can render additional buttons to dismiss your dialog by setting
       `isOpen` to `false`.
     */}
                <button style={{ margin: "10px" }}>Save to Favourites</button>
                <button
                  style={{ margin: "10px" }}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </Dialog.Panel>
            </div>
          </Dialog>
        </div>
      )}

      {/* <button onClick={apiGetSelect}>Search Keywords</button> */}
    </div>
  );
}

export default Home;
