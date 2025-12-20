import React from "react";
import Icon from "../Shared/Icon";
import Button from "../Shared/Button/Button";
import { Link } from "react-router";

const BloodRequestsCard = ({ request }) => {
  const {
    _id,
    requesterName,
    recipientDistrict,
    recipientUpazila,
    requestMessage,
    donationDate,
  } = request || {};
  return (
    <div className="w-100 flex flex-col gap-4 p-5 bg-white rounded-4xl shadow-[0_5px_20px_2px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-medium">{requesterName}</h4>
        <span className="bg-[#F43F5E] text-white px-4 py-1 rounded-xl">A+</span>
      </div>
      <div className="flex gap-2 flex-col">
        <div className="flex items-center gap-2">
          <Icon className="text-[#F43F5E]" size={20} name="location-outline" />
          <h4 className="text-[#303030] font-light text-lg">
            {recipientDistrict} {recipientUpazila}{" "}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <Icon className="text-[#F43F5E]" size={20} name="event-outline" />
          <h4 className="text-[#303030] font-light text-lg">{donationDate}</h4>
        </div>
      </div>
      <p className="text-[#303030] font-light text-lg">{requestMessage}</p>
      <Link to={`/donation-requests/${_id}`}>
        <button className="bg-[#0E172A] hover:bg-[#F43F5E] w-full cursor-pointer py-3 text-white rounded-2xl">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default BloodRequestsCard;
