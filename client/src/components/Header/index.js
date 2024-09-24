import React, { useState } from "react";
import logo from '../../images/logo.png';
import person from '../../images/person1.jpg';
import { IoTicketSharp } from "react-icons/io5";
import { TiWorld } from "react-icons/ti";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative flex justify-between items-center mb-5">
      <NavLink to="/">
        <img src={logo} alt="plane scape" width={200}/>
      </NavLink>
      <nav className={`${isOpen ? 'flex' : 'hidden'} flex-col items-center justify-center fixed inset-0 bg-[#f6f4f8] z-40`}>
        <div className="absolute top-4 right-4">
          <button onClick={() => setIsOpen(false)} className={`${isOpen === false ? 'hidden' : 'inline-block'} absolute top-5 right-5 z-40 text-xs px-4 py-2 border rounded-lg bg-[#e9dcfe]`}>Close</button>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex items-center gap-1"><IoTicketSharp className="text-[#4B0097]" /> Deals</div>
          <div className="flex items-center gap-1"><TiWorld size={21} className="text-[#4B0097]" /> Discover</div>
          <NavLink onClick={() => setIsOpen(false)} to="/saved-tickets" className="flex items-center gap-1 hover:opacity-60 transition-all">
            <img src={person} alt="joane smith" className="rounded-full w-7 border-[1px] box-content border-purple-600" />  
            Joane Smith
          </NavLink>
        </div>
      </nav>
      <div className="gap-4 md:flex hidden">
        <div className="flex items-center gap-1"><IoTicketSharp className="text-[#4B0097]" /> Deals</div>
        <div className="flex items-center gap-1"><TiWorld size={21} className="text-[#4B0097]" /> Discover</div>
        <NavLink onClick={() => setIsOpen(false)} to="/saved-tickets" className="flex items-center gap-1 hover:opacity-60 transition-all">
          <img src={person} alt="joane smith" className="rounded-full w-7 border-[1px] box-content border-purple-600" />  
          Joane Smith
        </NavLink>
      </div>
      <button 
        className="md:hidden" 
        onClick={() => setIsOpen(true)}
      >
        <FaBars className="text-2xl text-[#4B0097]" />
      </button>
    </header>
  );
}

export default Header;