import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import Icon from "../components/Shared/Icon";
import Logo from "/logo.svg";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };
  const menuNav = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: <Icon name={"dashboard-outline"} />,
    },
    {
      label: "Create Request",
      to: "/dashboard/create-request",
      icon: <Icon name={"createrequest-outline"} />,
    },
    {
      label: "All Blood Requests",
      to: "/",
      icon: <Icon name={"bloods-outline"} />,
    },
    {
      label: "Funding",
      to: "/",
      icon: <Icon name={"wallet-outline"} />,
    },
    {
      label: "Manage Users",
      to: "/dashboard/manage-users",
      icon: <Icon name={"wallet-outline"} />,
    },
  ];
  const generalNav = [
    {
      label: "Profile",
      to: "/dashboard/profile",
      icon: <Icon name={"profile-outline"} />,
    },
    {
      label: "Logout",
      action: handleLogOut,

      icon: <Icon name={"logout-outline"} />,
    },
  ];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed bg-white w-64 h-screen shadow ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } lg:translate-x-0 lg:static p-5`}
      >
        <div className="w-full border-b-2 border-[#F0F0F0] pb-4 flex justify-between items-center">
          <Link to={"/"}>
            <img className="w-50" src={Logo} alt="" />
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            X
          </button>
        </div>
        {/* Navigation Bar */}
        <div className="flex flex-col gap-4 w-full pt-4 bg-white rounded-md">
          {/* Menu Nav */}
          <div>
            <h6 className="text-sm  text-gray-500">MENU</h6>
            <ul className="flex flex-col mt-2 gap-2">
              {menuNav.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/dashboard"} // add `end` for exact dashboard match (or set per-item)
                    className={({ isActive }) =>
                      `w-full font-light cursor-pointer text-[#606060] flex items-center gap-2 px-4 py-2 rounded-2xl
                      ${
                        isActive
                          ? "font-medium bg-[#F43F5E] text-[#ffffff]"
                          : "hover:text-[#F43F5E]"
                      }`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* GENERAL Nav */}
          <div>
            <h6 className="text-sm  text-gray-500">PROFILE</h6>
            <ul className="flex flex-col mt-2 gap-2">
              {generalNav.map((item) => (
                <li key={item.label}>
                  {item.to ? (
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `w-full font-light cursor-pointer text-[#606060] flex items-center gap-2 px-4 py-2 rounded-2xl
          ${
            isActive
              ? "font-medium bg-[#F43F5E] text-[#ffffff]"
              : "hover:text-[#F43F5E]"
          }`
                      }
                      onClick={() => setSidebarOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  ) : (
                    <button
                      onClick={() => {
                        item.action();
                        setSidebarOpen(false);
                      }}
                      className="w-full text-left font-light cursor-pointer text-[#606060] flex items-center gap-2 px-4 py-2 rounded-2xl hover:text-[#F43F5E]"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen">
        <header className="bg-white flex justify-between p-4 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-xl font-bold lg:hidden"
          >
            ☰{" "}
          </button>
          <h3>Dashboard</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full justify-center items-center bg-[#F5F5F5]">
              <img src="" alt="" />
            </div>
            <div className="flex items-center gap-2">
              <img
                className="rounded-full w-12 h-12 cursor-pointer object-cover"
                src={user?.photoURL || "/avatar.avif"}
                referrerPolicy="no-referrer"
                alt="user"
              />

              <div className="flex flex-col ">
                <h2 className="text-md font-medium">
                  {user?.displayName || "Coming.."}
                </h2>
                <p className="text-sm text-gray-600">Admin</p>
              </div>
            </div>
          </div>
        </header>
        <section className="flex-1 overflow-y-auto scrollbar-hide p-4 scroll-smooth">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
