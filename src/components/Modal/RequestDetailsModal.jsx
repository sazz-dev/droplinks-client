import React from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import Icon from "../Shared/Icon";

const RequestDetailsModal = ({ closeModal, isOpen, request }) => {
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
  } = request || {};

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={closeModal}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-10" />

      {/* Modal wrapper */}
      <div className="fixed inset-0 z-20 flex items-center justify-center p-4 overflow-y-auto">
        <DialogPanel className="w-full sm:w-11/12 md:w-9/12 max-w-4xl bg-white rounded-4xl p-5 sm:p-8 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-black/10">
            <h3 className="text-lg sm:text-2xl font-medium">
              Donation Request Details
            </h3>
            <button
              type="button"
              onClick={closeModal}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-red-200 text-red-600 rounded-full text-lg font-medium"
            >
              ✕
            </button>
          </div>

          {/* Header Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500">Recipient Name</p>
              <p className="font-semibold text-base sm:text-lg">
                {recipientName}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm text-black/60">Blood Group</p>
              <span className="inline-block w-fit mt-1 px-4 py-2 text-sm font-semibold text-white bg-rose-500 rounded-lg">
                {bloodGroup}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm text-black/60">Hospital Name</p>
              <p className="font-semibold flex gap-1 items-center">
                <Icon className="text-[#F43F5E]" name="hospital-outline" />
                {hospitalName}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm text-black/60">Donation Time</p>
              <p className="font-semibold flex gap-1 items-center">
                <Icon className="text-[#F43F5E]" name="event-outline" />
                {donationDate}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1 mt-6">
            <p className="text-sm text-black/60">Full Address</p>
            <p className="flex gap-1 items-center text-sm sm:text-base">
              <Icon className="text-[#F43F5E]" name="location-outline" />
              {addressLine}
            </p>
          </div>

          {/* Location Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-black/60">District</p>
              <p className="font-semibold">{recipientDistrict}</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm text-black/60">Upazila</p>
              <p className="font-semibold">{recipientUpazila}</p>
            </div>
          </div>

          {/* Request Message */}
          <div className="mt-6">
            <p className="text-sm text-black/60">Request Message</p>
            <p className="font-light text-black/70 leading-relaxed mt-1 text-sm sm:text-base">
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
              <p className="text-sm text-gray-500">Requester Email</p>
              <p className="font-semibold break-all">{requesterEmail}</p>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default RequestDetailsModal;
