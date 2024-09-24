import React from "react";
import toast from "react-hot-toast";

import { IoMdClose } from "react-icons/io";
import { deleteSavedTicket } from "../../api";

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
  arrivalCity,
  departureCity,
  id,
  onDelete,
}) {
  // get the arrival time
  let arrivalDate = new Date(arrival);
  // check if the arrival time is available
  if (isNaN(Date.parse(arrival)) || typeof arrival === "undefined") {
    arrivalDate = "No information";
  } else {
    arrivalDate = new Date(arrival);
  }

  let departurDate = new Date(departure);
  // check if the departure time is available
  if (isNaN(Date.parse(departure)) || typeof departure === "undefined") {
    departurDate = "No information";
  } else {
    departurDate = new Date(arrival);
  }

  // delete the saved ticket
  const handleDelete = (id) => async () => {
    try {
      await deleteSavedTicket(id);
      toast.success("Flight deleted successfully");
      onDelete(id); // Call the callback to remove this item from parent's state
    } catch (error) {
      toast.error("An error occurred while deleting the flight");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleDelete(id)}
        className="absolute p-1 rounded bg-white -left-2 top-2 shadow-md hover:shadow-none transition-all"
      >
        <IoMdClose />
      </button>
      <div className="p-6 bg-white rounded-lg w-full block md:flex flex-wrap justify-between gap-6 mt-4">
        <div className="mt-2 flex-1">
          <div className="text-xl tracking-wider">
            {departurDate.getHours()}:{departurDate.getMinutes()}
            {departurDate.getHours() >= 12 ? " PM " : " AM "}-{" "}
            {arrivalDate instanceof Date ? (
              <>
                {arrivalDate.getHours()}:{arrivalDate.getMinutes()}
                {arrivalDate.getHours() >= 12 ? " PM" : " AM"}
              </>
            ) : (
              <>{arrivalDate}</>
            )}
          </div>

          <div className="mt-3 flex gap-3 md:gap-0 justify-between items-center flex-wrap">
            <div className="flex w-full md:w-[33%] flex-col">
              <span className="font-semibold text-sm white">
                {arrivalCity} to {departureCity}
              </span>
              <span className="text-sm">{airlineName}</span>
            </div>

            <div className="w-full md:w-[33%] flex flex-col items-start">
              <span className="text-sm">
                {flightDuration !== "No information" &&
                  (destinationsLength === 1
                    ? "Nonstop"
                    : `${destinationsLength} stop`)}
              </span>
              <span className="text-xs opacity-60">{flightDuration}</span>
            </div>

            <div className="w-full md:w-[33%] flex flex-col items-start">
              <span className="text-sm">
                {flightDirection === "D" ? "AMS" : cao} to{" "}
                {flightDirection === "A" ? "AMS" : ata}
              </span>
              <span className="text-xs opacity-60">AA 166</span>
            </div>
          </div>
        </div>

        <div className="page flex items-center gap-6 flex-1 justify-start md:justify-end overflow-x-scroll md:overflow-x-visible mt-4 md:mt-0">
          <div className="p-6 border rounded-lg w-[100px] h-[120px] flex flex-col items-center justify-center gap-4">
            <div className="text-lg font-semibold">${Math.floor(price)}</div>
            <div className="text-xs text-center whitespace-nowrap">Main</div>
          </div>
          <div className="p-6 border rounded-lg w-[100px] h-[120px] flex flex-col items-center justify-center gap-4">
            <div className="text-lg font-semibold">
              ${Math.floor(price * 1.5)}
            </div>
            <div className="text-xs text-center whitespace-nowrap">Economy</div>
          </div>
          <div className="p-6 border rounded-lg w-[100px] h-[120px] flex flex-col items-center justify-center gap-4">
            <div className="text-lg font-semibold">
              ${Math.floor(price * 2)}
            </div>
            <div className="text-xs text-center whitespace-nowrap">
              Comfort+
            </div>
          </div>
          <div className="p-6 border rounded-lg w-[100px] h-[120px] flex flex-col items-center justify-center gap-4">
            <div className="text-lg font-semibold">
              ${Math.floor(price * 2.5)}
            </div>
            <div className="text-xs text-center whitespace-nowrap">First</div>
          </div>
          <div className="p-6 border rounded-lg w-[100px] h-[120px] flex flex-col items-center justify-center gap-4">
            <div className="text-lg font-semibold">
              ${Math.floor(price * 3)}
            </div>
            <div className="text-xs text-center whitespace-nowrap">
              Delta One
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
