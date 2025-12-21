import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import FormInput from "../Shared/FormInput";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const EditBloodRequestModal = ({ closeModal, isOpen, request }) => {
  const axiosSecure = useAxiosSecure();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const {
    recipientName,
    bloodGroup,
    hospitalName,
    donationDate,
    addressLine,
    bagCount,
    recipientDistrict,
    recipientUpazila,
    requestMessage,
    requesterName,
    requesterEmail,
  } = request || {};

  // Dynamic Selection
  const selectedDistrictId = watch("recipientDistrict");
  const filteredUpazilas = upazilas.filter(
    (u) => u.district_id === selectedDistrictId
  );

  // Load locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const [districtRes, upazilaRes] = await Promise.all([
          fetch("/districts.json"),
          fetch("/upazilas.json"),
        ]);
        const districtsData = await districtRes.json();
        const upazilasData = await upazilaRes.json();

        setDistricts(districtsData);
        setUpazilas(upazilasData);
      } catch (err) {
        console.error("Failed to load locations", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  // Reset UI
  useEffect(() => {
    if (!loading && request) {
      reset(request);
    }
  }, [request, loading, reset]);

  // Pass the data
  const onSubmit = async (data) => {
    // 1. convert district ID -> name
    const districtName = districts.find(
      (d) => d.id.toString() === data.recipientDistrict
    )?.name;

    // 2. convert upazila ID -> name
    const upazilaName = upazilas.find(
      (u) => u.id.toString() === data.recipientUpazila
    )?.name;

    // 3. overwrite values
    data.recipientDistrict = districtName;
    data.recipientUpazila = upazilaName;

    try {
      await axiosSecure.patch(`/donation-requests/${request._id}`, data);
      closeModal();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  if (loading) return null;

  return (
    <Dialog
      open={isOpen}
      as="div"
      className=" relative z-60 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 bg-black/30 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-200 bg-white p-5 backdrop-blur-2xl shadow-xl rounded-4xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" p-8 flex flex-col gap-8 rounded-4xl bg-white"
            >
              {/* Recipient Details */}
              <div>
                <h4 className="text-2xl pb-3 font-light text-[#000000a4] border-b-2 border-[#00000014]">
                  Recipient Details
                </h4>
                <div className=" mt-5 flex flex-col gap-10">
                  <div className="flex gap-10">
                    <FormInput
                      label="Recipient Name"
                      id="recipientName"
                      name="recipientName"
                      type="text"
                      placeholder="Enter recipient name"
                      error={errors.recipientName}
                      register={register}
                      defaultValue={recipientName}
                    />
                    <FormInput
                      label="Hospital Name"
                      id="hospitalName"
                      name="hospitalName"
                      type="text"
                      placeholder="Enter hospital name"
                      error={errors.hospitalName}
                      register={register}
                      defaultValue={hospitalName}
                    />
                  </div>
                  <div className="flex gap-10">
                    <FormInput
                      label="Recipient District"
                      id="recipientDistrict"
                      name="recipientDistrict"
                      as="select"
                      register={register}
                      error={errors.recipientDistrict}
                      options={districts.map((d) => ({
                        label: d.name,
                        value: d.id,
                      }))}
                      defaultValue={recipientDistrict}
                    />
                    <FormInput
                      label="Recipient Upazila"
                      id="recipientUpazila"
                      name="recipientUpazila"
                      as="select"
                      register={register}
                      error={errors.recipientUpazila}
                      defaultValue={recipientUpazila}
                      options={filteredUpazilas.map((u) => ({
                        label: u.name,
                        value: u.id,
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Donation Details */}
              <div>
                <h4 className="text-2xl pb-3 font-light text-[#000000a4] border-b-2 border-[#00000014]">
                  Donation Details
                </h4>
                <div className="mt-5 flex flex-col gap-10">
                  <div className="flex gap-10">
                    <FormInput
                      label="Blood Group"
                      id="bloodGroup"
                      name="bloodGroup"
                      as="select"
                      register={register}
                      error={errors.bloodGroup}
                      options={[
                        { label: "A+", value: "A+" },
                        { label: "A-", value: "A-" },
                        { label: "B+", value: "B+" },
                        { label: "B-", value: "B-" },
                        { label: "AB+", value: "AB+" },
                        { label: "AB-", value: "AB-" },
                        { label: "O+", value: "O+" },
                        { label: "O-", value: "O-" },
                      ]}
                      defaultValue={bloodGroup}
                    />
                    <FormInput
                      label="Bag Needed"
                      id="bagCount"
                      name="bagCount"
                      as="select"
                      register={register}
                      error={errors.bagCount}
                      options={[
                        { label: "1", value: "1" },
                        { label: "2", value: "2" },
                        { label: "3", value: "3" },
                        { label: "4", value: "4" },
                        { label: "5", value: "5" },
                        { label: "6", value: "6" },
                      ]}
                      defaultValue={bagCount}
                    />
                  </div>
                  <div className="flex gap-10">
                    <FormInput
                      label="Full Address Line"
                      id="addressLine"
                      name="addressLine"
                      type="text"
                      register={register}
                      error={errors.addressLine}
                      defaultValue={addressLine}
                    />
                    <FormInput
                      label="Donation Date"
                      id="donationDate"
                      name="donationDate"
                      type="date"
                      register={register}
                      error={errors.donationDate}
                      defaultValue={donationDate}
                    />
                  </div>
                  <FormInput
                    label="Request Message"
                    id="requestMessage"
                    name="requestMessage"
                    as="textarea"
                    rows="4"
                    register={register}
                    error={errors.requestMessage}
                    defaultValue={requestMessage}
                  />
                </div>
              </div>

              {/* Requester Details */}
              <div className="p-5 bg-[#F6F6F6] rounded-2xl">
                <div className="flex gap-10">
                  <FormInput
                    label="Requester Name"
                    id="requesterName"
                    name="requesterName"
                    type="text"
                    register={register}
                    error={errors.requesterName}
                    defaultValue={requesterName}
                    readOnly
                  />
                  <FormInput
                    label="Requester Email"
                    id="requesterEmail"
                    name="requesterEmail"
                    type="email"
                    register={register}
                    error={errors.requesterEmail}
                    defaultValue={requesterEmail}
                    readOnly
                  />
                </div>
              </div>

              {/* Submit Button */}

              <div className="flex mt-2 gap-3 justify-around">
                <button
                  type="submit"
                  className="w-full cursor-pointer inline-flex justify-center rounded-2xl  bg-[#F43F5E] px-4 py-3 text-lg font-medium text-white hover:bg-[#db3a55]"
                >
                  Update Request
                </button>
                <button
                  type="button"
                  className="w-full cursor-pointer inline-flex justify-center rounded-2xl  bg-[#2c1f21] px-4 py-3 text-lg font-medium text-white  "
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

export default EditBloodRequestModal;
