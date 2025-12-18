import React, { useState } from "react";
import RequestDetailsModal from "../../../components/Modal/RequestDetailsModal";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const Statistics = () => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      Statistics
      <button
        className="bg-black text-white p-3"
        onClick={() => setIsOpen(true)}
      >
        show
      </button>
      <RequestDetailsModal closeModal={closeModal} isOpen={isOpen} />

    </div>
  );
};

export default Statistics;
