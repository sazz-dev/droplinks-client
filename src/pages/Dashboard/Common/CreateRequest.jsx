import React from "react";
import FormInput from "../../../components/Shared/FormInput";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Icon from "../../../components/Shared/Icon";
import axios from "axios";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";

const CreateRequest = () => {
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
      // Convert district/upazila IDs to names //
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

      const { data: response } = await axios.post(
        `${import.meta.env.VITE_API_URL}/donation-requests`,
        requestData
      );

      toast.success("Blood Request Created");
      reset();
      console.log(response);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create request");
      console.error(err);
    }
  };

  // Time
  const getToday = () => new Date().toISOString().slice(0, 10);
  const getNowTime = () => new Date().toTimeString().slice(0, 5);

  return (
    <section className="w-8/12 mx-auto flex flex-col gap-10  pb-5 mt-20">
      <div className="p-10 flex flex-col  gap-8 rounded-4xl bg-linear-to-r  from-[#DD2728] via-[#F43F5E] to-[#FB913C]">
        {/* ------------ Hero Section  ------------ */}
        <div className="flex flex-col gap-3 text-white">
          <h6 className="text-xl ">SUPPORT NEED</h6>
          <h4 className="text-6xl font-bold">Request Blood Support</h4>
          <p className="text-lg font-light">
            Share the essentials and we will alert nearby compatible donors
            immediately.
          </p>
        </div>
        {/* Hero Small Card */}
        <div className=" flex justify-between gap-5 items-center ">
          {/* Avg Response */}
          <div className="flex items-center gap-4 w-full rounded-2xl bg-white/20 text-white p-5">
            <Icon size={40} name={"event-outline"} />
            <div>
              <p className="text-lg font-light">Avg response</p>
              <h5 className="text-2xl">15 min</h5>
            </div>
          </div>
          {/* Avg Response */}
          <div className="flex items-center gap-4 w-full rounded-2xl bg-white/20 text-white p-5">
            <Icon size={40} name={"event-outline"} />
            <div>
              <p className="text-lg font-light">Avg response</p>
              <h5 className="text-2xl">15 min</h5>
            </div>
          </div>
          {/* Avg Response */}
          <div className="flex items-center gap-4 w-full rounded-2xl bg-white/20 text-white p-5">
            <Icon size={40} name={"event-outline"} />
            <div>
              <p className="text-lg font-light">Avg response</p>
              <h5 className="text-2xl">15 min</h5>
            </div>
          </div>
        </div>
      </div>

      {/* ------------ Forms Section  ------------ */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 flex flex-col gap-8 rounded-4xl bg-white"
      >
        {/* Top Heading */}
        <div>
          <p className="text-xl font-light text-[#000000a4] pb-2">
            Submit a verified blood request
          </p>
          <h3 className="text-4xl font-semibold">Patient & Hospital Details</h3>
        </div>
        {/* Forms */}
        <div className="flex flex-col gap-12">
          {/* ------------ Recipient Details ------------ */}
          <div>
            <h4 className="text-2xl pb-3 font-light text-[#000000a4] border-b-2 border-[#00000014]">
              Recipient Details
            </h4>
            <div className="mt-5 flex flex-col gap-10">
              <div className="flex gap-10">
                <FormInput
                  label="Recipient Name"
                  id="recipientName"
                  name="recipientName"
                  type="text"
                  placeholder="Enter recipient name"
                  error={errors.recipientName}
                  register={register}
                  rules={{
                    required: "Recipient Name is required",
                    maxLength: {
                      value: 20,
                      message: "Name can not be 20",
                    },
                  }}
                />
                <FormInput
                  label="Hospital Name"
                  id="hospitalName"
                  name="hospitalName"
                  type="text"
                  placeholder="Enter hospital name"
                  error={errors.hospitalName}
                  register={register}
                  rules={{
                    required: "Hospital name is required",
                  }}
                />
              </div>
              {/* District and Upazila */}
              <div className="flex gap-10">
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
                  placeholder="Select a Upazila"
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
            <h4 className="text-2xl pb-3 font-light text-[#000000a4] border-b-2 border-[#00000014]">
              Donation Details
            </h4>
            <div className="mt-5 flex flex-col gap-10">
              {/* Blood group and bag */}
              <div className="flex gap-10">
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
                    { label: "B-+", value: "B-+" },
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
                  placeholder="Enter donation loacation full address"
                  error={errors.addressLine}
                  register={register}
                  rules={{
                    required: "Address Line is required",
                  }}
                />
              </div>
              {/* Address and Donation Date */}

              <div className="flex gap-10">
                <FormInput
                  label="Bag Needed"
                  id="bagCount"
                  name="bagCount"
                  as="select"
                  placeholder="Select a blood"
                  register={register}
                  rules={{ required: "Category is required" }}
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
                  placeholder="Enter your name"
                  defaultValue={getToday()}
                  error={errors.donationDate}
                  register={register}
                  rules={{
                    required: "Donation Date is required",
                  }}
                />

                <FormInput
                  label="Donation Time"
                  id="donationTime"
                  name="donationTime"
                  type="time"
                  placeholder="Time"
                  defaultValue={getNowTime()}
                  error={errors.donationTime}
                  register={register}
                  rules={{
                    required: "Donation Date is required",
                  }}
                />
              </div>
              <div className="w-full">
                <FormInput
                  label="Request Message"
                  id="requestMessage"
                  name="requestMessage"
                  type="text"
                  placeholder="Write your request message here"
                  error={errors.requestMessage}
                  register={register}
                  as="textarea"
                  rows="4"
                />
              </div>
            </div>
          </div>
          {/* Requester Details */}
          <div className="p-5 bg-[#F6F6F6] rounded-2xl">
            <div className="flex gap-10">
              <FormInput
                label="Requester Name"
                id="requesterName"
                name="requesterName"
                type="text"
                defaultValue={user?.displayName}
                readOnly
                icon="lock-outline"
                placeholder="Write your request message here"
                error={errors.requesterName}
                register={register}
              />
              <FormInput
                label="Requester Email"
                id="requesterEmail"
                name="requesterEmail"
                icon="lock-outline"
                type="email"
                defaultValue={user?.email}
                readOnly
                placeholder="Write your request message here"
                error={errors.requesterEmail}
                register={register}
              />
            </div>
            <p className="pt-5 text-lg font-light text-center">
              Auto-filled from your account
            </p>
          </div>
          {/* Button */}
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
