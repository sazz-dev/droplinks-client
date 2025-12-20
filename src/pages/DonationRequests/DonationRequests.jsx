import React from "react";
import BloodRequestsCard from "../../components/BloodRequests/BloodRequestsCard";
import Container from "../../components/Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const DonationRequests = () => {
  const {
    data: requests,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/donation-requests`
      );
      return result.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <LoadingSpinner />;

  return (
    <Container>
      <section className="my-18 flex flex-col gap-10">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-xl text-[#F43F5E]">Blood Needed</h2>
          <h3 className="text-5xl font-semibold">Urgent Blood Requests</h3>
          <p className="text-[#424242] text-lg font-light">
            People who need your help right now
          </p>
        </div>
        {requests && requests.length > 0 ? (
          <div className="w-fit mx-auto grid grid-cols-3 gap-8">
            {requests.map((request) => (
              <BloodRequestsCard key={request._id} request={request} />
            ))}
          </div>
        ) : (
          <h2>Data not found</h2>
        )}
      </section>
    </Container>
  );
};

export default DonationRequests;
