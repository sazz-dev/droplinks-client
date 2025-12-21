import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const FundAddModal = ({ closeModal, isOpen }) => {
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
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-60 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 bg-black/30  w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-4xl"
          >
            <DialogTitle>
              <div className="flex flex-col gap-2 items-center">
                <h3 className="text-2xl font-semibold text-center leading-6 text-gray-900">
                  Support Our Cause
                </h3>
                <p className="text-lg font-light text-black/70 mb-5">
                  Help us save lives with your donation.
                </p>
              </div>
            </DialogTitle>
            {/* The Modal Contents */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5">
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
                <button
                  type="button"
                  className="w-full cursor-pointer inline-flex justify-center rounded-2xl  bg-[#2c1f21] px-4 py-3 text-lg font-medium text-white  "
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
              <p className="text-center text-lg text-black/70">
                Secured by <span className="text-[#F43F5E]">stripe</span>{" "}
                payment
              </p>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default FundAddModal;
