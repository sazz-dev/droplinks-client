import { useState } from "react";
import Icon from "../../../components/Shared/Icon";
import RoleUpdateModal from "../../../components/Modal/RoleUpdateModal";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageUsers = () => {
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [roleRequest, setRoleRequest] = useState(null);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/users`);
      return result.data;
    },
  });
  console.log(users);

  const closeModal = () => {
    setIsRoleOpen(false);
    setRoleRequest(null);
  };

  const roleStyles = {
    admin: "bg-[#C0D1FF] uppercase text-black/70",
    donor: "bg-[#A9EFFF] uppercase text-black/70",
    volunteer: "bg-[#A9F7E8] uppercase text-black/70",
  };

  const statusStyles = {
    active: "bg-[#A9FFD8] uppercase text-black/70",
    blocked: "bg-[#FFA9A9] uppercase text-black/70",
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
            {users.map((user, index) => (
              <tr
                key={index}
                className="border-b border-black/5 hover:bg-gray-50 text-lg"
              >
                <td className="py-4 px-3 flex items-center gap-2 font-medium text-[#383c45]">
                  <img
                    className="w-14 h-14 rounded-full"
                    src={user.image}
                    alt=""
                  />
                  {user.name}
                </td>

                <td className="px-3 text-[#565D6A]">{user.email}</td>

                <td className="px-3">
                  <span
                    className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                      roleStyles[user.role]
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-3">
                  <span
                    className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                      statusStyles[user.status]
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* ===== ACTION MENU ===== */}
                <td className="px-3 text-center relative">
                  <button
                    onClick={() => {
                      setRoleRequest();
                      setIsRoleOpen(true);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-black/50 rounded-lg"
                  >
                    <Icon size={30} name="three-dots-circle" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden px-5">
        {users.map((item, index) => (
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
              onClick={() => {
                setRoleRequest();
                setIsRoleOpen(true);
              }}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
            >
              <Icon size={30} name="three-dots-circle" />
            </button>
          </div>
        ))}
      </div>
      <RoleUpdateModal
        isOpen={isRoleOpen}
        closeModal={closeModal}
        request={roleRequest}
      />
    </div>
  );
};

export default ManageUsers;
