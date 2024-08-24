import React from "react";
import {  NavLink } from "react-router-dom";


const NavBar = () => {
  return (
    <div className=" my-2 flex justify-between items-center w-full h-14 border-b-2 border-slate-200">
      <NavLink to="/">
        <h1 className="font-Amsterdam font-extrabold tracking-wider text-[40px] p-7">
          PinCrash
        </h1>
      </NavLink>
    </div>
  );
};

export default NavBar;
