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
    <section className="w-11/12 mx-auto flex flex-col gap-8">
      <div className=" mt-12 flex justify-between items-center relative overflow-hidden bg-white rounded-4xl">
        <div className="flex flex-col justify-between gap-5 p-10">
          <div>
            <h4 className="text-3xl font-medium">
              Wellcome back,{" "}
              <span className="text-[#F43F5E]">{user?.displayName}!</span>
            </h4>
            <p className="text-lg font-light pt-1 text-black/70">
              Overview of platform activity and recent updates
            </p>
          </div>
          <div className="w-fit bg-[#FFEEA9] flex p-2 pr-5 text-black/80 font-medium gap-2 rounded-full items-start">
            <Icon name="clock-fill" />
            <p>3 pending requests</p>
          </div>
        </div>
        {/* Image */}
        <div className="flex  h-full pr-24 pt-10 items-end justify-end">
          <img className="" src={staticsImg} alt="" />
        </div>
        <img className="absolute w-full " src={graphicsElements} alt="" />
      </div>
      {/* ----------- Statics Card ----------- */}
      <div>
        {role === "admin" && <AdminStatistics />}
        {role === "donor" && <DonorStatistics />}
        {role === "volunteer" && <VolunteerStatistics />}
      </div>
    </section>
  );
};

export default Statistics;
