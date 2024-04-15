import "./App.css";

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
  return (
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
  );
}

export default App;
