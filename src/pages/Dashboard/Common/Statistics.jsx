import RequestDetailsModal from "../../../components/Modal/RequestDetailsModal";
import Icon from "../../../components/Shared/Icon";
import staticsImg from "/src/assets/notepad.svg";
import graphicsElements from "/src/assets/graphics-elements.svg";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import AdminStatistics from "../Statistics/AdminStatistics";
import DonorStatistics from "../Statistics/DonorStatistics";
import VolunteerStatistics from "../Statistics/volunteerStatistics";
import useAuth from "../../../hooks/useAuth";

const Statistics = () => {
  const { user } = useAuth();
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  return (
    <section className="w-full sm:w-11/12 mx-auto px-4 sm:px-0 flex flex-col gap-8">
      {/* Hero */}
      <div className="mt-8 lg:mt-12 flex flex-col lg:flex-row justify-between relative overflow-hidden bg-white rounded-4xl">
        <div className="flex flex-col gap-5 p-5 sm:p-8 lg:p-10 z-10">
          <div>
            <h4 className="text-xl sm:text-2xl lg:text-3xl font-medium">
              Wellcome back,{" "}
              <span className="text-[#F43F5E]">
                {user?.displayName}!
              </span>
            </h4>
            <p className="text-sm sm:text-base lg:text-lg font-light pt-1 text-black/70">
              Overview of platform activity and recent updates
            </p>
          </div>

          <div className="w-fit bg-[#FFEEA9] flex p-2 pr-5 text-black/80 font-medium gap-2 rounded-full items-center text-sm sm:text-base">
            <Icon name="clock-fill" />
            <p>3 pending requests</p>
          </div>
        </div>

        {/* Side Image */}
        <div className="hidden lg:flex h-full pr-24 pt-10 items-end justify-end z-10">
          <img src={staticsImg} alt="" />
        </div>

        {/* Background Graphic */}
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-40 lg:opacity-100"
          src={graphicsElements}
          alt=""
        />
      </div>

      {/* Statistics Cards */}
      <div>
        {role === "admin" && <AdminStatistics />}
        {role === "donor" && <DonorStatistics />}
        {role === "volunteer" && <VolunteerStatistics />}
      </div>
    </section>
  );
};

export default Statistics;
