import React from "react";
import loginImg from "/src/assets/login-img.svg";
import { useForm } from "react-hook-form";
import FormInput from "../../components/Shared/FormInput";
import Logo from "/logo.svg";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { signIn, loading, user, setLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const { user } = await signIn(email, password);
      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Login failed");
    }

    if (loading) {
      return <LoadingSpinner />;
    }
  };
  return (
    <section className="flex flex-col md:flex-row">
      <div className="w-full flex lg:h-screen  bg-[#FEF5F7]">
        <img src={loginImg} alt="" />
      </div>
      <div className="w-full flex flex-col gap-5 justify-center items-center rounded-4xl p-8 ">
        {/* Logo and Heading */}
        <div className="text-center items-center flex flex-col gap-2">
          <Link to={"/"}>
            <img className="w-50" src={Logo} alt="" />
          </Link>
          <h4 className="text-4xl font-medium">Login </h4>
          <p className="text-lg text-gray-600 font-light">
            Login to your droplinks account
          </p>
        </div>
        <form
          className="lg:w-5/12 flex flex-col items-center  gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            label="Email Address"
            id="email"
            name="email"
            type="email"
            placeholder="Email address"
            icon="mailbox-outline"
            register={register}
            rules={{
              required: "Name is required",
            }}
          />
          <FormInput
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            icon="lock-outline"
            register={register}
            rules={{
              required: "Name is required",
            }}
          />

          <button
            type="submit"
            className="cursor-pointer bg-[#F43F5E] text-white py-3 rounded-2xl w-full"
          >
            Login
          </button>
        </form>
        <p className="text-lg font-light text-[#95959C]">
          New at Droplink?
          <Link to="/signup">
            <span className="ml-2 cursor-pointer font-medium text-[#F43F5E]">
              Create Account
            </span>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
