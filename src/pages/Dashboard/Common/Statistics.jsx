import RequestDetailsModal from "../../../components/Modal/RequestDetailsModal";
import Icon from "../../../components/Shared/Icon";
import staticsImg from "/src/assets/notepad.svg";
import graphicsElements from "/src/assets/graphics-elements.svg";

const Statistics = () => {
  return (
    <section className="w-11/12 mx-auto flex flex-col gap-8">
      <div className=" mt-12 flex justify-between items-center relative overflow-hidden bg-white rounded-4xl">
        <div className="flex flex-col justify-between gap-5 p-10">
          <div>
            <h4 className="text-3xl font-medium">
              Wellcome back, <span className="text-[#F43F5E]">Zahid!</span>
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
      <div className="grid grid-cols-3 gap-8">
        {/* Counter */}
        <div className="bg-white w-full p-5 rounded-4xl">
          <div className="bg-[#f43f5d1c] mb-5 p-4 rounded-full w-15 h-15 flex justify-center items-center text-[#F43F5E]">
            <Icon name="love-fill" />
          </div>
          <h3 className="text-4xl font-semibold">12,354</h3>
          <div className="mt-2">
            <h4 className="text-2xl font-medium text-[#F43F5E]">Total Users</h4>
            <p className="text-lg font-light">
              Total registered donors & volunteers
            </p>
          </div>
        </div>
        <div className="bg-white w-full p-5 rounded-4xl">
          <div className="bg-[#f43f5d1c] mb-5 p-4 rounded-full w-15 h-15 flex justify-center items-center text-[#F43F5E]">
            <Icon name="wallet-fill" />
          </div>
          <h3 className="text-4xl font-semibold">$12,450</h3>
          <div className="mt-2">
            <h4 className="text-2xl font-medium text-[#F43F5E]">
              Total Funding
            </h4>
            <p className="text-lg font-light">Donations collected via Stripe</p>
          </div>
        </div>
        <div className="bg-white w-full p-5 rounded-4xl">
          <div className="bg-[#f43f5d1c] mb-5 p-4 rounded-full w-15 h-15 flex justify-center items-center text-[#F43F5E]">
            <Icon name="blood-fill" />
          </div>
          <h3 className="text-4xl font-semibold">1,234</h3>
          <div className="mt-2">
            <h4 className="text-2xl font-medium text-[#F43F5E]">
              Total Requests
            </h4>
            <p className="text-lg font-light">All requests across the system</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
