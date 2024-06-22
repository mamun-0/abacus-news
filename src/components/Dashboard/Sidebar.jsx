import { Link, NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

export function Sidebar() {
  const [toggle, setToggle] = useState(false);

  function toggleValue() {
    setToggle(!toggle);
  }

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <RxHamburgerMenu
        onClick={toggleValue}
        className={`text-3xl ml-3 mt-3 font-bold  md:hidden cursor-pointer ${
          toggle ? "text-red-600" : ""
        }`}
      />

      {/* Sidebar */}
      <div
        className={`transform transition-transform duration-1000 ease-in-out ${
          toggle
            ? "block opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full"
        } absolute z-10 w-52 md:relative md:translate-x-0 md:opacity-100 md:block bg-gray-800`}
      >
        <Link to="/dashboard" className="block text-center text-white font-semibold md:text-xl bg-orange-400 p-2">
          DASHBOARD
        </Link>
        <ul className="md:text-lg text-center divide-y-2">
          <li>
            <NavLink
              to="/dashboard/users"
              className="block w-full hover:bg-blue-500 p-1 md:p-2 bg-blue-600"
            >
              All Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/articles"
              className="block w-full hover:bg-blue-500 p-1 md:p-2 bg-blue-600"
            >
              All Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/publisher"
              className="block w-full hover:bg-blue-500 p-1 md:p-2 bg-blue-600"
            >
              Add Publisher
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="block w-full hover:bg-blue-500 p-1 md:p-2 bg-blue-600"
            >
              Back to Home
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
