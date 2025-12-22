import React from "react";
import Icon from "./Shared/Icon";
import avaterImg from "/avatar.avif";

const SearchDonorsCard = ({ donor }) => {
  return (
    <div className="w-full flex flex-col gap-4 p-5 bg-white justify-center items-center rounded-4xl shadow-[0_5px_20px_2px_rgba(0,0,0,0.05)]">
      {/* Header */}
      <div className="w-full flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h4 className="text-2xl font-medium">{donor.name}</h4>
          <span className="bg-[#F43F5E] text-white px-4 py-1 rounded-xl w-fit">
            {donor.bloodGroup}
          </span>
        </div>

        {/* Avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
          <img
            src={donor.image || avaterImg}
            alt={donor.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Location */}
      <div className="w-full flex items-center gap-2">
        <Icon className="text-[#F43F5E]" size={20} name="location-outline" />
        <p className="text-[#303030] font-light text-lg">
          {donor.district}, {donor.upazila}
        </p>
      </div>

      {/* Button */}
      <button className="text-[#F43F5E] text-lg border-2 border-[#F43F5E] hover:bg-[#f43f5d17] w-full cursor-pointer py-3 rounded-2xl transition">
        See More
      </button>
    </div>
  );
};

export default SearchDonorsCard;
