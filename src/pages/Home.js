// Home.js
import placeAPI from "../api/placeApi";
import dataSetAPI from "../api/dataSetApi";
import imageAPI from "../api/imageApi";
import { useEffect, useState } from "react";
import CategoryInput from "../components/CategoryInput";

function Home() {
  const [places, setPlaces] = useState([]);
  const [category, setCategory] = useState("food_beverages");
  // const [imageUrl, setImageUrl] = useState([]);

  // Getting all places from category

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
      return dataUrl; // Return the dataUrl
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const apiGetAll = async () => {
    try {
      const response = await dataSetAPI.get("/search", {
        params: { dataset: category },
      });
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

  useEffect(() => {
    apiGetAll();
  });

  const handlerSetCategory = (category) => setCategory(category);

  console.log(places);

  // const params = {
  //   searchType: "keyword",
  //   searchValues: "high",
  // };

  // const apiGetSelect = async () => {
  //   try {
  //     const response = await placeAPI.get("", { params });
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  return (
    <div className="App">
      <h1>Hello Adventura! This is branch.</h1>

      <CategoryInput onSetCategory={handlerSetCategory} category={category} />

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
