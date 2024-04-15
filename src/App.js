import "./App.css";
import placeAPI from "./api/placeApi";
import dataSetAPI from "./api/dataSetApi";
import imageAPI from "./api/imageApi";
import { useEffect, useState } from "react";

function App() {
  const [places, setPlaces] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  const params = {
    searchType: "keyword",
    searchValues: "high",
  };

  // Getting all places from category
  const apiGetAll = async () => {
    try {
      const response = await dataSetAPI.get();
      const newData = response.data.data.map(
        ({ name, rating, description, images }) => ({
          name,
          rating,
          description,
          images,
        })
      );
      setPlaces(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    apiGetAll();
  }, []);

  //Getting images of places

  const getImages = async (mediaFileUUID) => {
    try {
      const response = await imageAPI.get(`/${mediaFileUUID}`, {
        responseType: "arraybuffer",
      });
      // Handle the response data here
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const dataUrl = URL.createObjectURL(blob);
      setImageUrl(dataUrl);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const imagesIdArray = places.map((obj) => {
    if (Array.isArray(obj.images) && obj.images.length > 0) {
      return obj.images[0].uuid; // Extract uuid from the first object in the 'image' array
    } else {
      return null; // Return null if 'image' array is empty or does not exist
    }
  });

  const getImageUrls = async (uuidArray) => {
    const imageUrls = [];

    // Iterate over the array of UUIDs
    for (const uuid of uuidArray) {
      try {
        // Call getImages function for each UUID
        const response = await getImages(uuid);
        imageUrls.push(response.imageUrl); // Assuming getImages function sets the imageUrl state
      } catch (error) {
        console.error("Error fetching image data:", error);
        // Push a default image URL or handle error as needed
        imageUrls.push("defaultImageUrl"); // Default image URL
      }
    }

    return imageUrls;
  };

  // Define an async function to use await
  const processImageUrls = async () => {
    try {
      // Call getImageUrls function and store the result in imageUrlsArray
      const imageUrlsArray = await getImageUrls(imagesIdArray);
      console.log(imageUrlsArray);
      // Do further processing with the image URLs here
    } catch (error) {
      console.error("Error processing image URLs:", error);
    }
  };

  // Call the async function
  // processImageUrls();

  console.log("UUID", imagesIdArray);

  useEffect(() => {
    setPlaces(
      places.map((item, index) => ({
        ...item,
        uuid: imagesIdArray[index].uuid,
      }))
    );
  }, []);

  console.log("places", places);

  useEffect(() => {
    getImages("101972df569b1fe42df9379c99cd5e9f337");
  }, []);

  const apiGetSelect = async () => {
    try {
      const response = await placeAPI.get("", { params });
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Hello Adventura! This is branch.</h1>

      <button onClick={apiGetAll}>Select Category</button>

      {places && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {places.slice(0, 4).map((item, index) => (
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
              <div>Description: {item.description}</div>
              <div>Ratings: {item.rating}</div>
              <div>
                {imageUrl && (
                  <img
                    style={{ width: "300px" }}
                    src={imageUrl}
                    alt="Downloaded"
                  />
                )}
              </div>
              <div>{item.images[0].uuid}</div>
            </li>
          ))}
        </ul>
      )}

      <button onClick={apiGetSelect}>Search Keywords</button>
    </div>
  );
}

export default App;
