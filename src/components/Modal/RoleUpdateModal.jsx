import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import FormInput from "../Shared/FormInput";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import toast from "react-hot-toast";

const RoleUpdateModal = ({ closeModal, isOpen, user, refetch }) => {
  const axiosSecure = useAxiosSecure();

  //   Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (data) => {
    try {
      await axiosSecure.patch("/update-role", {
        email: user?.email,
        role: data.role,
        status: data.status,
      });

      toast.success("User updated successfully!");
      refetch();
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-60 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 bg-black/30  w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-4xl"
          >
            <DialogTitle>
              <div className="flex flex-col gap-2 items-center">
                <h3 className="text-2xl font-semibold text-center leading-6 text-gray-900">
                  Update Status
                </h3>
                <p className="text-lg font-light text-black/70 mb-5">
                  Select and update status
                </p>
              </div>
            </DialogTitle>
            {/* The Modal Contents */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3 mt-5"
            >
              {/*Status Selection */}
              <div className="flex flex-col md:flex-row  gap-3">
                <FormInput
                  label="Role"
                  id="role"
                  name="role"
                  as="select"
                  error={errors.role}
                  placeholder="Select a Role"
                  register={register}
                  rules={{ required: "Required" }}
                  defaultValue={user?.role}
                  options={[
                    { label: "Donor", value: "donor" },
                    { label: "Volunteer", value: "volunteer" },
                    { label: "Admin", value: "admin" },
                  ]}
                />
                <FormInput
                  label="Status"
                  id="status"
                  name="status"
                  as="select"
                  error={errors.status}
                  placeholder="Select Status"
                  register={register}
                  rules={{ required: "Required" }}
                  defaultValue={user?.status}
                  options={[
                    { label: "Active", value: "active" },
                    { label: "Blocked", value: "blocked" },
                  ]}
                />
              </div>
              {/* Buttons */}
              <div className="flex mt-2 gap-3 justify-around">
                <button
                  type="submit"
                  className="w-full cursor-pointer inline-flex justify-center rounded-2xl  bg-[#F43F5E] px-4 py-3 text-lg font-medium text-white hover:bg-[#db3a55]"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="w-full cursor-pointer inline-flex justify-center rounded-2xl  px-4 py-3 text-lg font-medium text-[#F43F5E] border-2 border-[#F43F5E]  "
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default RoleUpdateModal;
