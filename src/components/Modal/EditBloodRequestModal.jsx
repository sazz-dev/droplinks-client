import { Dialog, DialogPanel } from "@headlessui/react";
import { useForm } from "react-hook-form";
import FormInput from "../Shared/FormInput";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const EditBloodRequestModal = ({ closeModal, isOpen, request }) => {
  const axiosSecure = useAxiosSecure();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const selectedDistrictId = watch("recipientDistrict");
  const filteredUpazilas = upazilas.filter(
    (u) => u.district_id === selectedDistrictId
  );

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const [districtRes, upazilaRes] = await Promise.all([
          fetch("/districts.json"),
          fetch("/upazilas.json"),
        ]);
        setDistricts(await districtRes.json());
        setUpazilas(await upazilaRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    if (!loading && request) reset(request);
  }, [request, loading, reset]);

  const onSubmit = async (data) => {
    const districtName = districts.find(
      (d) => d.id.toString() === data.recipientDistrict
    )?.name;

    const upazilaName = upazilas.find(
      (u) => u.id.toString() === data.recipientUpazila
    )?.name;

    data.recipientDistrict = districtName;
    data.recipientUpazila = upazilaName;

    await axiosSecure.patch(`/donation-requests/${request._id}`, data);
    closeModal();
  };

  if (loading) return null;

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-60 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 bg-black/30 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            className="
              w-full
              max-w-5xl
              bg-white
              p-4 sm:p-6
              shadow-xl
              rounded-4xl
              max-h-[90vh]
              overflow-y-auto
            "
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              {/* Recipient Details */}
              <div>
                <h4 className="text-xl sm:text-2xl pb-3 font-light text-black/60 border-b">
                  Recipient Details
                </h4>

                <div className="mt-5 flex flex-col gap-6 lg:gap-10">
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                    <FormInput
                      label="Recipient Name"
                      name="recipientName"
                      register={register}
                      error={errors.recipientName}
                      defaultValue={recipientName}
                    />
                    <FormInput
                      label="Hospital Name"
                      name="hospitalName"
                      register={register}
                      error={errors.hospitalName}
                      defaultValue={hospitalName}
                    />
                  </div>

                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                    <FormInput
                      label="Recipient District"
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
                <h4 className="text-xl sm:text-2xl pb-3 font-light text-black/60 border-b">
                  Donation Details
                </h4>

                <div className="mt-5 flex flex-col gap-6 lg:gap-10">
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                    <FormInput
                      label="Blood Group"
                      name="bloodGroup"
                      as="select"
                      register={register}
                      error={errors.bloodGroup}
                      options={[
                        "A+","A-","B+","B-","AB+","AB-","O+","O-"
                      ].map((v) => ({ label: v, value: v }))}
                      defaultValue={bloodGroup}
                    />
                    <FormInput
                      label="Bag Needed"
                      name="bagCount"
                      as="select"
                      register={register}
                      error={errors.bagCount}
                      options={[1,2,3,4,5,6].map((v) => ({
                        label: v.toString(),
                        value: v.toString(),
                      }))}
                      defaultValue={bagCount}
                    />
                  </div>

                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                    <FormInput
                      label="Full Address Line"
                      name="addressLine"
                      register={register}
                      error={errors.addressLine}
                      defaultValue={addressLine}
                    />
                    <FormInput
                      label="Donation Date"
                      name="donationDate"
                      type="date"
                      register={register}
                      error={errors.donationDate}
                      defaultValue={donationDate}
                    />
                  </div>

                  <FormInput
                    label="Request Message"
                    name="requestMessage"
                    as="textarea"
                    rows="4"
                    register={register}
                    error={errors.requestMessage}
                    defaultValue={requestMessage}
                  />
                </div>
              </div>

              {/* Requester Info */}
              <div className="p-4 sm:p-5 bg-[#F6F6F6] rounded-2xl">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                  <FormInput
                    label="Requester Name"
                    name="requesterName"
                    register={register}
                    defaultValue={requesterName}
                    readOnly
                  />
                  <FormInput
                    label="Requester Email"
                    name="requesterEmail"
                    register={register}
                    defaultValue={requesterEmail}
                    readOnly
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-[#F43F5E] px-4 py-3 text-lg font-medium text-white hover:bg-[#db3a55]"
                >
                  Update Request
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full rounded-2xl bg-[#2c1f21] px-4 py-3 text-lg font-medium text-white"
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
