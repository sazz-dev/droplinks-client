import { useState } from "react";
import Icon from "../../../components/Shared/Icon";
import FundAddModal from "../../../components/Modal/FundAddModal";
import { useEffect } from "react";
import axios from "axios";

const Funding = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [requests, setRequests] = useState([]);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  let [isOpen, setIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRequest(null);
  };

  // Total funds
  const totalFunds = requests.reduce((sum, request) => {
    return sum + Number(request.amountTotal); // make sure it's a number
  }, 0);

  // Fetch Data
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/funds`)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(requests);

  return (
    <section className="md:w-11/12 mx-auto bg-white rounded-4xl md:mt-10">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 px-10 pt-10 md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex flex-col gap-2">
          <h5 className="text-2xl">Total Funds Raised</h5>
          <h2 className="text-lg md:text-4xl font-bold text-[#F43F5E]">
            ${totalFunds.toLocaleString()}
          </h2>
          <p className="text-lg text-[#565D6A]">Collected </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="flex gap-2 rounded-2xl cursor-pointer bg-[#F43F5E] text-white px-6 py-3"
          >
            <Icon name="love-fill" /> Give Fund
          </button>

          <div className="flex gap-3">
            <select className="border border-[#F4F0F0] rounded-2xl px-3 py-3 text-lg">
              <option>Highest Amount</option>
              <option>Lowest Amount</option>
              <option>Latest</option>
            </select>

            <div className="relative">
              <input
                type="text"
                placeholder="Search donors..."
                className="border border-[#F4F0F0] rounded-2xl pl-10 pr-4 py-3 text-lg"
              />
              <span className="absolute left-3 top-4 text-[#868B94]">
                <Icon name="search-outline" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden lg:block h-[70vh] overflow-y-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="text-left border-b border-black/8 text-lg">
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
                className="border-b border-black/8 cursor-pointer hover:bg-gray-50 text-lg"
              >
                <td className="py-4 flex items-center gap-2 px-3 font-medium">
                  <img
                    className="w-10 object-fill h-10 rounded-full"
                    src={request.payerImage}
                    alt=""
                  />
                  {request.payerName}{" "}
                </td>
                <td className="px-3 text-[#565D6A]">{request.payerEmail}</td>
                <td className="px-3 font-semibold text-[#16A34A]">
                  ${request.amountTotal}
                </td>
                <td className="px-3">{request.paymentDate}</td>
                <td className="px-3 text-[#6B7280]">{request.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden px-5">
        {requests.map((request) => (
          <div key={request._id} className="border rounded-lg p-4 relative">
            <p className="font-semibold">{request.donorName}</p>
            <p className="text-sm text-gray-500">{request.email}</p>

            <div className="mt-3 space-y-1 text-sm">
              <p>
                <strong>Amount:</strong> {request.amountTotal}
              </p>
              <p>
                <strong>Date:</strong> {request.paymentDate}
              </p>
              <p>
                <strong>Txn:</strong> {request.transactionId}
              </p>
            </div>

            <button
              onClick={() => toggleMenu(request)}
              className="absolute top-4 right-4"
            >
              <Icon size={28} name="three-dots-circle" />
            </button>
          </div>
        ))}
      </div>
      <FundAddModal
        isOpen={isOpen}
        closeModal={closeModal}
        request={selectedRequest}
      />
    </section>
  );
};

export default Funding;
