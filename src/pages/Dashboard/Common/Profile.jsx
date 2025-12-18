import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import FormInput from "../../../components/Shared/FormInput";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Icon from "../../../components/Shared/Icon";

const Profile = () => {
  const { user, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) {
    return <LoadingSpinner />;
  }

  const onSubmit = async (data) => {};

  return (
    <section className="w-8/12 mx-auto my-10 flex flex-col gap-5">
      <div className="p-10 flex flex-col items-center gap-5 rounded-4xl bg-white">
        <div className="w-full flex justify-between items-start">
          <div className="w-full">
            <h2 className="text-4xl pb-1 font-semibold">My Profile</h2>
            <p className="text-xl font-normal text-black/60 ">
              Mannage your personal information
            </p>
          </div>
          <button className="px-4 rounded-lg py-1.5 bg-[#F43F5E] cursor-pointer text-white">
            Edit
          </button>
        </div>
        <div className="relative cursor-pointer">
          <img
            className="w-50 h-50 mt-8 rounded-full"
            src={user.photoURL}
            alt=""
          />
          <Icon
            className="absolute right-4 -bottom-1 p-2 rounded-full text-white border-3 bg-[#F43F5E]"
            name="camera-bold"
            size={50}
          />
        </div>
      </div>

      {/* Edite Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-10 flex flex-col gap-5 rounded-4xl bg-white"
      >
        <div className="w-full  gap-4 flex justify-between">
          <FormInput
            label="Full Name"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            icon="person-outline"
            error={errors.name}
            defaultValue={user.displayName}
            disabled
            register={register}
            rules={{
              required: "Name is required",
              maxLength: {
                value: 20,
                message: "Name can not be 20",
              },
            }}
          />
          <FormInput
            label="Email Address"
            id="email"
            name="email"
            type="email"
            placeholder="Add email address"
            defaultValue={user.email}
            disabled
            icon="mailbox-outline"
            error={errors.email}
            register={register}
            rules={{
              required: "Email is required",
            }}
          />
        </div>
        <div className="w-full gap-4 flex justify-between">
          <FormInput
            label="District"
            id="district"
            name="district"
            as="select"
            placeholder="Select District"
            register={register}
            rules={{ required: "Category is required" }}
            error={errors.district}
            options={[
              { label: "Dhaka", value: "Dhaka" },
              { label: "Cumilla", value: "Cumilla" },
            ]}
          />
          <FormInput
            label="Upazila"
            id="upazila"
            name="upazila"
            as="select"
            placeholder="Select a blood"
            register={register}
            rules={{ required: "Category is required" }}
            error={errors.upazila}
            options={[
              { label: "Begumganj", value: "Begumganj" },
              { label: "Maijdee", value: "Maijdee" },
            ]}
          />
          <FormInput
            label="Blood Group"
            id="bloodGroup"
            name="bloodGroup"
            as="select"
            error={errors.bloodGroup}
            placeholder="Select a blood"
            register={register}
            rules={{ required: "Category is required" }}
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
        </div>
      </form>
    </section>
  );
};

export default Profile;
