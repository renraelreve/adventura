// Home.js

import dataSetAPI from "../api/dataSetApi";
import imageAPI from "../api/imageApi";
import { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";

function Home() {
  const [places, setPlaces] = useState([]);
  const [category, setCategory] = useState("accommodation");
  const [keyword, setKeyword] = useState("");

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
        onSearchPlaces={apiGetAll}
      />

      {places && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {places.slice(0, 12).map((item, index) => (
            <li
              key={index}
              style={{
                border: "2px solid black",
                margin: "10px",
                padding: "10px",
                backgroundColor: "yellow",
                width: "500px",
              }}
            >
              <div>Name: {item.name}</div>
              {/* <div>Description: {item.description}</div>
              <div>Ratings: {item.rating}</div> */}
              <div>
                {item.imageUrl && (
                  <img
                    style={{ width: "300px" }}
                    src={item.imageUrl}
                    alt="Downloaded"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* <button onClick={apiGetSelect}>Search Keywords</button> */}
    </div>
  );
}

export default Home;
