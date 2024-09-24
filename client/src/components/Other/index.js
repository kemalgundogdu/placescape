import React from "react";
import carrental from "../../images/carrental.webp";
import hotels from "../../images/hotels.jpg";
import travel from "../../images/travel.webp";
import { LiaCarSolid, LiaHotelSolid, LiaUmbrellaBeachSolid } from "react-icons/lia";

function Other() {
  return (
    <div className="flex-1  flex flex-col gap-4 relative md:sticky top-0">
      <div className="relative overflow-hidden rounded-lg group">
        <img
          src={carrental}
          alt="car rentals"
          className="w-full h-[275px] rounded-lg group-hover:scale-110 transition-all object-cover"
        />
        <button className="absolute top-0 left-0 w-full h-full bg-orange-500 bg-opacity-40 z-20 rounded-lg text-white p-4 flex items-start justify-end flex-col group-hover:bg-opacity-20 transition-all text-xl">
          <LiaCarSolid size={36} />
          CAR RENTALS
        </button>
      </div>
      <div className="relative overflow-hidden rounded-lg group">
        <img
          src={hotels}
          alt="car rentals"
          className="w-full h-[275px] rounded-lg group-hover:scale-110 transition-all object-cover"
        />
        <button className="absolute top-0 left-0 w-full h-full bg-blue-500 bg-opacity-40 z-20 rounded-lg text-white p-4 flex items-start justify-end flex-col group-hover:bg-opacity-20 transition-all text-xl">
          <LiaHotelSolid size={36} />
          HOTELS
        </button>
      </div>
      <div className="relative overflow-hidden rounded-lg group">
        <img
          src={travel}
          alt="car rentals"
          className="w-full h-[275px] rounded-lg group-hover:scale-110 transition-all object-cover"
        />
        <button className="absolute top-0 left-0 w-full h-full bg-green-500 bg-opacity-40 z-20 rounded-lg text-white p-4 flex items-start justify-end flex-col group-hover:bg-opacity-20 transition-all text-xl">
          <LiaUmbrellaBeachSolid size={36} />
          TRAVEL PACKAGES
        </button>
      </div>
    </div>
  );
}

export default Other;
