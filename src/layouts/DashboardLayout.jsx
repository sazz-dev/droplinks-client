import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import Icon from "../components/Shared/Icon";
import Logo from "/logo.svg";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import MenuItem from "../components/Sidebar/Menu/MenuItem";
import AdminMenu from "../components/Sidebar/Menu/AdminMenu";
import VolunteerMenu from "../components/Sidebar/Menu/VolunteerMenu";
import DonorMenu from "../components/Sidebar/Menu/DonorMenu";
import FundAddModal from "../components/Modal/FundAddModal";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { role, isRoleLoading } = useRole();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  let [isOpen, setIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleLogOut = () => {
    logOut().catch(console.log);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRequest(null);
  };

  if (isRoleLoading) return <LoadingSpinner />;

  return (
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-white shadow transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:shadow-none`}
      >
        <div className="h-full flex flex-col p-5 overflow-y-auto">
          {/* Logo */}
          <div className="border-b border-black/10 pb-3 flex justify-between items-center">
            <Link to="/">
              <img className="w-40" src={Logo} alt="logo" />
            </Link>
            <button
              className="lg:hidden text-xl"
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-6 pt-6 flex-1">
            <div>
              <h6 className="text-xs text-gray-500">MENU</h6>
              <nav className="mt-4 flex flex-col gap-2">
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

            <div>
              <h6 className="text-xs text-gray-500">PROFILE</h6>
              <nav className="mt-3 flex flex-col gap-2">
                <MenuItem
                  iconName="profile-outline"
                  label="Profile"
                  address="/dashboard/profile"
                />

                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl text-gray-600 hover:text-rose-500"
                >
                  <Icon name="logout-outline" />
                  Logout
                </button>
              </nav>
            </div>

            {/* Funding Card */}
            <div className="border rounded-3xl p-4 mt-auto">
              <h3 className="text-lg font-bold">Be Part of the Mission</h3>
              <p className="text-sm text-gray-600 mt-1">
                Let us know about your issues.
              </p>

              <button
                onClick={() => setIsOpen(true)}
                className="mt-3 flex items-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-2xl"
              >
                <Icon name="love-fill" />
                Give Fund
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <header className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-2xl"
          >
            ☰
          </button>

          <h3 className="text-lg font-semibold hidden sm:block">Dashboard</h3>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
              <Icon size={22} name="notification-fill" />
            </div>

            <div className="flex items-center gap-2">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={user?.photoURL || "/avatar.avif"}
                alt="user"
              />
              <div className="hidden sm:block">
                <h2 className="text-sm font-medium">
                  {user?.displayName || "Coming.."}
                </h2>
                <p className="text-xs text-gray-500 capitalize">{role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="flex-1 overflow-y-auto md:p-4">
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
