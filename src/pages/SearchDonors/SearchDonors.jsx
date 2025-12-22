import React, { useEffect, useState } from "react";
import Container from "../../components/Shared/Container";
import SearchDonorsCard from "../../components/SearchDonorsCard";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useLoaderData } from "react-router";
import { useForm } from "react-hook-form";
import FormInput from "../../components/Shared/FormInput";

const SearchDonors = () => {
  const { districts, upazilas } = useLoaderData();
  const axiosSecure = useAxiosSecure();

  // All donors
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  // Dynamic District and Upazila
  const selectedDistrictId = watch("district");

  // Reset Upazila when district changes
  useEffect(() => {
    setValue("upazila", "");
  }, [selectedDistrictId, setValue]);

  const filteredUpazilas = upazilas.filter(
    (u) => u.district_id.toString() === selectedDistrictId
  );

  // Fetch donors
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axiosSecure.get("/donors");
        setDonors(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDonors();
  }, [axiosSecure]);

  // Search button click handler
  const onSubmit = (data) => {
    setLoading(true);

    let result = donors;

    if (data.bloodGroup && data.bloodGroup !== "All Blood Group") {
      result = result.filter((d) => d.bloodGroup === data.bloodGroup);
    }

    if (data.district && data.district !== "All Districts") {
      result = result.filter(
        (d) =>
          d.district ===
          districts.find((district) => district.id.toString() === data.district)
            .name
      );
    }

    if (data.upazila && data.upazila !== "All Upazilas") {
      result = result.filter(
        (d) =>
          d.upazila ===
          upazilas.find((upazila) => upazila.id.toString() === data.upazila)
            .name
      );
    }

    setFilteredDonors(result);
    setLoading(false);
  };

  return (
    <Container>
      <section className="my-18 flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-xl text-[#F43F5E]">Donors</h2>
          <h3 className="text-5xl font-semibold">Find Blood Donors</h3>
          <p className="text-[#424242] text-lg font-light">
            Search donors by location and blood type.
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-5xl mx-auto flex gap-6 justify-center items-end mb-8"
        >
          <FormInput
            label="Blood Group"
            id="bloodGroup"
            name="bloodGroup"
            as="select"
            register={register}
            error={errors.bloodGroup}
            options={[
              { label: "All Blood Group", value: "All Blood Group" },
              { label: "A+", value: "A+" },
              { label: "A-", value: "A-" },
              { label: "B+", value: "B+" },
              { label: "B-", value: "B-" },
              { label: "O+", value: "O+" },
              { label: "O-", value: "O-" },
              { label: "AB+", value: "AB+" },
              { label: "AB-", value: "AB-" },
            ]}
          />

          <div className="w-full gap-4 flex justify-between">
            <FormInput
              label="District"
              id="district"
              name="district"
              as="select"
              placeholder="Select District"
              register={register}
              rules={{ required: "District is required" }}
              error={errors.district}
              options={[
                { label: "All Districts", value: "All Districts" },
                ...districts.map((d) => ({
                  label: d.name,
                  value: d.id.toString(),
                })),
              ]}
            />

            <FormInput
              label="Upazila"
              id="upazila"
              name="upazila"
              as="select"
              placeholder="Select Upazila"
              register={register}
              rules={{ required: "Upazila is required" }}
              error={errors.upazila}
              options={[
                { label: "All Upazilas", value: "All Upazilas" },
                ...filteredUpazilas.map((u) => ({
                  label: u.name,
                  value: u.id.toString(),
                })),
              ]}
              disabled={!selectedDistrictId}
            />
          </div>

          <button
            type="submit"
            className="bg-[#F43F5E] text-white px-6 py-3 rounded-2xl"
          >
            Search
          </button>
        </form>

        {/* Donors List */}
        {loading && <p className="text-center">Loading donors...</p>}

        {/* After Search if not data  */}
        {!loading && filteredDonors.length === 0 && donors.length > 0 && (
          <p className="text-center text-2xl text-black/60">
            No donors found for this search
          </p>
        )}

        {/* First View */}
        {!loading && filteredDonors.length === 0 && donors.length === 0 && (
          <p className="text-center text-2xl text-black/60">
            Fill the form and click Search to find donors
          </p>
        )}

        {!loading && filteredDonors.length > 0 && (
          <div className="w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredDonors.map((donor) => (
              <SearchDonorsCard key={donor._id} donor={donor} />
            ))}
          </div>
        )}
      </section>
    </Container>
  );
};

export default SearchDonors;
