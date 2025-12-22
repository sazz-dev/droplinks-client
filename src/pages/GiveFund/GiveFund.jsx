import React from "react";
import Container from "../../components/Shared/Container";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const GiveFund = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/funds`)
      .then((response) => setRequests(response.data))
      .catch((error) => console.error(error));
  }, []);

  const { user } = useAuth();
  const [amount, setAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState("");
  const presetAmounts = [10, 25, 50, 100];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalAmount = customAmount ? Number(customAmount) : amount;
    if (!finalAmount || finalAmount < 1) return;

    const fundInfo = {
      name: user?.displayName,
      email: user?.email,
      amount: finalAmount,
      image: user?.photoURL,
    };

    const res = await axiosSecure.post(`/create-checkout-session`, fundInfo);
    window.location.href = res.data.url;
  };

  return (
    <Container>
      <section className="flex flex-col lg:flex-row gap-12 my-16 items-start">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl lg:text-4xl font-semibold">
              Be Part of the Lifesaving Mission
            </h2>
            <p className="text-lg text-black/70">
              Help us keep the platform running smoothly. Your contribution
              encourages us.
            </p>
          </div>

          {/* Fund Box */}
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Preset Amounts */}
              <div className="grid grid-cols-4 gap-3">
                {presetAmounts.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      setAmount(val);
                      setCustomAmount("");
                    }}
                    className={`py-3 rounded-xl border-2 text-base transition-all ${
                      amount === val && !customAmount
                        ? "bg-[#F43F5E] border-[#F43F5E] text-white shadow"
                        : "border-gray-200 text-gray-600 hover:border-[#F43F5E] hover:bg-[#f43f5d14]"
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#F43F5E]">
                  $
                </span>
                <input
                  type="number"
                  placeholder="Custom Amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f43f5e] outline-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#F43F5E] text-white py-3 rounded-xl text-lg font-medium hover:bg-[#db3a55]"
              >
                Fund Now
              </button>

              <p className="text-center text-sm text-black/60">
                Secured by <span className="text-[#F43F5E]">Stripe</span> payment
              </p>
            </form>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 w-full">
          <h4 className="text-3xl text-center mb-6">Recent Donations</h4>

          <div className="overflow-x-auto bg-white rounded-3xl shadow-sm">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="bg-[#F9FAFB] border-b text-left">
                  {["Donor Name", "Amount", "Date"].map((head) => (
                    <th key={head} className="py-3 px-4 font-medium">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr
                    key={request._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-4 px-4 flex items-center gap-3 font-medium">
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={request.payerImage}
                        alt=""
                      />
                      {request.payerName}
                    </td>
                    <td className="px-4 font-semibold text-green-600">
                      ${request.amountTotal}
                    </td>
                    <td className="px-4 text-gray-600">
                      {request.paymentDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default GiveFund;
