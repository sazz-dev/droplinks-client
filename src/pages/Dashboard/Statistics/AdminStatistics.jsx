import React, { useEffect, useState } from "react";
import Icon from "../../../components/Shared/Icon";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunding: 0,
    totalRequests: 0,
  });

  useEffect(() => {
    axiosSecure.get("/admin-stats").then((res) => {
      setStats({
        totalUsers: res.data.totalUsers || 0,
        totalFunding: res.data.totalFunding || 0,
        totalRequests: res.data.totalRequests || 0,
      });
    });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-5 lg:gap-8">
      {/* Total Users */}
      <div className="bg-white w-full p-4 sm:p-5 rounded-4xl">
        <div className="bg-[#f43f5d1c] mb-4 sm:mb-5 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-14 sm:h-14 flex justify-center items-center text-[#F43F5E]">
          <Icon name="love-fill" />
        </div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {stats.totalUsers.toLocaleString()}
        </h3>
        <div className="mt-2">
          <h4 className="text-lg sm:text-xl lg:text-2xl font-medium text-[#F43F5E]">
            Total Users
          </h4>
          <p className="text-sm sm:text-base lg:text-lg font-light">
            Total registered donors & volunteers
          </p>
        </div>
      </div>

      {/* Total Funding */}
      <div className="bg-white w-full p-4 sm:p-5 rounded-4xl">
        <div className="bg-[#f43f5d1c] mb-4 sm:mb-5 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-14 sm:h-14 flex justify-center items-center text-[#F43F5E]">
          <Icon name="wallet-fill" />
        </div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          ${stats.totalFunding.toLocaleString()}
        </h3>
        <div className="mt-2">
          <h4 className="text-lg sm:text-xl lg:text-2xl font-medium text-[#F43F5E]">
            Total Funding
          </h4>
          <p className="text-sm sm:text-base lg:text-lg font-light">
            Donations collected via Stripe
          </p>
        </div>
      </div>

      {/* Total Requests */}
      <div className="bg-white w-full p-4 sm:p-5 rounded-4xl">
        <div className="bg-[#f43f5d1c] mb-4 sm:mb-5 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-14 sm:h-14 flex justify-center items-center text-[#F43F5E]">
          <Icon name="blood-fill" />
        </div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {stats.totalRequests.toLocaleString()}
        </h3>
        <div className="mt-2">
          <h4 className="text-lg sm:text-xl lg:text-2xl font-medium text-[#F43F5E]">
            Total Requests
          </h4>
          <p className="text-sm sm:text-base lg:text-lg font-light">
            All requests across the system
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
