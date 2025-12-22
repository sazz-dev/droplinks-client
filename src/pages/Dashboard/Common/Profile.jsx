import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useLoaderData } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import FormInput from "../../../components/Shared/FormInput";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { role } = useRole();
  const { districts, upazilas } = useLoaderData();

  const [isEdit, setIsEdit] = useState(false);
  const [dbUser, setDbUser] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm();

  /* -------------------- Helpers -------------------- */
  const getDistrictIdByName = (name) =>
    districts.find((d) => d.name === name)?.id || "";

  const getUpazilaIdByName = (name) =>
    upazilas.find((u) => u.name === name)?.id || "";

  /* -------------------- Dynamic Select -------------------- */
  const selectedDistrictId = watch("district");

  const filteredUpazilas = upazilas.filter(
    (u) => String(u.district_id) === String(selectedDistrictId)
  );

  /* -------------------- Load User -------------------- */
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        const data = res.data;
        setDbUser(data);

        reset({
          name: data.name || "",
          email: data.email || "",
          district: getDistrictIdByName(data.district),
          upazila: getUpazilaIdByName(data.upazila),
          bloodGroup: data.bloodGroup || "",
        });
      });
    }
  }, [user, axiosSecure, reset, districts, upazilas]);

  if (loading || !dbUser) return <LoadingSpinner />;

  /* -------------------- Submit -------------------- */
  const onSubmit = async (data) => {
    try {
      const districtName = districts.find(
        (d) => String(d.id) === String(data.district)
      )?.name;

      const upazilaName = upazilas.find(
        (u) => String(u.id) === String(data.upazila)
      )?.name;

      const payload = {
        name: data.name,
        bloodGroup: data.bloodGroup,
        district: districtName,
        upazila: upazilaName,
      };

      await axiosSecure.patch("/users", payload);
      toast.success("Profile Updated");

      const res = await axiosSecure.get(`/users/${user.email}`);
      setDbUser(res.data);

      reset({
        name: res.data.name,
        email: res.data.email,
        district: getDistrictIdByName(res.data.district),
        upazila: getUpazilaIdByName(res.data.upazila),
        bloodGroup: res.data.bloodGroup,
      });

      setIsEdit(false);
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  /* -------------------- Cancel Edit -------------------- */
  const handleCancelEdit = () => {
    reset({
      name: dbUser.name,
      email: dbUser.email,
      district: getDistrictIdByName(dbUser.district),
      upazila: getUpazilaIdByName(dbUser.upazila),
      bloodGroup: dbUser.bloodGroup,
    });
    setIsEdit(false);
  };

  return (
    <section className="w-full sm:w-11/12 lg:w-8/12 mx-auto px-4 sm:px-0 my-10 flex flex-col gap-6">
      {/* Header */}
      <div className="p-8 rounded-3xl bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-semibold">My Profile</h2>
            <p className="text-gray-500">Manage your personal information</p>
          </div>

          {!isEdit ? (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-rose-500 text-white px-4 py-2 rounded-lg"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleCancelEdit}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {/* Avatar + Role */}
        <div className="flex justify-center mt-8 relative">
          <img
            src={user?.photoURL || "/avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <span className="absolute -bottom-2 uppercase bg-rose-500 text-white px-4 py-1 rounded-full text-xs">
            {role}
          </span>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 rounded-3xl bg-white flex flex-col gap-5"
      >
        <div className="grid lg:grid-cols-2 gap-4">
          <FormInput
            label="Full Name"
            name="name"
            register={register}
            disabled={!isEdit}
          />

          <FormInput label="Email" name="email" register={register} disabled />
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <FormInput
            label="District"
            name="district"
            as="select"
            register={register}
            disabled={!isEdit}
            options={districts.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />

          <FormInput
            label="Upazila"
            name="upazila"
            as="select"
            register={register}
            disabled={!isEdit || !selectedDistrictId}
            options={filteredUpazilas.map((u) => ({
              label: u.name,
              value: u.id,
            }))}
          />
        </div>

        <FormInput
          label="Blood Group"
          name="bloodGroup"
          as="select"
          register={register}
          disabled={!isEdit}
          options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
            (bg) => ({
              label: bg,
              value: bg,
            })
          )}
        />

        {isEdit && (
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-rose-500 text-white px-6 py-3 rounded-xl w-fit"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        )}
      </form>
    </section>
  );
};

export default Profile;
