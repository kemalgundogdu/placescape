import React from "react";
import { useFilter } from "../../context/FilterContext";

function Filter() {
  const [
    ,
    setSortby,
    arrivalTimeFilter,
    setArrivaltimeFilter,
    stopsFilter,
    setStopsFilter,
    airlineFilter,
    setAirlineFilter,
    open,
    setOpen,
  ] = useFilter();

  const handleChange = (e) => {
    setSortby(e.target.value);
  };

  const handleArrivalTimeChange = (e) => {
    setArrivaltimeFilter(e.target.value);
  };

  const handleStopsChange = (e) => {
    setStopsFilter(e.target.value);
  };

  const handleAirlineChange = (e) => {
    setAirlineFilter(e.target.value);
  };

  const handleClose = () => {
    setOpen(!open);
  }

  return (
    <>
    <button onClick={handleClose} className={`${open === false ? 'hidden' : 'inline-block'} absolute top-5 right-5 z-40 text-xs px-4 py-2 border rounded-lg bg-[#e9dcfe]`}>Close</button>
      <div className={`${open === false ? 'relative hidden' : 'flex fixed top-0 left-0 pt-20 p-3 mb:p-0 md:w-auto h-full md:h-auto z-30 justify-center items-start md:justify-normal md:items-start md:relative md:bg-transparent bg-[#f6f4f8]'} w-full flex-1  md:flex`}>
        <div className="w-full flex flex-col gap-5">
          <div>
            <h5 className="font-semibold text-sm">Sort by:</h5>

            <select
              name="sortby"
              onChange={handleChange}
              id="sortby"
              className="w-full p-2 rounded-lg outline-none text-sm"
            >
              <option value="low-price">Lowest Price</option>
              <option value="high-price">Highest Price</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <div>
            <h5 className="font-semibold text-sm">Arrival Time</h5>

            <div className="flex flex-col gap-1 mt-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  className="accent-[#4B0097]"
                  type="radio"
                  value="one-to-twelve"
                  checked={arrivalTimeFilter === "one-to-twelve"}
                  onChange={handleArrivalTimeChange}
                />
                00:00 AM - 11:59 AM
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  className="accent-[#4B0097]"
                  type="radio"
                  value="twelve-to-twelve"
                  checked={arrivalTimeFilter === "twelve-to-twelve"}
                  onChange={handleArrivalTimeChange}
                />
                12:00 PM - 11:59 PM
              </label>
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-sm">Stops</h5>

            <div className="flex flex-col gap-1 mt-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  className="accent-[#4B0097]"
                  type="radio"
                  value="0"
                  checked={stopsFilter === "0"}
                  onChange={handleStopsChange}
                />
                Nonstop
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  className="accent-[#4B0097]"
                  type="radio"
                  value="1"
                  checked={stopsFilter === "1"}
                  onChange={handleStopsChange}
                />
                1 Stop
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  className="accent-[#4B0097]"
                  type="radio"
                  value="2"
                  checked={stopsFilter === "2"}
                  onChange={handleStopsChange}
                />
                2 Stops
              </label>
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-sm">Airlines Included</h5>

            <div className="flex flex-col gap-1 mt-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  className="accent-[#4B0097]"
                  type="radio"
                  value="TUI fly"
                  checked={airlineFilter === "TUI fly"}
                  onChange={handleAirlineChange}
                />
                TUI fly
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  className="accent-[#4B0097]"
                  type="radio"
                  value="Transavia"
                  checked={airlineFilter === "Transavia"}
                  onChange={handleAirlineChange}
                />
                Transavia
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  className="accent-[#4B0097]"
                  type="radio"
                  value="KLM"
                  checked={airlineFilter === "KLM"}
                  onChange={handleAirlineChange}
                />
                KLM
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  className="accent-[#4B0097]"
                  type="radio"
                  value="Delta Air Lines"
                  checked={airlineFilter === "Delta Air Lines"}
                  onChange={handleAirlineChange}
                />
                Delta Air Lines
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
