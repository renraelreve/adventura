import "./App.css";
import placeAPI from "./api/placeApi";
import dataSetAPI from "./api/dataSetApi";
import imageAPI from "./api/imageApi";
import { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import RootLayout from "./layouts/RootLayout";
// import Customers from "./pages/Customers";
// import Settings from "./pages/Settings";
// import Support from "./pages/Support";
// import AddCustomer from "./pages/AddCustomer";

function App() {
  const [places, setPlaces] = useState([]);
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
      const response = await dataSetAPI.get();
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
  }, []);

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
    <>
      <div className="App">
        <h1>Hello Adventura! This is branch.</h1>

        <button onClick={apiGetAll}>Select Category</button>

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

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />

            {/* <Route path="customers" element={<Customers />} /> from simple-crm
          <Route path="log-interaction/:id" element={<LogInteraction />} />
          <Route path="details/:id" element={<CustomerDetails />} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<Support />} />
          <Route path="add-customer" element={<AddCustomer />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
