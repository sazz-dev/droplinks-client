import React, { useEffect, useState } from "react";
import Icon from "../../../components/Shared/Icon";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";

const VolunteerStatistics = () => {
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Total Funding */}
      <div className="bg-white w-full p-5 rounded-4xl">
        <div className="bg-[#f43f5d1c] mb-5 p-4 rounded-full w-15 h-15 flex justify-center items-center text-[#F43F5E]">
          <Icon name="wallet-fill" />
        </div>
        <h3 className="text-4xl font-semibold">
          ${stats.totalFunding.toLocaleString()}
        </h3>
        <div className="mt-2">
          <h4 className="text-2xl font-medium text-[#F43F5E]">Total Funding</h4>
          <p className="text-lg font-light">Donations collected via Stripe</p>
        </div>
      </div>

      {/* Total Requests */}
      <div className="bg-white w-full p-5 rounded-4xl">
        <div className="bg-[#f43f5d1c] mb-5 p-4 rounded-full w-15 h-15 flex justify-center items-center text-[#F43F5E]">
          <Icon name="blood-fill" />
        </div>
        <h3 className="text-4xl font-semibold">
          {stats.totalRequests.toLocaleString()}
        </h3>
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

export default VolunteerStatistics;
