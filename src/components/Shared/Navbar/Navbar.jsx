import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "/logo.svg";
import Button from "../Button/Button";
import Container from "../Container";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogOut = () => {
    logOut().catch(console.log);
    setOpen(false);
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/search-donors", label: "Search Donors" },
    { to: "/donation-requests", label: "Donation Requests" },
    { to: "#contact-us", label: "Contact Us" },
  ];

  const baseLink = "text-lg transition-colors duration-200";
  const linkActive = "text-[#F43F5E]";
  const linkInactive = "text-[#0E172A] font-light hover:text-black";

  return (
    <Container>
      <div className="bg-white my-6 rounded-2xl px-4 py-3">
        {/* ---------------- Navbar Header ---------------- */}
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-10" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
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

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            <Button label="Give Fund" outline to="/give-fund" />

            {user ? (
              <div
                onClick={() => setOpen(!open)}
                className="relative cursor-pointer"
              >
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={user.photoURL}
                  alt="user"
                />

                {open && (
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white shadow-xl p-2">
                    <Link to="/dashboard/profile">
                      <button className="w-full p-3 rounded-lg hover:bg-gray-100 text-left">
                        Profile
                      </button>
                    </Link>
                    <Link to="/dashboard">
                      <button className="w-full p-3 rounded-lg hover:bg-gray-100 text-left">
                        Dashboard
                      </button>
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="w-full p-3 rounded-lg hover:bg-gray-100 text-left"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button label="Login" to="/login" />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>

        {/* ---------------- Mobile Menu ---------------- */}
        {mobileMenu && (
          <div className="lg:hidden mt-6 space-y-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  `block ${baseLink} ${isActive ? linkActive : linkInactive}`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className=" pt-4 border-t border-black/12 space-y-3">
              <Button className="w-full" label="Give Fund" to="/give-fund" />
              {user ? (
                <Button
                  className="w-full"
                  outline
                  label="Log Out"
                  onClick={handleLogOut}
                />
              ) : (
                <Button className="w-full" label="Log In" to="/login" />
              )}

              {user ? (
                <div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <img
                      src={user.photoURL}
                      alt="user"
                      className="w-12 h-12 rounded-full object-cover "
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex mt-3 gap-2">
                    <Button className="w-full" label="Profile" outline />
                    <Button
                      className="w-full"
                      label="Dashboard"
                      to="/dashboard"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Navbar;
