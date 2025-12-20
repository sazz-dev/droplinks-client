import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import Icon from "../Shared/Icon";
import LoadingSpinner from "../Shared/LoadingSpinner";

const BloodRequestsDetails = () => {
  const { id } = useParams();
  const {
    data: request = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["request", id],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/donation-requests/${id}`
      );
      return result.data;
    },
  });
  const {
    recipientName,
    bloodGroup,
    hospitalName,
    donationDate,
    addressLine,
    recipientDistrict,
    recipientUpazila,
    requestMessage,
    requesterName,
    requesterEmail,
  } = request;

  if (isLoading) return <LoadingSpinner />;
  return (
    <section>
      <div className="min-h-screen  flex items-center justify-center p-4">
        <div className="md:w-9/12 max-w-4xl bg-white rounded-4xl p-6 sm:p-8">
          <div className="flex justify-between mb-8 pb-4 items-end border-b-2 border-black/10">
            <h3 className="text-2xl font-medium ">Donation Request Details</h3>
          </div>

          {/* Header Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500">Recipient Name</p>
              <p className="font-semibold text-lg">{recipientName}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-md text-black/60">Blood Group</p>
              <span className="inline-block w-fit mt-1 px-4 py-2 text-sm font-semibold text-white bg-rose-500 rounded-lg">
                {bloodGroup}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-md text-black/60">Hospital Name</p>
              <p className="font-semibold flex gap-1 items-center">
                <Icon className="text-[#F43F5E]" name="hospital-outline" />{" "}
                {hospitalName}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-md text-black/60">Donation Time</p>

              <p className="font-semibold flex gap-1 items-center">
                <Icon className="text-[#F43F5E]" name="event-outline" />{" "}
                {donationDate}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className=" flex flex-col gap-2 mt-6">
            <p className="text-md text-black/60">Full Address</p>
            <p className="flex   gap-1 items-center">
              <Icon className="text-[#F43F5E]" name="location-outline" />{" "}
              {addressLine}
            </p>
          </div>

          {/* Location Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col gap-2">
              <p className="text-md text-black/60">District</p>
              <p className="font-semibold">{recipientDistrict}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-md text-black/60">Upazila</p>
              <p className="font-semibold">{recipientUpazila}</p>
            </div>
          </div>

          {/* Request Message */}
          <div className="mt-6">
            <p className="text-md text-black/60">Request Message</p>
            <p className="font-light text-black/70 leading-relaxed mt-1">
              {requestMessage}
            </p>
          </div>

          {/* Requester Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div>
              <p className="text-sm text-gray-500">Requester Name</p>
              <p className="font-semibold">{requesterName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{requesterEmail}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-center">
            <button className="w-full cursor-pointer bg-rose-500 hover:bg-rose-600 transition text-white font-semibold py-3 rounded-xl">
              Donate Now
            </button>
            <p className="text-md font-light w-85 text-center text-black/60 mt-2">
              Make sure you contact with requester number before click “Donate
              Now”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BloodRequestsDetails;
