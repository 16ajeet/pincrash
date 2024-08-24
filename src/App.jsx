import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PinDetail from "../pages/PinDetail";
import Landing from "../pages/landing";
import NavBar from "../pages/NavBar";

const App = () => {
  return (
    <>
      <NavBar />
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pin-detail/:pin" element={<PinDetail />} />
      </Routes>
      
    </>
  );
};

export default App;
