import React from "react";
import Container from "../../components/Shared/Container";
import SearchDonorsCard from "../../components/SearchDonorsCard";

const SearchDonors = () => {
  return (
    <Container>
      <section className="my-18 flex flex-col gap-10">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-xl text-[#F43F5E]">Donors</h2>
          <h3 className="text-5xl font-semibold">Find Blood Donors</h3>
          <p className="text-[#424242] text-lg font-light">
            Search donors by location and blood type.
          </p>
        </div>
        <div className="w-fit mx-auto grid grid-cols-3 gap-8">
          <SearchDonorsCard />
        </div>
      </section>
    </Container>
  );
};

export default SearchDonors;
