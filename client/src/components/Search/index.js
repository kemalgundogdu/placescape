import React from "react";
import { IoAirplaneSharp } from "react-icons/io5";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarDay,
} from "react-icons/fa";
import toast from "react-hot-toast";
const notify = () => toast.error("Will be developed soon.");

function Search() {
  return (
    <div className="p-6 rounded-xl bg-white">
      <div className="flex justify-between">
        <h1 className="flex items-center gap-2 font-semibold">
          <IoAirplaneSharp size={28} /> BOOK YOUR FLIGHT
        </h1>
        <div className="hidden md:flex">
          <button
            onClick={notify}
            className="px-4 py-3 bg-[#4B0097] text-[#e6e0eb] hover:opacity-80 transition-opacity text-sm rounded-l-full"
          >
            Round trip
          </button>
          <button
            onClick={notify}
            className="px-4 py-3 bg-[#e6e0eb] text-[#4B0097] hover:opacity-80 transition-opacity text-sm rounded-r-full"
          >
            One way
          </button>
        </div>
      </div>
      <div className="mt-6">
        <form action="">
          <div className="flex w-full gap-4 flex-wrap">
            <div className="flex gap-2 flex-wrap">
              <div className="relative w-full md:w-auto max-w-sm">
                <input
                  type="text"
                  className="pl-12 pr-4 py-3 outline-none border rounded-lg md:rounded-l-full w-full"
                />
                <FaPlaneDeparture className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B0097] text-xl" />
              </div>
              <div className="relative w-full md:w-auto max-w-sm">
                <input
                  type="text"
                  className="pl-12 pr-4 py-3 outline-none border rounded-lg md:rounded-r-full w-full"
                />
                <FaPlaneArrival className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B0097] text-xl" />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap ">
              <div className="relative w-full md:w-auto max-w-sm">
                <input
                  type="date"
                  className="pl-12 pr-4 py-3 outline-none border rounded-lg md:rounded-l-full w-full"
                />
                <FaCalendarDay className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B0097] text-xl" />
              </div>
              <div className="relative w-full md:w-auto max-w-sm">
                <input
                  type="date"
                  className="pl-12 pr-4 py-3 outline-none border rounded-lg md:rounded-r-full w-full"
                />
                <FaCalendarDay className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B0097] text-xl" />
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={notify}
            className="px-4 py-3 mt-3 bg-[#4B0097] text-[#e6e0eb] hover:opacity-80 transition-opacity text-sm rounded-lg"
          >
            Show Flights
          </button>
        </form>
      </div>
    </div>
  );
}

export default Search;
