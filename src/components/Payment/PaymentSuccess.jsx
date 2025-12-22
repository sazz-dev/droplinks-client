import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import Icon from "../Shared/Icon";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      // Fetch
      axiosSecure.post(`/payment-success`, { sessionId });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md flex items-center justify-center flex-col gap-4 w-full bg-white rounded-4xl p-8 text-center">
        <div className="p-5 bg-[#F43F5E] rounded-full">
          <Icon className="text-white" name="check-fill" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-[#F43F5E] text-white font-semibold rounded-2xl hover:bg-black transition-colors"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
