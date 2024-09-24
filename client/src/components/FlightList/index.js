import React, { useEffect, useCallback, useState } from "react";
import Item from "./item";
import { getTickets } from "../../api";
import { useFlight } from "../../context/FlightContext";
import { useFilter } from "../../context/FilterContext";

import { getAirline } from "../../api";

function FlightList() {
  const [flights, setFlights] = useFlight();
  const [sortby, , arrivalTimeFilter, , stopsFilter, , airlineFilter, , open, setOpen] = useFilter();

  const [airlineNames, setAirlineNames] = useState({});

  const sortFlights = useCallback((flights, sortby) => {
    if (sortby === "low-price") {
      return [...flights].sort((a, b) => getFlightPrice(a) - getFlightPrice(b));
    } else if (sortby === "high-price") {
      return [...flights].sort((a, b) => getFlightPrice(b) - getFlightPrice(a));
    }
    return flights;
  }, []);

  const getFlightPrice = (flight) => {
    const departure = new Date(flight.scheduleDateTime);
    const arrival = new Date(flight.estimatedLandingTime);
    if (isNaN(Date.parse(flight.estimatedLandingTime))) {
      return Infinity;
    } else {
      return parseInt(Math.abs((arrival - departure) / 1000 / 60 / 60) * 50);
    }
  };

  const filterByArrivalTime = (flights, arrivalTimeFilter) => {
    if (!arrivalTimeFilter) return flights;

    return flights.filter((flight) => {
      const arrival = new Date(flight.estimatedLandingTime);
      const hours = arrival.getHours();
      if (arrivalTimeFilter === "one-to-twelve") {
        return hours >= 0 && hours <= 11; // 00:00 - 11:59
      } else if (arrivalTimeFilter === "twelve-to-twelve") {
        return hours >= 12 && hours <= 24; // 12:00 - 23:59
      }

      return true;
    });
  };

  // Bu fonksiyon, sadece durak sayısına göre filtreleme yapar.
  const filterByStops = useCallback(
    (flights) => {
      if (!stopsFilter) return flights;

      return flights.filter((flight) => {
        const stopsCount = flight.route.destinations.length - 1; // Başlangıç noktası hariç, durak sayısı
        return stopsCount === parseInt(stopsFilter);
      });
    },
    [stopsFilter]
  );

  useEffect(() => {
    getTickets().then((data) => {
      let sortedFlights = sortFlights(data.flights, sortby);
      sortedFlights = filterByArrivalTime(sortedFlights, arrivalTimeFilter); // Zaman filtrelemesi
      setFlights(sortedFlights);
    });
  }, [sortby, arrivalTimeFilter, setFlights, sortFlights]);

  useEffect(() => {
    getTickets().then((data) => {
      let filteredFlights = data.flights;

      // Eğer stopsFilter belirlenmişse filtreleme uygulanır
      if (stopsFilter !== undefined && stopsFilter !== null) {
        filteredFlights = filterByStops(filteredFlights);
      }

      setFlights(filteredFlights);
    });
  }, [stopsFilter, setFlights, filterByStops]);

  useEffect(() => {
    const fetchAirlines = async () => {
      let newAirlineNames = { ...airlineNames };
      for (let flight of flights) {
        if (flight.prefixIATA && !newAirlineNames[flight.prefixIATA]) {
          try {
            const data = await getAirline(flight.prefixIATA);
            newAirlineNames[flight.prefixIATA] = data.publicName;
          } catch (error) {
            newAirlineNames[flight.prefixIATA] = "Error fetching airline";
          }
        }
      }
      setAirlineNames(newAirlineNames);
    };

    if (flights.length) {
      fetchAirlines();
    }
  }, [flights]);

  const handleClose = () => {
    setOpen(!open);
  }

  return (
    <div className="w-full relative md:w-[70%] flex flex-col gap-4">
      <button onClick={handleClose} className="block md:hidden px-3 py-2 border rounded-lg absolute right-0 bg-[#e9dcfe] hover:bg-transparent transition-all">Filter</button>
      <div className="spacer mb-10 block md:hidden"></div>
      {flights.length === 0 ? (
        <div className="text-red-500 text-sm">
          No flights available for the selected arrival time.
        </div>
      ) : (
        flights.map((flight) => {
          // airline information
          // get the airline name
          if (airlineFilter && airlineNames[flight.prefixIATA] !== airlineFilter) {
            return null; // Havayolu filtresine uymayan uçuşları gösterme
          }

          const departure = new Date(flight.scheduleDateTime);
          let arrival = new Date(flight.estimatedLandingTime);

          if (isNaN(Date.parse(flight.estimatedLandingTime))) {
            return "";
          }

          let price = "No information";
          let flightDurationControl = "No information";
          if (!isNaN(Date.parse(flight.estimatedLandingTime))) {
            price =
              "$" +
              parseInt(Math.abs((arrival - departure) / 1000 / 60 / 60) * 50);
            flightDurationControl = `${Math.floor(
              (arrival - departure) / 1000 / 60 / 60
            )}h ${Math.floor(
              (((arrival - departure) / 1000 / 60 / 60) % 1) * 60
            )}m`;
            if (price === "$0") {
              return "";
            }
          }

          // destinations length
          const destinationsLength = flight.route.destinations.length;

          return (
            <Item
              key={flight.id}
              id={flight.id}
              flightDirection={flight.flightDirection}
              destinations={flight.route.destinations}
              departure={departure}
              arrival={arrival}
              ata={flight.prefixIATA}
              cao={flight.prefixICAO}
              price={price}
              airlineName={airlineNames[flight.prefixIATA] || "Loading..."}
              flightDuration={flightDurationControl}
              destinationsLength={destinationsLength}
            />
          );
        })
      )}
    </div>
  );
}

export default FlightList;
