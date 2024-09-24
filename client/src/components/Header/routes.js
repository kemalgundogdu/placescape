import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home";
import SavedTickets from "../SavedTickets";

function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/saved-tickets" element={<SavedTickets />} />
    </Routes>
  );
}

export default CustomRoutes;