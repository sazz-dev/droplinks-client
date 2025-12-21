import React from "react";
import Icon from "../../../components/Shared/Icon";

const AdminStatistics = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {/* Counter */}
      <div className="bg-white w-full p-5 rounded-4xl">
        <div className="bg-[#f43f5d1c] mb-5 p-4 rounded-full w-15 h-15 flex justify-center items-center text-[#F43F5E]">
          <Icon name="love-fill" />
        </div>
        <h3 className="text-4xl font-semibold">12,354</h3>
        <div className="mt-2">
          <h4 className="text-2xl font-medium text-[#F43F5E]">Total Users</h4>
          <p className="text-lg font-light">
            Total registered donors & volunteers
          </p>
        </div>
      </div>
      <div className="bg-white w-full p-5 rounded-4xl">
        <div className="bg-[#f43f5d1c] mb-5 p-4 rounded-full w-15 h-15 flex justify-center items-center text-[#F43F5E]">
          <Icon name="wallet-fill" />
        </div>
        <h3 className="text-4xl font-semibold">$12,450</h3>
        <div className="mt-2">
          <h4 className="text-2xl font-medium text-[#F43F5E]">Total Funding</h4>
          <p className="text-lg font-light">Donations collected via Stripe</p>
        </div>
      </div>
      <div className="bg-white w-full p-5 rounded-4xl">
        <div className="bg-[#f43f5d1c] mb-5 p-4 rounded-full w-15 h-15 flex justify-center items-center text-[#F43F5E]">
          <Icon name="blood-fill" />
        </div>
        <h3 className="text-4xl font-semibold">1,234</h3>
        <div className="mt-2">
          <h4 className="text-2xl font-medium text-[#F43F5E]">
            Total Requests
          </h4>
          <p className="text-lg font-light">All requests across the system</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
