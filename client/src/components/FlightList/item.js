import React, { useEffect, useState } from "react";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { IoAirplaneSharp } from "react-icons/io5";

import toast from "react-hot-toast";

// city information
import { getCity, addSavedTicket } from "../../api";

import { useUser } from "../../context/UserContext";

function Item({
  flightDirection,
  departure,
  arrival,
  ata,
  cao,
  price,
  flightDuration,
  destinationsLength,
  airlineName,
  id,
}) {
  // get the city information
  const [city, setCity] = useState(null);
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  // get the user id
  const [userID] = useUser();

  // get the arrival time
  let arrivalDate = new Date(arrival);
  // check if the arrival time is available
  if (isNaN(Date.parse(arrival)) || typeof arrival === "undefined") {
    arrivalDate = "No information";
  } else {
    arrivalDate = new Date(arrival);
  }

  // city information
  useEffect(() => {
    getCity(cao).then((data) => {
      if (data.city !== null && data.city !== undefined) {
        setCity(data.city);
      } else {
        setCity(data.publicName.english);
      }
    });
  }, [cao, city]);

  // ata arrival aiport
  // cao departure airport

  // add saved ticket
  const handleSavedTicket = () => {
    const ticket = {
      flightID: id,
      flightDirection,
      departure,
      arrival,
      ata,
      cao,
      price,
      airlineName,
      flightDuration,
      destinationsLength,
      arrivalCity: flightDirection === "D" ? "Amsterdam " : city,
      departureCity: flightDirection === "D" ? city : "Amsterdam",
      userID: userID,
    };

    // add the ticket to the database
    addSavedTicket(ticket)
      .then((data) => {
        console.log(data);

        notifySuccess("Your " + data.departureCity + " ticket has been saved.");
      })
      .catch(() => {
        notifyError("Your ticket could not be saved.");
      });
  };

  return (
    <div>
      <div className="p-6 bg-white rounded-lg w-full">
        <h3 className="font-semibold">
          {flightDirection === "D" ? "Amsterdam " : city + " "} -{" "}
          {flightDirection !== "D" ? "Amsterdam " : city + " "}
        </h3>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 flex items-center gap-2">
              <FaPlaneDeparture /> Departure
            </span>
            <span className="font-semibold mt-1">
              {departure.getHours()}:{departure.getMinutes()}
              {departure.getHours() >= 12 ? " PM" : " AM"}
            </span>
            <span className="text-xs">
              Airport: {flightDirection === "D" ? "AMS" : cao}
            </span>
          </div>

          <div className="flex justify-center flex-col items-center gap-1">
            <span className="text-xs text-slate-500">{airlineName}</span>
            <IoAirplaneSharp className="text-[#4B0097] text-lg" />
            <span className="text-xs text-center md:text-left">
              {flightDuration}
              <br className="block md:hidden" />
              {flightDuration !== "No information" &&
                (destinationsLength === 1
                  ? "(nonstop)"
                  : `(${destinationsLength} stop)`)}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-slate-500 flex items-center gap-2">
              <FaPlaneArrival /> Arrival
            </span>
            <span className="font-semibold mt-1">
              {arrivalDate instanceof Date ? (
                <>
                  {arrivalDate.getHours()}:{arrivalDate.getMinutes()}
                  {arrivalDate.getHours() >= 12 ? " PM" : " AM"}
                </>
              ) : (
                <>{arrivalDate}</>
              )}
            </span>
            <span className="text-xs">
              Airport: {flightDirection === "A" ? "AMS" : ata}
            </span>
          </div>
        </div>
        <div className="relative flex justify-between items-center mt-4">
          <div className="flex flex-col">
            <b className="text-[#4B0097] font-semibold">Price: {price}</b>
            <span className="text-xs text-slate-500">Round Trip</span>
          </div>
          <button
            onClick={handleSavedTicket}
            className="px-8 py-4 bg-[#4B0097] text-white text-sm rounded-tl-lg rounded-br-lg absolute -right-6 -bottom-6 hover:opacity-80 transition-opacity"
          >
            Book Flight
          </button>
        </div>
      </div>
      <button className="p-3 bg-[#e6e0eb] text-[#4b0097] text-xs rounded-b-lg underline hover:no-underline">
        Check the details
      </button>
    </div>
  );
}

export default Item;
