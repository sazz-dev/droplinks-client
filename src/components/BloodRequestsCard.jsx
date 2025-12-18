import React from "react";
import Icon from "./Shared/Icon";
import Button from "./Shared/Button/Button";

const BloodRequestsCard = () => {
  return (
    <div className="w-100 flex flex-col gap-4 p-5 bg-white rounded-4xl shadow-[0_5px_20px_2px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-medium">Sarah Ahmed</h4>
        <span className="bg-[#F43F5E] text-white px-4 py-1 rounded-xl">A+</span>
      </div>
      <div className="flex gap-2 flex-col">
        <div className="flex items-center gap-2">
          <Icon className="text-[#F43F5E]" size={20} name="location-outline" />
          <h4 className="text-[#303030] font-light text-lg">Dhaka, Mirpur</h4>
        </div>
        <div className="flex items-center gap-2">
          <Icon className="text-[#F43F5E]" size={20} name="event-outline" />
          <h4 className="text-[#303030] font-light text-lg">Today, 3:45 PM</h4>
        </div>
      </div>
      <p className="text-[#303030] font-light text-lg">
        Urgent need for blood donation due to surgery. Patient is in critical
        condition...
      </p>
      <button className="bg-[#0E172A] hover:bg-[#F43F5E] w-full cursor-pointer py-3 text-white rounded-2xl">
        View Details
      </button>
    </div>
  );
};

export default BloodRequestsCard;
