import React from "react";
import loginImg from "/src/assets/login-img.svg";
import { useForm } from "react-hook-form";
import FormInput from "../../components/Shared/FormInput";
import Logo from "/logo.svg";
import Icon from "../../components/Shared/Icon";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
import { imageUpload, saveOrUpdateUser } from "../../utils";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const SignUp = () => {
  const { createUser, updateUserProfile, loading, setLoading } = useAuth();
  const { districts, upazilas } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  // Rect Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Dynamic District and upazila

  const selectedDistrictId = watch("district");
  const filteredUpazilas = upazilas.filter(
    (u) => u.district_id === selectedDistrictId
  );

  const imageFile = watch("image");
  const password = watch("password");

  const onSubmit = async (data) => {
    const { name, email, image, bloodGroup, district, upazila, password } =
      data;

    try {
      // 1. Upload image
      const imageURL = await imageUpload(image[0]);

      // 2. Create auth user
      const result = await createUser(email, password);
      console.log(result);

      // 3. Update auth profile
      await updateUserProfile(name, imageURL);

      // 4. Convert district/upazila IDs to names
      const districtName = districts.find((d) => d.id === district)?.name;
      const upazilaName = upazilas.find((u) => u.id === upazila)?.name;

      // 5. Prepare user object for DB
      const userInfo = {
        name,
        email,
        image: imageURL,
        bloodGroup,
        district: districtName,
        upazila: upazilaName,
        role: "donor",
        status: "active",
      };

      // 6. Save to MongoDB
      await saveOrUpdateUser(userInfo);

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.error(err);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col md:flex-row">
      <div className="w-full md:sticky top-0 flex lg:h-screen  bg-[#FEF5F7]">
        <img src={loginImg} alt="" />
      </div>

      <div className="w-full flex flex-col gap-5 mt-10 justify-center items-center rounded-4xl p-8 ">
        {/* Logo and Heading */}
        <div className="text-center items-center flex flex-col gap-2">
          <Link to={"/"}>
            <img className="w-50" src={Logo} alt="" />
          </Link>
          <h4 className="text-4xl font-medium">Create Account </h4>
          <p className="text-lg text-gray-600 font-light">
            Join our community of life savers.
          </p>
        </div>
        <form
          className="lg:w-5/12 flex flex-col items-center  gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            label="Full Name"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            icon="person-outline"
            error={errors.name}
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
            icon="mailbox-outline"
            error={errors.email}
            register={register}
            rules={{
              required: "Email is required",
            }}
          />

          {/*------------------------------  Uplaod Photo ------------------------------ */}
          <div className="w-full">
            <h3 className="mb-2 text-xl text-gray-900">Profile picture</h3>

            <label
              className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed px-4 py-5 transition ${
                errors.image
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200  hover:border-[#f43f5e]"
              }`}
            >
              <input
                type="file"
                accept="image/png, image/jpeg"
                hidden
                {...register("image", {
                  required: "Image is required",
                })}
              />

              {/* LEFT SIDE */}
              {imageFile?.length ? (
                /* Uploaded Image */
                <img
                  src={URL.createObjectURL(imageFile[0])}
                  alt="Profile preview"
                  className="h-15 w-15 rounded-full object-cover"
                />
              ) : (
                /* Default Icon */
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#f43f5d22] text-[#f43f5e]">
                  <Icon name="person-outline" className="text-xl" />
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#f43f5e] shadow">
                    <Icon name="camera-outline" className="text-xs" />
                  </span>
                </div>
              )}

              {/* RIGHT SIDE TEXT */}
              <div className=" text-left">
                {imageFile?.length ? (
                  <>
                    <p className="max-w-50 truncate text-sm font-medium text-gray-800">
                      {imageFile[0].name}
                    </p>
                    <p className="text-md text-gray-500">
                      Click to change photo
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-md text-gray-700">
                      Drop your photo or{" "}
                      <span className="font-medium text-[#f43f5e]">
                        Select a file
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Supports: JPG, PNG.
                    </p>
                  </>
                )}
              </div>
            </label>

            {errors.image && (
              <p className="mt-1 text-xs text-red-500">
                {errors.image.message}
              </p>
            )}
          </div>
          {/*------------------------------  Details Inputs ------------------------------ */}
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

          {/* Area Selection */}
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
              options={districts.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
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
              options={filteredUpazilas.map((u) => ({
                label: u.name,
                value: u.id,
              }))}
              disabled={!selectedDistrictId}
            />
          </div>

          {/*------------------------------  Password Inputs ------------------------------ */}
          <FormInput
            label="Password"
            id="password"
            name="password"
            type="password"
            error={errors.password}
            placeholder="Enter your password"
            icon="lock-outline"
            register={register}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
          />
          <FormInput
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your Password"
            icon="lock-outline"
            register={register}
            error={errors.confirmPassword}
            rules={{
              required: "Confirm Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
          />

          <button
            type="submit"
            className="cursor-pointer bg-[#F43F5E] text-white py-3 rounded-2xl w-full flex justify-center items-center"
            disabled={loading} // disable button while loading
          >
            {loading ? <>Loading...</> : "Create Account"}
          </button>
        </form>
        <p className="text-lg font-light text-[#95959C]">
          Already have an account
          <Link to="/login">
            <span className="ml-2 cursor-pointer font-medium text-[#F43F5E]">
              Login
            </span>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
