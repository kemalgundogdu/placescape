import { createContext, useContext, useState } from "react";

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flights, setFlights] = useState([]);

  const values = [flights, setFlights];

  return (
    <FlightContext.Provider value={values}>{children}</FlightContext.Provider>
  );
};

export const useFlight = () => useContext(FlightContext);
