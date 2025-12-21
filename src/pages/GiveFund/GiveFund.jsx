import React from "react";
import Container from "../../components/Shared/Container";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Icon from "../../components/Shared/Icon";
import FundAddModal from "../../components/Modal/FundAddModal";
import useAuth from "../../hooks/useAuth";

const GiveFund = () => {
  const [requests, setRequests] = useState([]);

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

  //Funds Area
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
    console.log(fundInfo);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      fundInfo
    );

    // Redirect to Stripe
    window.location.href = res.data.url;
  };

  return (
    <>
      <Container>
        <section className="flex items-center my-50">
          {/* Graphics */}
          <div className="flex-1">
            <div className="flex flex-col gap-4 w-100 ">
              <h2 className="text-4xl font-semibold">
                Be Part of the Lifesaving Mission
              </h2>
              <p className="text-xl font-light text-black/70 ">
                Help us ensure to keep the platofrms smooth. Your contribution
                can encurage us.
              </p>
            </div>
            {/* Choose Fund Amount Area */}
            <div className="flex min-h-full">
              <div
                transition
                className="w-full max-w-md bg-white backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0  rounded-4xl"
              >
                {/* The Modal Contents */}
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3 mt-5"
                >
                  {/* Amount Selection */}
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {presetAmounts.map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => {
                            setAmount(val);
                            setCustomAmount("");
                          }}
                          className={`py-3 text-md cursor-pointer  rounded-2xl border-2 transition-all ${
                            amount === val && !customAmount
                              ? "bg-[#F43F5E] border-[#F43F5E] text-white shadow-md"
                              : "border-gray-200 text-gray-600 hover:border-[#F43F5E] hover:bg-[#f43f5d14]"
                          }`}
                        >
                          ${val}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 text-xl  -translate-y-1/2 text-[#F43F5E]">
                        $
                      </span>
                      <input
                        type="number"
                        placeholder="Custom Amount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#f43f3f] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                  {/* Buttons */}
                  <div className="flex mt-2 gap-3 justify-around">
                    <button
                      type="submit"
                      className="w-full cursor-pointer inline-flex justify-center rounded-2xl  bg-[#F43F5E] px-4 py-3 text-lg font-medium text-white hover:bg-[#db3a55]"
                    >
                      Fund Now
                    </button>
                  </div>
                  <p className="text-center text-lg text-black/70">
                    Secured by <span className="text-[#F43F5E]">stripe</span>{" "}
                    payment
                  </p>
                </form>
              </div>
            </div>
          </div>
          {/* Funding Data */}
          <div className="flex-1">
            <h4 className="text-4xl text-center mb-10">Recent Donation</h4>
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-left border-b border-black/8 text-lg">
                  {["Donor Name", "Amount", "Date"].map((head) => (
                    <th
                      key={head}
                      className=" bg-[#F9FAFB] py-3 px-3 font-medium"
                    >
                      {head}
                    </th>
                  ))}
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
                    <td className="px-3 font-semibold text-[#16A34A]">
                      ${request.amountTotal}
                    </td>
                    <td className="px-3">{request.paymentDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Container>
    </>
  );
};

export default GiveFund;
