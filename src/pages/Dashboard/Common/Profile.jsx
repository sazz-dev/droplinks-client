import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { role } = useRole();

  const loaderData = useLoaderData() || {};
  const districts = loaderData.districts || [];
  const upazilas = loaderData.upazilas || [];

  const [isEdit, setIsEdit] = useState(false);
  const [dbUser, setDbUser] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  //  Fetch profile from DATABASE

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setDbUser(res.data);
        reset({
          name: res.data.name || "",
          email: res.data.email || "",
          district: res.data.district || "",
          upazila: res.data.upazila || "",
          bloodGroup: res.data.bloodGroup || "",
        });
      });
    }
  }, [user, axiosSecure, reset]);

  if (loading || !dbUser) return <LoadingSpinner />;

  // Submit updated profile

  const onSubmit = async (data) => {
    try {
      await axiosSecure.patch("/users", {
        name: data.name,
        district: data.district,
        upazila: data.upazila,
        bloodGroup: data.bloodGroup,
      });
      toast.success("Profile Updated");
      // Refetch updated profile
      const res = await axiosSecure.get(`/users/${user.email}`);
      setDbUser(res.data);
      reset(res.data);

      setIsEdit(false);
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setIsEdit(false);
    reset({
      name: dbUser.name,
      email: dbUser.email,
      district: dbUser.district,
      upazila: dbUser.upazila,
      bloodGroup: dbUser.bloodGroup,
    });
  };

  return (
    <section className="w-8/12 mx-auto my-10 flex flex-col gap-6">
      {/* Header */}
      <div className="p-10 rounded-4xl bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-semibold">My Profile</h2>
            <p className="text-black/60">Manage your personal information</p>
          </div>

          {!isEdit ? (
            <button
              type="button"
              onClick={() => setIsEdit(true)}
              className="bg-[#F43F5E] text-white px-4 py-2 rounded-lg"
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {/* Avatar */}
        <div className="flex justify-center mt-8 relative">
          <img
            src={user?.photoURL || "/avatar.png"}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover"
          />
          <span className="absolute uppercase -bottom-2 border-3 bg-[#F43F5E] text-white px-4 py-1 rounded-full">
            {role}
          </span>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-10 rounded-4xl bg-white flex flex-col gap-5"
      >
        <div className="flex gap-4">
          {/* Name */}
          <div className="w-full">
            <label className="text-xl font-medium">Full Name</label>
            <input
              {...register("name")}
              disabled={!isEdit}
              className={`w-full border-2 border-[#F4F0F0] p-3 rounded-2xl text-lg outline-none ${
                !isEdit
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-white border-[#F4F0F0] focus:border-[#F43F5E]"
              }`}
            />
          </div>

          {/* Email */}
          <div className="w-full">
            <label className="text-xl font-medium">Email</label>
            <input
              {...register("email")}
              disabled
              className="w-full border-2 border-[#F4F0F0] p-3 rounded-2xl text-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex gap-4">
          {/* District */}
          <div className="w-full">
            <label className="text-xl font-medium">District</label>
            <select
              {...register("district")}
              disabled={!isEdit}
              className={`w-full border-2 border-[#F4F0F0] p-3 rounded-2xl text-lg outline-none ${
                !isEdit
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-white border-[#F4F0F0] focus:border-[#F43F5E]"
              }`}
            >
              <option value="">Select</option>
              {districts.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div className="w-full">
            <label className="text-xl font-medium">Upazila</label>
            <select
              {...register("upazila")}
              disabled={!isEdit}
              className={`w-full border-2 border-[#F4F0F0] p-3 rounded-2xl text-lg outline-none ${
                !isEdit
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-white border-[#F4F0F0] focus:border-[#F43F5E]"
              }`}
            >
              <option value="">Select</option>
              {upazilas.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </select>
          </div>

          {/* Blood Group */}
          <div className="w-full">
            <label className="text-xl font-medium">Blood Group</label>
            <select
              {...register("bloodGroup")}
              disabled={!isEdit}
              className={`w-full border-2 border-[#F4F0F0]  p-3 rounded-2xl text-lg outline-none ${
                !isEdit
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-white border-[#F4F0F0] focus:border-[#F43F5E]"
              }`}
            >
              <option value="">Select</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Save */}
        {isEdit && (
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#F43F5E] text-white px-6 py-3 rounded-xl self-start"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        )}
      </form>
    </section>
  );
};

export default Profile;
