import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";
import FormInput from "../Shared/FormInput";
import { useForm } from "react-hook-form";

const DonateConfirmModal = ({ isOpen, closeModal, request, navigate }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // Hook Form
  const { register, handleSubmit } = useForm();

  const handleConfirm = async () => {
    try {
      if (!request?._id) return toast.error("Request ID missing");

      await axiosSecure.patch("/donation-requests", {
        id: request._id,
        status: "In Progress",
      });

      toast.success("Status updated to In Progress!");
      closeModal();
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to update status:", error.response || error);
      toast.error("Failed to update status");
    }
  };

  // Donor Data
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
        <DialogPanel className="bg-white rounded-2xl p-6 w-full max-w-md">
          <DialogTitle className="text-xl font-semibold text-center">
            Confirm Donation
          </DialogTitle>
          <p className="mt-2 text-center text-lg mb-5 text-black/60">
            Donate to{" "}
            <span className="text-red-600">{request.recipientName}</span>
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
          >
            <FormInput
              label="Donar Name"
              id="donarName"
              name="donarName"
              type="text"
              defaultValue={user.displayName}
              register={register}
              disabled
              rules={{
                required: "Name is required",
              }}
            />
            <FormInput
              label="Donar Email"
              id="donarEmail"
              name="donarEmail"
              type="email"
              defaultValue={user.email}
              register={register}
              disabled
              rules={{
                required: "Name is required",
              }}
            />
          </form>
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleConfirm}
              className="flex-1 bg-rose-500 text-white py-2 rounded-xl hover:bg-rose-600"
            >
              Confirm
            </button>
            <button
              onClick={closeModal}
              className="flex-1 bg-gray-300 py-2 rounded-xl hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DonateConfirmModal;
