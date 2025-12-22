import Icon from "../../../components/Shared/Icon";
import RequestDetailsModal from "../../../components/Modal/RequestDetailsModal";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import BloodRequestStatusModal from "../../../components/Modal/BloodRequestStatusModal";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import EditBloodRequestModal from "../../../components/Modal/EditBloodRequestModal";
import { Link } from "react-router";

const DonorStatistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [detailsRequest, setDetailsRequest] = useState(null);
  const [statusRequest, setStatusRequest] = useState(null);

  // Edite Modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editRequest, setEditRequest] = useState(null);

  const closeModal = () => {
    setIsDetailsOpen(false);
    setIsStatusOpen(false);
    setDetailsRequest(null);
    setStatusRequest(null);
    //edit
    setIsEditOpen(false);
    setEditRequest(null);
  };

  // Fetch user-specific requests
  const {
    data: requests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["requests", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/my-donation-requests`);
      return result.data;
    },
  });

  // Update request status
  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      await axiosSecure.patch("/donation-requests", {
        id: requestId,
        status: newStatus,
      });
      toast.success("Status Updated");
      queryClient.invalidateQueries(["requests", user?.email]);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  // Delete request
  const handleDeleteRequest = async (requestId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axiosSecure.delete(`/donation-requests/${requestId}`);
      toast.success("Request deleted");
      queryClient.invalidateQueries(["requests", user?.email]);
    } catch (err) {
      toast.error("Failed to delete request", err);
    }
  };

  const handleDone = (requestId) => handleUpdateStatus(requestId, "Done");
  const handleCancel = (requestId) => handleUpdateStatus(requestId, "Canceled");

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <LoadingSpinner />;

  const statusStyles = {
    Pending: "bg-[#FFEEA9] text-black/70",
    "In Progress": "bg-[#bfe5ff] text-black/70",
    Done: "bg-[#A9FFD8] text-black/70",
    Canceled: "bg-[#FFA9A9] text-black/70",
  };

  // 3 Recet Request
  const recentRequests = [...requests]
    .sort((a, b) => {
      const dateA = new Date(`${a.donationDate}T${a.donationTime}`);
      const dateB = new Date(`${b.donationDate}T${b.donationTime}`);
      return dateB - dateA;
    })
    .slice(0, 3);

  return (
    <section>
      {/* Recent Request */}
      <div>
        {requests.length > 0 ? (
          <div>
            <div className="mx-auto bg-white rounded-4xl md:mt-10">
              {/* TABLE DESKTOP */}
              <div className="hidden lg:block  rounded-4xl overflow-y-auto">
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
                    {recentRequests.map((request) => (
                      <tr
                        key={request._id}
                        className="border-b border-black/5 hover:bg-gray-50 text-lg"
                      >
                        <td className="py-4 px-3 font-medium text-[#383c45]">
                          {request.recipientName}
                        </td>
                        <td className="px-3 text-[#565D6A]">
                          {request.recipientDistrict},{request.recipientUpazila}
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
                        <td className="px-3 text-[#565D6A]">
                          {request.requesterName}
                        </td>
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
                            ) : (
                              <>
                                <button
                                  onClick={() => {
                                    setDetailsRequest(request);
                                    setIsDetailsOpen(true);
                                  }}
                                  className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg"
                                >
                                  <Icon name="eye-fill" />
                                </button>
                                <button
                                  onClick={() => {
                                    setEditRequest(request);
                                    setIsEditOpen(true);
                                  }}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                                >
                                  <Icon name="edit-fill" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteRequest(request._id)
                                  }
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                  <Icon name="trash-fill" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE / TABLET */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden px-5">
                {recentRequests.map((request) => (
                  <div
                    key={request._id}
                    className="border border-black/5 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {request.recipientName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {request.addressLine}
                        </p>
                      </div>
                      <span className="bg-[#F43F5E] text-white px-3 py-1 rounded-lg text-sm font-semibold">
                        {request.bloodGroup}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {request.donationDate}
                    </p>
                    <p className="text-sm text-gray-500">
                      Requester: {request.requesterName}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold">
                        ADMIN
                      </span>
                      <div className="flex gap-2">
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

            <Link
              to="/dashboard/my-blood-requests"
              className="mt-6 inline-block px-6 py-3 bg-[#F43F5E] text-white rounded-lg transition"
            >
              View All My Requests
            </Link>
          </div>
        ) : (
          <div className="text-center py-10 text-black/50 text-2xl">
            <p>You have not made any donation requests yet.</p>
          </div>
        )}
      </div>
      {/* New Cards */}
    </section>
  );
};

export default DonorStatistics;
