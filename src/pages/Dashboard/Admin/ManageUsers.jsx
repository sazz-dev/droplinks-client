import { useState } from "react";
import Icon from "../../../components/Shared/Icon";

const requests = [
  {
    users: "Sarah Johnson",
    email: "sarah@gmail.com",
    role: "DONOR",
    status: "ACTIVE",
  },
  {
    users: "Sarah Johnson",
    email: "sarah@gmail.com",
    role: "ADMIN",
    status: "BLOCKED",
  },
  {
    users: "Sarah Johnson",
    email: "sarah@gmail.com",
    role: "VOLUNTEER",
    status: "ACTIVE",
  },
  {
    users: "Sarah Johnson",
    email: "sarah@gmail.com",
    role: "ADMIN",
    status: "BLOCKED",
  },
  {
    users: "Sarah Johnson",
    email: "sarah@gmail.com",
    role: "VOLUNTEER",
    status: "ACTIVE",
  },
  {
    users: "Sarah Johnson",
    email: "sarah@gmail.com",
    role: "ADMIN",
    status: "BLOCKED",
  },
  {
    users: "Sarah Johnson",
    email: "sarah@gmail.com",
    role: "VOLUNTEER",
    status: "ACTIVE",
  },
  {
    users: "Sarah Johnson",
    email: "sarah@gmail.com",
    role: "ADMIN",
    status: "BLOCKED",
  },
  {
    users: "Sarah Johnson",
    email: "sarah@gmail.com",
    role: "VOLUNTEER",
    status: "ACTIVE",
  },
  {
    users: "Sarah Johnson",
    email: "sarah@gmail.com",
    role: "ADMIN",
    status: "BLOCKED",
  },
  {
    users: "Sarah Johnson",
    email: "sarah@gmail.com",
    role: "VOLUNTEER",
    status: "ACTIVE",
  },
];

/* ================= STYLES ================= */

const roleStyles = {
  ADMIN: "bg-[#C0D1FF] text-black/70",
  DONOR: "bg-[#A9EFFF] text-black/70",
  VOLUNTEER: "bg-[#A9F7E8] text-black/70",
};

const statusStyles = {
  ACTIVE: "bg-[#A9FFD8] text-black/70",
  BLOCKED: "bg-[#FFA9A9] text-black/70",
};

const ManageUsers = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <div className="md:w-11/12 mx-auto bg-white rounded-4xl py-7 md:mt-10">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 px-5 md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-lg md:text-2xl font-medium text-gray-900">
          All Users
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <select className="border border-[#F4F0F0] rounded-2xl px-3 py-3 text-lg">
            <option>All Status</option>
            <option>Active</option>
            <option>Blocked</option>
          </select>

          <select className="border border-[#F4F0F0] rounded-2xl px-3 py-3 text-lg">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Donor</option>
            <option>Volunteer</option>
          </select>

          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="border placeholder:text-[#868B94] border-[#F4F0F0] rounded-2xl pl-10 pr-4 py-3 text-lg w-full"
            />
            <span className="absolute left-3 top-4 text-[#868B94]">
              <Icon name="search-outline" />
            </span>
          </div>
        </div>
      </div>

      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden lg:block h-[70vh] overflow-y-auto">
        <table className="w-full text-sm whitespace-nowrap">
          <thead>
            <tr className="text-left border-b border-black/15 text-lg text-[#282828]">
              <th className="sticky top-0 z-30 bg-[#F9FAFB] py-3 px-3 font-medium">
                Users
              </th>
              <th className="sticky top-0 z-30 bg-[#F9FAFB] py-3 px-3 font-medium">
                Email
              </th>
              <th className="sticky top-0 z-30 bg-[#F9FAFB] py-3 px-3 font-medium">
                Role
              </th>
              <th className="sticky top-0 z-30 bg-[#F9FAFB] py-3 px-3 font-medium">
                Status
              </th>
              <th className="sticky top-0 z-30 bg-[#F9FAFB] py-3 px-3 font-medium text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {requests.map((item, index) => (
              <tr
                key={index}
                className="border-b border-black/5 hover:bg-gray-50 text-lg"
              >
                <td className="py-4 px-3 font-medium text-[#383c45]">
                    
                  {item.users}
                </td>

                <td className="px-3 text-[#565D6A]">{item.email}</td>

                <td className="px-3">
                  <span
                    className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                      roleStyles[item.role]
                    }`}
                  >
                    {item.role}
                  </span>
                </td>

                <td className="px-3">
                  <span
                    className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                      statusStyles[item.status]
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* ===== ACTION MENU ===== */}
                <td className="px-3 text-center relative">
                  <button
                    onClick={() => toggleMenu(index)}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-black/50 rounded-lg"
                  >
                    <Icon size={30} name="three-dots-circle" />
                  </button>

                  {openMenu === index && (
                    <div className="flex flex-col absolute right-20 top-10 z-20 w-48 bg-white border border-black/10 rounded-xl shadow-lg">
                      <button className="w-full text-left rounded-xl  cursor-pointer  px-4 py-2 hover:bg-gray-50">
                        {item.status === "ACTIVE"
                          ? "Block user"
                          : "Unblock user"}
                      </button>

                      {item.role !== "VOLUNTEER" && (
                        <button className="w-full text-left rounded-xl  cursor-pointer  px-4 py-2 hover:bg-gray-50">
                          Make Volunteer
                        </button>
                      )}

                      {item.role !== "ADMIN" && (
                        <button className="w-full cursor-pointer rounded-xl  text-left px-4 py-2 hover:bg-gray-50">
                          Make Admin
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden px-5">
        {requests.map((item, index) => (
          <div
            key={index}
            className="border border-black/5 rounded-lg p-4 relative"
          >
            <p className="font-semibold text-gray-900">{item.users}</p>
            <p className="text-sm text-gray-500">{item.email}</p>

            <div className="flex gap-2 mt-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  roleStyles[item.role]
                }`}
              >
                {item.role}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  statusStyles[item.status]
                }`}
              >
                {item.status}
              </span>
            </div>

            <button
              onClick={() => toggleMenu(index)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
            >
              <Icon size={30} name="three-dots-circle" />
            </button>

            {openMenu === index && (
              <div className="absolute right-4 top-14 z-20 w-48 bg-white border border-black/10 rounded-xl shadow-lg">
                <button className="w-full text-left rounded-xl  px-4 py-2 hover:bg-gray-50">
                  {item.status === "ACTIVE" ? "Block user" : "Unblock user"}
                </button>
                <button className="w-full rounded-xl  text-left px-4 py-2 hover:bg-gray-50">
                  Make Volunteer
                </button>
                <button className="w-full rounded-xl  text-left px-4 py-2 hover:bg-gray-50">
                  Make Admin
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
