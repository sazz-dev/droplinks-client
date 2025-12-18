import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "/logo.svg";
import Button from "../Button/Button";
import Icon from "../Icon";
import Container from "../Container";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const [open, setOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  // Start Navigation
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Search Donors" },
    { to: "/coverage", label: "Donation Requests" },
    { to: "/about-us", label: "Contact Us" },
  ];

  const baseLink = " text-lg transition-colors duration-200";
  const linkActive = " text-[#F43F5E] px-4 py-2 rounded-full";
  const linkInactive = "text-[#0E172A]  font-light  hover:text-black";

  // Start Navigation

  return (
    <Container>
      <div className=" justify-between rounded-2xl flex items-center  bg-white my-8">
        <Link to={"/"}>
          <img src={Logo} alt="" />
        </Link>

        <nav className="flex  items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${baseLink} ${isActive ? linkActive : linkInactive}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        {/* --------------------- User State Management --------------------- */}
        <div className="z-11 flex gap-2">
          {user ? (
            <div
              onClick={() => setOpen(!open)}
              className="relative w-fit p-0.5 rounded-full"
            >
              <div className="rounded-full">
                <img
                  className="rounded-full w-10 h-10 cursor-pointer object-cover"
                  src={user.photoURL}
                  referrerPolicy="no-referrer"
                  alt="user"
                />
              </div>

              {open && (
                <div className=" absolute z-10 top-full left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 / rounded-2xl p-2 mx-auto mt-2 w-56 shadow-2xl bg-[#ffffff]">
                  <Link to="/dashboard/profile">
                    <button className="w-full hover:bg-[#0000000d] cursor-pointer rounded-lg flex gap-2 items-center  p-3">
                      Profile
                    </button>
                  </Link>
                  <Link to="/dashboard">
                    <button className="w-full hover:bg-[#0000000d] cursor-pointer rounded-lg   flex gap-2 items-center  p-3">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="w-full hover:bg-[#0000000d] cursor-pointer rounded-lg flex gap-2 items-center  p-3"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                label={"Fund Now"}
                outline={true}
                iconName="give-outline"
              />
              <Button
                className="w-35"
                label={"Login"}
                iconName="arrow-outline"
                iconPosition="right"
                to={"/login"}
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
