import { useState, useEffect } from "react";
import Icon from "../../../components/Shared/Icon";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";

const Funding = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  // Total funds
  const totalFunds = requests.reduce((sum, request) => {
    return sum + Number(request.amountTotal);
  }, 0);

  // Fetch Data
  useEffect(() => {
    axiosSecure
      .get(`/funds`)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <section className="w-full md:w-11/12 mx-auto bg-white rounded-4xl mt-6 md:mt-10 px-4 sm:px-6 md:px-0">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-6 px-2 sm:px-6 md:px-10 pt-6 md:pt-10 md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex flex-col gap-2">
          <h5 className="text-lg sm:text-2xl">Total Funds Raised</h5>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#F43F5E]">
            ${totalFunds.toLocaleString()}
          </h2>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <select className="border border-[#F4F0F0] rounded-2xl px-3 py-2 sm:py-3 text-sm sm:text-lg w-full sm:w-auto">
              <option>Highest Amount</option>
              <option>Lowest Amount</option>
              <option>Latest</option>
            </select>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search donors..."
                className="border border-[#F4F0F0] rounded-2xl pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-lg w-full"
              />
              <span className="absolute left-3 top-2.5 sm:top-4 text-[#868B94]">
                <Icon name="search-outline" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden lg:block h-[70vh] overflow-y-auto overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="text-left border-b border-black/8 text-base lg:text-lg">
              {["Donor Name", "Email", "Amount", "Date", "Transaction ID"].map(
                (head) => (
                  <th
                    key={head}
                    className="sticky top-0 bg-[#F9FAFB] py-3 px-3 font-medium"
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr
                key={request._id}
                className="border-b border-black/8 cursor-pointer hover:bg-gray-50 text-base lg:text-lg"
              >
                <td className="py-4 flex items-center gap-2 px-3 font-medium">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={request.payerImage}
                    alt=""
                  />
                  {request.payerName}
                </td>
                <td className="px-3 text-[#565D6A]">{request.payerEmail}</td>
                <td className="px-3 font-semibold text-[#16A34A]">
                  ${request.amountTotal}
                </td>
                <td className="px-3">{request.paymentDate}</td>
                <td className="px-3 text-[#6B7280] break-all">
                  {request.transactionId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden px-2 sm:px-5 pb-6">
        {requests.map((request) => (
          <div
            key={request._id}
            className="border border-black/10 rounded-lg p-4 relative"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{request.payerName}</p>
                <p className="text-xs sm:text-sm text-gray-500 break-all">
                  {request.payerEmail}
                </p>
              </div>
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={request.payerImage}
                alt=""
              />
            </div>

            <div className="mt-3 space-y-1 text-xs sm:text-sm">
              <p>
                <strong>Amount:</strong>{" "}
                <span className="text-[#16A34A] font-semibold">
                  ${request.amountTotal}
                </span>
              </p>
              <p>
                <strong>Date:</strong> {request.paymentDate}
              </p>
              <p className="break-all">
                <strong>Txn:</strong> {request.transactionId}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Funding;
