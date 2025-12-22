import Icon from "../../../components/Shared/Icon";
import RequestDetailsModal from "../../../components/Modal/RequestDetailsModal";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import BloodRequestStatusModal from "../../../components/Modal/BloodRequestStatusModal";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import useRole from "../../../hooks/useRole";
import EditBloodRequestModal from "../../../components/Modal/EditBloodRequestModal";

const AllBloodRequests = () => {
  const { role, isRoleLoading } = useRole();
  const axiosSecure = useAxiosSecure();
  // Details Modal
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [detailsRequest, setDetailsRequest] = useState(null);
  // Status Modal
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [statusRequest, setStatusRequest] = useState(null);
  // Edite Modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editRequest, setEditRequest] = useState(null);
  // Close Modal
  const closeModal = () => {
    setIsDetailsOpen(false);
    setDetailsRequest(null);
    setIsStatusOpen(false);
    setStatusRequest(null);
    setIsEditOpen(false);
    setEditRequest(null);
  };

  const {
    data: requests,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const result = await axiosSecure(`/donation-requests`);
      return result.data;
    },
  });

  const queryClient = useQueryClient();

  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      await axiosSecure.patch("/donation-requests", {
        id: requestId,
        status: newStatus,
      });
      toast.success("Status Updated");
      queryClient.invalidateQueries(["requests"]);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const handleDeleteRequest = async (requestId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axiosSecure.delete(`/donation-requests/${requestId}`);
      queryClient.invalidateQueries(["requests"]);
      toast.success("Request deleted");
    } catch (err) {
      toast.error("Failed to delete request", err);
    }
  };

  const handleDone = (requestId) => handleUpdateStatus(requestId, "Done");
  const handleCancel = (requestId) => handleUpdateStatus(requestId, "Canceled");

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <LoadingSpinner />;
  if (isRoleLoading) return <LoadingSpinner />;

  const statusStyles = {
    Pending: "bg-[#FFEEA9] text-black/70",
    "In Progress": " bg-[#bfe5ff] text-black/70",
    Done: "bg-[#A9FFD8] text-black/70",
    Canceled: " bg-[#FFA9A9] text-black/70",
  };

  return (
    <div className="md:w-11/12 mx-auto bg-white rounded-4xl py-7 md:mt-10">
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
                  {request.recipientDistrict}, {request.recipientUpazila}
                </td>
                <td className="px-3">
                  <span className="bg-[#F43F5E] text-white px-3 py-2 rounded-lg text-sm font-semibold">
                    {request.bloodGroup}
                  </span>
                </td>
                <td className="px-3 text-[#565D6A]">
                  {request.donationDate}🕘{request.donationTime}
                </td>
                <td className="px-3">
                  <span
                    onClick={() => {
                      setStatusRequest(request);
                      setIsStatusOpen(true);
                    }}
                    className={`px-3 py-2 cursor-pointer rounded-lg text-sm font-semibold ${
                      statusStyles[request.status] ||
                      "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-3 text-[#565D6A]">{request.requesterName}</td>

                {/* ------------- Dynamic Actions ------------- */}
                <td className="px-3">
                  <div className="flex justify-center gap-2">
                    {request.status === "In Progress" ? (
                      <>
                        <button
                          onClick={() => handleDone(request._id)}
                          className="px-4 py-3 flex justify-center items-center bg-[#A9FFD8] cursor-pointer text-black/80 rounded-lg"
                        >
                          <Icon size={15} name="check-fill" />
                        </button>

                        <button
                          onClick={() => handleCancel(request._id)}
                          className="flex justify-center items-center px-4 py-3 bg-[#FFA9A9] text-black/80 cursor-pointer rounded-lg"
                        >
                          <Icon size={15} name="close-fill" />
                        </button>
                      </>
                    ) : role === "admin" ? (
                      <>
                        {/* View Button */}
                        <button
                          onClick={() => {
                            setDetailsRequest(request);
                            setIsDetailsOpen(true);
                          }}
                          className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg"
                        >
                          <Icon name="eye-fill" />
                        </button>
                        {/* Edite Button */}
                        <button
                          onClick={() => {
                            setEditRequest(request);
                            setIsEditOpen(true);
                          }}
                          className="p-2 cursor-pointer text-green-600 hover:bg-green-50 rounded-lg"
                        >
                          <Icon name="edit-fill" />
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteRequest(request._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Icon name="trash-fill" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setDetailsRequest(request);
                          setIsDetailsOpen(true);
                        }}
                        className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg"
                      >
                        <Icon name="eye-fill" />
                      </button>
                    )}
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
              <span className="px-2 py-1 rounded-full text-xs font-semibold">
                ADMIN
              </span>
              <div className="flex gap-2">
                {request.status === "In Progress" ? (
                  <>
                    <button
                      onClick={() => handleDone(request._id)}
                      className="p-2 bg-green-50 text-green-600 rounded-lg"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => handleCancel(request._id)}
                      className="p-2 bg-red-50 text-red-600 rounded-lg"
                    >
                      Cancel
                    </button>
                  </>
                ) : role === "admin" ? (
                  <>
                    <button
                      onClick={() => {
                        setDetailsRequest(request);
                        setIsDetailsOpen(true);
                      }}
                      className="p-2 bg-teal-50 text-teal-600 rounded-lg"
                    >
                      <Icon name="eye-fill" />
                    </button>
                    <button className="p-2 bg-green-50 text-green-600 rounded-lg">
                      <Icon name="edit-fill" />
                    </button>
                    <button
                      onClick={() => handleDeleteRequest(request._id)}
                      className="p-2 bg-red-50 text-red-600 rounded-lg"
                    >
                      <Icon name="trash-fill" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setDetailsRequest(request);
                      setIsDetailsOpen(true);
                    }}
                    className="p-2 bg-teal-50 text-teal-600 rounded-lg"
                  >
                    <Icon name="eye-fill" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <RequestDetailsModal
        isOpen={isDetailsOpen}
        closeModal={closeModal}
        request={detailsRequest}
      />
      <BloodRequestStatusModal
        isOpen={isStatusOpen}
        closeModal={closeModal}
        request={statusRequest}
      />
      <EditBloodRequestModal
        isOpen={isEditOpen}
        closeModal={closeModal}
        request={editRequest}
      />
    </div>
  );
};

export default AllBloodRequests;
