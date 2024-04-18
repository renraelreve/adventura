
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Favourites from "./pages/Favourites";
import Login from "./pages/Login";
import AddComment from "./pages/AddComment";
// import Settings from "./pages/Settings";
// import Support from "./pages/Support";
// import AddCustomer from "./pages/AddCustomer";


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="favourites" element={<Favourites />} /> 
          <Route path="add-comment/:id" element={<AddComment />} /> 
          {/* 
          
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<Support />} />
          <Route path="add-customer" element={<AddCustomer />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
