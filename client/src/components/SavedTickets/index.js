import React, { useEffect, useCallback, useState } from "react";
import Item from "./item";

import { getSavedTickets } from "../../api";

import { useUser } from "../../context/UserContext";

import { Link } from "react-router-dom";

function SavedTickets() {
  const [flights, setFlights] = useState([]);
  const [userID] = useUser();

  // get the saved tickets
  const getTickets = useCallback(() => {
    getSavedTickets(userID).then((data) => {
      setFlights(data);
    });
  }, [userID]);

  useEffect(() => {
    getTickets();
  }, [getTickets]);

  const handleItemDelete = (id) => {
    setFlights((flights) => flights.filter((flight) => flight.flightID !== id));
  };

  return (
    <div className="w-full relative flex flex-col gap-4">
      {flights.length === 0 ? (
        <div className="text-red-500 text-sm">There are no flights recorded. Back to <Link to="/" className="text-blue-400 hover:text-blue-600">Home</Link></div>
      ) : (
        flights.map((flight) => {
          // Price'ı number formatına dönüştürme
          const priceAsNumber = parseFloat(flight.price.replace("$", ""));

          // Eğer price NaN olursa, bir default değer veya işlem yapabilirsiniz
          const priceToSend = isNaN(priceAsNumber) ? 0 : priceAsNumber;
          return (
            <Item
              key={flight.flightID}
              id={flight.flightID}
              flightDirection={flight.flightDirection}
              destinations={flight.destinations}
              departure={flight.departure}
              arrival={flight.arrival}
              ata={flight.ata}
              cao={flight.cao}
              price={priceToSend}
              flightDuration={flight.flightDuration}
              destinationsLength={flight.destinationsLength}
              arrivalCity={flight.arrivalCity}
              departureCity={flight.departureCity}
              airlineName={flight.airlineName}
              onDelete={handleItemDelete}
            />
          );
        })
      )}
    </div>
  );
}

export default SavedTickets;
