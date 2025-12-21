import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import Icon from "../components/Shared/Icon";
import Logo from "/logo.svg";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import MenuItem from "../components/Sidebar/Menu/MenuItem";
import AdminMenu from "../components/Sidebar/Menu/AdminMenu";
import VolunteerMenu from "../components/Sidebar/Menu/VolunteerMenu";
import DonorMenu from "../components/Sidebar/Menu/DonorMenu";
import FundAddModal from "../components/Modal/FundAddModal";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { role, isRoleLoading } = useRole();

  // Modal Fund
  let [isOpen, setIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRequest(null);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex  bg-gray-100 h-screen overflow-hidden">
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
        <div className="flex  flex-col gap-4 w-full pt-4 bg-white rounded-md">
          {/* Menu Nav */}
          <div>
            <h6 className="text-sm  text-gray-500">MENU</h6>
            <nav className="flex flex-col mt-4 gap-2">
              <MenuItem
                iconName="dashboard-outline"
                label="Dashboard"
                address="/dashboard"
              />
              {role === "admin" && <AdminMenu />}
              {role === "volunteer" && <VolunteerMenu />}
              {role === "donor" && <DonorMenu />}
            </nav>
          </div>

          {/* GENERAL Nav */}
          <div>
            <h6 className="text-sm  text-gray-500">PROFILE</h6>
            <nav className="flex flex-col mt-2 gap-2">
              <MenuItem
                iconName="profile-outline"
                label="Profile"
                address="/dashboard/profile"
              />

              <button
                onClick={handleLogOut}
                className="flex  items-center gap-2 rounded-2xl px-4 py-2 transform cursor-pointer text-[#606060] hover:text-[#F43F5E]"
              >
                <Icon className="" name="logout-outline" /> Logout
              </button>
            </nav>
          </div>
        </div>
        {/* Funding Card */}
        <div className="flex flex-col gap-2 border w-full rounded-4xl mt-5 p-5">
          <h3 className="text-2xl font-bold">Be Part of the Mission</h3>
          <p>Let us know about your issues.</p>

          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="flex gap-2 rounded-2xl cursor-pointer bg-[#F43F5E] text-white px-4 py-2"
          >
            <Icon name="love-fill" /> Give Fund
          </button>
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
            <div className="w-12 h-12 cursor-pointer rounded-full flex justify-center items-center bg-[#F5F5F5]">
              <Icon size={25} name="notification-fill" />
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
      <FundAddModal
        isOpen={isOpen}
        closeModal={closeModal}
        request={selectedRequest}
      />
    </div>
  );
};

export default DashboardLayout;
