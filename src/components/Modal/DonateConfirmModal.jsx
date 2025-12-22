import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useNavigate } from "react-router";

const DonateConfirmModal = ({ closeModal, isOpen, request }) => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  if (!request) return null;

  const handleDonateNow = async () => {
    try {
      await axiosSecure.patch("/donation-requests", {
        id: request.id,
        status: "In Progress",
      });

      toast.success("Status updated to In Progress!");
      navigate("/dashboard/my-blood-requests");
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-60 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 bg-black/30 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white p-6 shadow-xl rounded-4xl">
            <DialogTitle>
              <div className="flex flex-col gap-2 items-center">
                <h3 className="text-2xl font-semibold text-center leading-6 text-gray-900">
                  Support Our Cause
                </h3>
                <p className="text-lg font-light text-black/70 mb-5">
                  Help us save lives with your donation.
                </p>
              </div>
            </DialogTitle>

            <div className="flex mt-2 gap-3 justify-around">
              <button
                onClick={handleDonateNow}
                className="w-full cursor-pointer inline-flex justify-center rounded-2xl bg-[#F43F5E] px-4 py-3 text-lg font-medium text-white hover:bg-[#db3a55]"
              >
                Confirm
              </button>
              <button
                type="button"
                className="w-full cursor-pointer inline-flex justify-center rounded-2xl bg-[#2c1f21] px-4 py-3 text-lg font-medium text-white"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DonateConfirmModal;
