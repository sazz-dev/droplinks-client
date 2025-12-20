import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      // Fetch
      axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, { sessionId });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
        Icon
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>
        <a
          href="/dashboard"
          className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
