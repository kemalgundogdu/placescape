import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [sortby, setSortby] = useState([]);
  const [arrivalTimeFilter, setArrivaltimeFilter] = useState([]);
  const [stopsFilter, setStopsFilter] = useState();
  const [airlineFilter, setAirlineFilter] = useState();
  const [open, setOpen] = useState(false);

  const values = [sortby, setSortby, arrivalTimeFilter, setArrivaltimeFilter, stopsFilter, setStopsFilter, airlineFilter, setAirlineFilter, open, setOpen];

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
