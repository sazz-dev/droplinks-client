import Button from "../components/Shared/Button/Button";
import { useNavigate } from "react-router";
import errorIcon from "../assets/error.svg";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col items-center text-center max-w-md mx-auto">
          {/* Icon */}
          <div className="p-14 rounded-full bg-rose-50">
            <img src={errorIcon} alt="Error" className="w-150 " />
          </div>

          {/* Text */}
          <h1 className="mt-4 text-2xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
            Something Went Wrong!
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-500">
            Here are some helpful links to get you back on track.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center px-5 py-2 text-sm font-medium text-gray-700 border rounded-lg transition hover:bg-gray-100"
            >
              <span className="text-[#F43F5E] mr-2">←</span>
              Go Back
            </button>

            <Button
              label="Take Me Home"
              onClick={() => navigate("/")}
              className="bg-[#F43F5E] hover:bg-rose-600 text-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
