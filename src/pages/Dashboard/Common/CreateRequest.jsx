import React from "react";
import FormInput from "../../../components/Shared/FormInput";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Icon from "../../../components/Shared/Icon";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";

const CreateRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { districts, upazilas } = useLoaderData();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const selectedDistrictId = watch("recipientDistrict");
  
  const filteredUpazilas = upazilas.filter(
    (u) => u.district_id === selectedDistrictId
  );

  const onSubmit = async (data) => {
    try {
      const districtName = districts.find(
        (d) => d.id === data.recipientDistrict
      )?.name;
      const upazilaName = upazilas.find(
        (u) => u.id === data.recipientUpazila
      )?.name;

      const requestData = {
        ...data,
        recipientDistrict: districtName,
        recipientUpazila: upazilaName,
        bagCount: Number(data.bagCount),
        status: "Pending",
      };

      await axiosSecure.post("/donation-requests", requestData);
      toast.success("Blood Request Created");
      reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create request");
    }
  };

  // Time helpers
  const getToday = () => new Date().toISOString().slice(0, 10);
  const getNowTime = () => new Date().toTimeString().slice(0, 5);

  return (
    <section className="w-full sm:w-11/12 lg:w-8/12 mx-auto px-4 sm:px-0 flex flex-col gap-10 pb-5 mt-10 sm:mt-16 lg:mt-20">
      {/* ------------ Hero Section ------------ */}
      <div className="p-5 sm:p-8 lg:p-10 flex flex-col gap-8 rounded-4xl bg-linear-to-r from-[#DD2728] via-[#F43F5E] to-[#FB913C]">
        <div className="flex flex-col gap-3 text-white">
          <h6 className="text-sm sm:text-lg">SUPPORT NEED</h6>
          <h4 className="text-3xl sm:text-4xl lg:text-6xl font-bold">
            Request Blood Support
          </h4>
          <p className="text-sm sm:text-base lg:text-lg font-light">
            Share the essentials and we will alert nearby compatible donors
            immediately.
          </p>
        </div>

        {/* Hero Cards */}
        <div className="flex flex-col lg:flex-row gap-5">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 w-full rounded-2xl bg-white/20 text-white p-5"
            >
              <Icon size={32} name="event-outline" />
              <div>
                <p className="text-sm sm:text-lg font-light">Avg response</p>
                <h5 className="text-xl sm:text-2xl">15 min</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------ Form Section ------------ */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 sm:p-8 flex flex-col gap-8 rounded-4xl bg-white"
      >
        {/* Heading */}
        <div>
          <p className="text-sm sm:text-lg font-light text-black/70 pb-2">
            Submit a verified blood request
          </p>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Patient & Hospital Details
          </h3>
        </div>

        <div className="flex flex-col gap-12">
          {/* Recipient Details */}
          <div>
            <h4 className="text-lg sm:text-xl lg:text-2xl pb-3 font-light text-black/60 border-b border-black/10">
              Recipient Details
            </h4>

            <div className="mt-5 flex flex-col gap-10">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                <FormInput
                  label="Recipient Name"
                  id="recipientName"
                  name="recipientName"
                  type="text"
                  placeholder="Enter recipient name"
                  error={errors.recipientName}
                  register={register}
                  rules={{ required: "Recipient Name is required" }}
                />

                <FormInput
                  label="Hospital Name"
                  id="hospitalName"
                  name="hospitalName"
                  type="text"
                  placeholder="Enter hospital name"
                  error={errors.hospitalName}
                  register={register}
                  rules={{ required: "Hospital name is required" }}
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                <FormInput
                  label="Recipient District"
                  id="recipientDistrict"
                  name="recipientDistrict"
                  as="select"
                  placeholder="Select a District"
                  register={register}
                  rules={{ required: "District is required" }}
                  error={errors.recipientDistrict}
                  options={districts.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />

                <FormInput
                  label="Recipient Upazila"
                  id="recipientUpazila"
                  name="recipientUpazila"
                  as="select"
                  placeholder="Select an Upazila"
                  register={register}
                  rules={{ required: "Upazila is required" }}
                  error={errors.recipientUpazila}
                  options={filteredUpazilas.map((u) => ({
                    label: u.name,
                    value: u.id,
                  }))}
                  disabled={!selectedDistrictId}
                />
              </div>
            </div>
          </div>

          {/* Donation Details */}
          <div>
            <h4 className="text-lg sm:text-xl lg:text-2xl pb-3 font-light text-black/60 border-b border-black/10">
              Donation Details
            </h4>

            <div className="mt-5 flex flex-col gap-10">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                <FormInput
                  label="Blood Group"
                  id="bloodGroup"
                  name="bloodGroup"
                  as="select"
                  placeholder="Select a blood"
                  register={register}
                  rules={{ required: "Blood group is required" }}
                  error={errors.bloodGroup}
                  options={[
                    { label: "A+", value: "A+" },
                    { label: "A-", value: "A-" },
                    { label: "B+", value: "B+" },
                    { label: "B-", value: "B-" },
                    { label: "AB+", value: "AB+" },
                    { label: "AB-", value: "AB-" },
                    { label: "O+", value: "O+" },
                    { label: "O-", value: "O-" },
                  ]}
                />

                <FormInput
                  label="Full Address Line"
                  id="addressLine"
                  name="addressLine"
                  type="text"
                  placeholder="Enter donation location full address"
                  error={errors.addressLine}
                  register={register}
                  rules={{ required: "Address Line is required" }}
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                <FormInput
                  label="Bag Needed"
                  id="bagCount"
                  name="bagCount"
                  as="select"
                  register={register}
                  rules={{ required: "Bag count is required" }}
                  error={errors.bagCount}
                  options={[
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                    { label: "4", value: "4" },
                    { label: "5", value: "5" },
                    { label: "6", value: "6" },
                  ]}
                />

                <FormInput
                  label="Donation Date"
                  id="donationDate"
                  name="donationDate"
                  type="date"
                  defaultValue={getToday()}
                  error={errors.donationDate}
                  register={register}
                  rules={{ required: "Donation Date is required" }}
                />

                <FormInput
                  label="Donation Time"
                  id="donationTime"
                  name="donationTime"
                  type="time"
                  defaultValue={getNowTime()}
                  error={errors.donationTime}
                  register={register}
                  rules={{ required: "Donation Time is required" }}
                />
              </div>

              <FormInput
                label="Request Message"
                id="requestMessage"
                name="requestMessage"
                as="textarea"
                rows="4"
                placeholder="Write your request message here"
                error={errors.requestMessage}
                register={register}
              />
            </div>
          </div>

          {/* Requester Details */}
          <div className="p-5 bg-[#F6F6F6] rounded-2xl">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              <FormInput
                label="Requester Name"
                id="requesterName"
                name="requesterName"
                type="text"
                defaultValue={user?.displayName}
                readOnly={true}
                icon="lock-outline"
                register={register}
                error={errors.requesterName}
              />

              <FormInput
                label="Requester Email"
                id="requesterEmail"
                name="requesterEmail"
                type="email"
                defaultValue={user?.email}
                readOnly={true}
                icon="lock-outline"
                register={register}
                error={errors.requesterEmail}
              />
            </div>

            <p className="pt-5 text-sm sm:text-lg font-light text-center">
              Auto-filled from your account
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="cursor-pointer bg-[#F43F5E] text-white py-3 rounded-2xl w-full"
          >
            Submit your request
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateRequest;
