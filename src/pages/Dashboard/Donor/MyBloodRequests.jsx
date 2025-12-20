import Icon from "../../../components/Shared/Icon";
import RequestDetailsModal from "../../../components/Modal/RequestDetailsModal";
import { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";

/* ================= STYLES ================= */

const statusStyles = {
  Pending: "bg-[#FFEEA9] text-black/70",
  "In progress": " bg-[#bfe5ff] text-black/70",
  Done: "bg-[#A9FFD8] text-black/70",
  Canceled: " bg-[#FFA9A9] text-black/70",
};

const MyBloodRequests = () => {
  const { user } = useAuth();
  let [isOpen, setIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRequest(null);
  };

  // Data get
  const {
    data: requests,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["requests", user?.email],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/my-donation-requests/${user?.email}`
      );
      console.log(result);
      return result.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <LoadingSpinner />;

  return (
    <div className="md:w-11/12 mx-auto bg-white  rounded-4xl py-7 md:mt-10">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 px-5 md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-lg md:text-2xl font-medium text-gray-900">
          All Blood Donation Requests
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <select className="border border-[#F4F0F0] rounded-2xl px-3 py-3 text-lg">
            <option>All Requests</option>
          </select>

          <div className="relative">
            <input
              type="text"
              placeholder="Search Request..."
              className="border placeholder:text-[#868B94] border-[#F4F0F0] rounded-2xl pl-10 pr-4 py-3 text-lg w-full"
            />
            <span className="absolute left-3 top-4 text-[#868B94]">
              <Icon name="search-outline" />
            </span>
          </div>
        </div>
      </div>

      {/* ================= TABLE (DESKTOP ONLY) ================= */}
      <div className="hidden lg:block h-[70vh] overflow-y-auto">
        <table className="w-full text-sm whitespace-nowrap">
          {/* ===== STICKY HEADER ===== */}
          <thead>
            <tr className="text-left text-lg text-[#282828]">
              <th className="sticky top-0 z-30 bg-[#F9FAFB] shadow-sm py-3 px-3 font-medium">
                Recipient
              </th>
              <th className="sticky top-0 z-30 bg-[#F9FAFB] shadow-sm py-3 px-3 font-medium">
                Location
              </th>
              <th className="sticky top-0 z-30 bg-[#F9FAFB] shadow-sm py-3 px-3 font-medium">
                Blood Group
              </th>
              <th className="sticky top-0 z-30 bg-[#F9FAFB] shadow-sm py-3 px-3 font-medium">
                Date & Time
              </th>
              <th className="sticky top-0 z-30 bg-[#F9FAFB] shadow-sm py-3 px-3 font-medium">
                Status
              </th>
              <th className="sticky top-0 z-30 bg-[#F9FAFB] shadow-sm py-3 px-3 font-medium">
                Requester
              </th>
              <th className="sticky top-0 z-30 bg-[#F9FAFB] shadow-sm py-3 px-3 font-medium text-center">
                Action
              </th>
            </tr>
          </thead>

          {/* ===== TABLE BODY ===== */}
          <tbody>
            {requests.map((request) => (
              <tr
                key={request._id}
                className="border-b border-black/5 hover:bg-gray-50 text-lg"
              >
                <td className="py-4 px-3 font-medium text-[#383c45]">
                  {request.recipientName}
                </td>

                <td className="px-3 text-[#565D6A]">
                  {request.recipientDistrict} {request.recipientUpazila}
                </td>

                <td className="px-3">
                  <span className="bg-[#F43F5E] text-white px-3 py-2 rounded-lg text-sm font-semibold">
                    {request.bloodGroup}
                  </span>
                </td>

                <td className="px-3 text-[#565D6A]">{request.donationDate}</td>

                <td className="px-3">
                  <span
                    className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                      statusStyles[request.status] ||
                      "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>

                <td className="px-3 text-[#565D6A]">{request.requesterName}</td>

                <td className="px-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedRequest(request);
                        setIsOpen(true);
                      }}
                      className="p-2 text-teal-600 cursor-pointer hover:bg-teal-50 rounded-lg"
                    >
                      <Icon name="eye-fill" />
                    </button>
                    <button className="p-2 text-green-600 cursor-pointer hover:bg-green-50 rounded-lg">
                      <Icon name="edit-fill" />
                    </button>
                    <button className="p-2 text-red-600 cursor-pointer hover:bg-red-50 rounded-lg">
                      <Icon name="trash-fill" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE / TABLET CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden px-5">
        {requests.map((request) => (
          <div
            key={request._id}
            className="border border-black/5 rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">
                  {request.recipientName}
                </p>
                <p className="text-sm text-gray-500">{request.addressLine}</p>
              </div>

              <span className="bg-[#F43F5E] text-white px-3 py-1 rounded-lg text-sm font-semibold">
                {request.bloodGroup}
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-2">{request.donationDate}</p>
            <p className="text-sm text-gray-500">
              Requester: {request.requesterName}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold }`}
              >
                ADMIN
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedRequest(request);
                    setIsOpen(true);
                  }}
                  className="p-2 bg-teal-50 text-teal-600 rounded-lg"
                >
                  <Icon name="eye-fill" />
                </button>
                <button className="p-2 bg-green-50 text-green-600 rounded-lg">
                  <Icon name="edit-fill" />
                </button>
                <button className="p-2 bg-red-50 text-red-600 rounded-lg">
                  <Icon name="trash-fill" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <RequestDetailsModal
        isOpen={isOpen}
        closeModal={closeModal}
        request={selectedRequest}
      />
    </div>
  );
};

export default MyBloodRequests;
