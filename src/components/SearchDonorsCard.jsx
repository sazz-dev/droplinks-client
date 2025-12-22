import React from "react";
import Icon from "./Shared/Icon";
import avaterImg from "/avatar.avif";

const SearchDonorsCard = ({ donor }) => {
  return (
    <div className="w-100 flex flex-col gap-4 p-5 bg-white justify-center items-center rounded-4xl shadow-[0_5px_20px_2px_rgba(0,0,0,0.05)]">
      <div className="w-full flex justify-between">
        <div className="w-full flex flex-col items-start gap-2 ">
          <h4 className="text-2xl font-medium">{donor.name}</h4>
          <span className="bg-[#F43F5E] text-white px-4 py-1 rounded-xl">
            {donor.bloodGroup}
          </span>
        </div>
        <div>
          <img
            className="w-16 h-16  rounded-full"
            src={donor.image || avaterImg}
            alt={donor.name}
          />
        </div>
      </div>
      <div className="w-full flex gap-2 flex-col">
        <div className="flex items-center gap-2">
          <Icon className="text-[#F43F5E]" size={20} name="location-outline" />
          <h4 className="text-[#303030] font-light text-lg">
            {donor.district}, {donor.upazila}
          </h4>
        </div>
      </div>

      <button className="text-[#F43F5E] text-lg border-2 border-[#F43F5E] hover:bg-[#f43f5d17] w-full cursor-pointer py-3 rounded-2xl">
        See More
      </button>
    </div>
  );
};

export default SearchDonorsCard;
