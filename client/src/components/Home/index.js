import React from "react";
import Other from "../Other";
import Search from "../Search";
import FlightList from "../FlightList";
import Filter from "../Filter";

function Home() {
  return (
    <div className="flex items-start flex-wrap w-full gap-6">
      <div className="w-full lg:w-[75%] flex flex-col gap-6">
        <Search />
        <div className="flex gap-6 justify-between">
          <FlightList />
          <Filter />
        </div>
      </div>
      <Other />
    </div>
  );
}

export default Home;
