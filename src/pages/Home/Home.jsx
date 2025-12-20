import React from "react";
import Container from "../../components/Shared/Container";
import Button from "../../components/Shared/Button/Button";
import heroImg from "/src/assets/hero-img.svg";
import droplinksBox from "/src/assets/droplinksbox.svg";
import actionImg from "/src/assets/actionImg.svg";
import Icon from "../../components/Shared/Icon";
import BloodRequestsCard from "../../components/BloodRequests/BloodRequestsCard";
import FormInput from "../../components/Shared/FormInput";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const Home = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const {
    data: requests,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/donation-requests`
      );
      return result.data;
    },
  });
  if (isError) return <LoadingSpinner />;

  return (
    <>
      <Container>
        {/* Top Hero Section */}
        <section className="relative flex py-18 gap-25 items-start justify-between">
          <div className="absolute right-60 rounded-full z-0 blur-[400px] bg-[#f43f5d35] w-150 h-100"></div>
          {/* Right Section */}
          <div className="flex-2 z-10 flex flex-col gap-5">
            <div className="flex items-center gap-2 w-fit  bg-[#fdeef1] text-[#F43F5E] py-1 px-3 text-lg rounded-xl font-light">
              <Icon name="sparkle-outline" />
              <h6>Modern blood support, built for urgency</h6>
            </div>
            <h2 className="w-140 text-6xl font-bold">
              A calm, guided way to respond when blood is needed most.
            </h2>
            <p className=" text-lg font-light text-[#424242]">
              Stay ahead of emergencies with instant matching, live
              verification, and clear steps that keep donors, hospitals, and
              responders aligned.
            </p>
            <div className="flex gap-2">
              <Button
                className=""
                label={"Join as Donor"}
                iconName="arrow-outline"
                iconPosition="right"
              />
              <Button
                label={"Search Donors"}
                outline={true}
                iconName="arrow-outline"
                iconPosition="right"
              />
            </div>
            {/* Counter */}
            <div className="flex gap-3">
              <div className="w-full  py-5 px-10 bg-white flex flex-col gap-2  rounded-2xl">
                <h6 className="text-[#777777]">
                  Live <br /> Supported
                </h6>
                <span className="text-4xl font-bold">120+</span>
              </div>
              <div className=" w-full py-5 px-10 bg-white flex flex-col gap-2  rounded-2xl">
                <h6 className="text-[#777777]">
                  Active
                  <br /> Donors
                </h6>
                <span className="text-4xl font-bold">420+</span>
              </div>
              <div className=" w-full py-5 px-10 bg-white flex flex-col gap-2  rounded-2xl">
                <h6 className="text-[#777777]">
                  Partner <br /> Hospitals
                </h6>
                <span className="text-4xl font-bold">34+</span>
              </div>
            </div>
          </div>
          {/* Left Section */}
          <div className="flex-2 z-10 flex flex-col justify-between items-center bg-white rounded-4xl">
            <div className="w-full mb-4 flex flex-col justify-center items-center bg-linear-to-r from-[#FFEBEF] via-white to-[#EEF2FF] h-24 ring-2 ring-inset ring-white rounded-t-4xl ">
              <p className="text-[#0000008b]">Unified requests</p>
              <h4 className="text-2xl font-medium">
                Be ready in three guided steps
              </h4>
            </div>
            <img className="w-90" src={heroImg} alt="" />
            <div className="w-full p-4">
              <div className="text-center mb-3">
                <span className="text-4xl ">😎</span>
                <p>That’s it, Respond when notified</p>
              </div>
              <button className="bg-[#0E172A] font-light text-xl gap-2 flex items-center cursor-pointer justify-center w-full text-white py-3 rounded-2xl">
                Complete my profile <Icon name="arrow-outline" size={15} />
              </button>
            </div>
          </div>
        </section>
        {/* Why Donate Blood? Section */}
        <section className="flex flex-col justify-center items-center py-18">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-xl text-[#F43F5E]">Why Donate Blood?</h2>
            <h3 className="text-5xl font-semibold">Donate & Save Life</h3>
            <p className="text-[#424242] text-lg font-light">
              Make a difference in someone's life today
            </p>
          </div>
          {/* Cards */}
          <div className="flex gap-10 mt-10">
            <div className="flex flex-col gap-2 p-5 shadow-[0_4px_50px_2px_rgba(244,63,94,0.08)] transform transition hover:scale-110 cursor-pointer bg-white rounded-2xl">
              <div className="w-fit bg-[#FDEBEE] p-4 rounded-2xl text-[#F43F5E]">
                <Icon size={25} name="love-fill" />
              </div>
              <h4 className="text-2xl font-medium">Help Save Lives</h4>
              <p className="w-80 font-light text-lg">
                One donation can save up to three lives in emergency situations
              </p>
              <Button
                className="w-fit"
                label={"Search Donors"}
                outline={true}
                iconName="arrow-outline"
                iconPosition="right"
              />
            </div>
            <div className="flex flex-col gap-2 p-5 shadow-[0_4px_50px_2px_rgba(244,63,94,0.08)] transform transition hover:scale-110 cursor-pointer bg-white rounded-2xl">
              <div className="w-fit bg-[#FDEBEE] p-4 rounded-2xl text-[#F43F5E]">
                <Icon size={25} name="users-fill" />
              </div>

              <h4 className="text-2xl font-medium">Build Healthier Society</h4>
              <p className="w-80 font-light text-lg">
                Contribute to a stronger, more caring community together
              </p>
              <Button
                className="w-fit"
                label={"Find a donar"}
                outline={true}
                iconName="arrow-outline"
                iconPosition="right"
              />
            </div>
            <div className="flex flex-col gap-2 p-5 shadow-[0_4px_50px_2px_rgba(244,63,94,0.08)] transform transition hover:scale-110 cursor-pointer bg-white rounded-2xl">
              <div className="w-fit bg-[#FDEBEE] p-4 rounded-2xl text-[#F43F5E]">
                <Icon size={25} name="shield-fill" />
              </div>
              <h4 className="text-2xl font-medium">Quick & Safe Process</h4>
              <p className="w-80 font-light text-lg">
                Professional Managment ensure a comfortable and secure donation
              </p>
              <Button
                className="w-fit"
                label={"Let’s Start"}
                outline={true}
                iconName="arrow-outline"
                iconPosition="right"
              />
            </div>
          </div>
        </section>
      </Container>
      {/* Action Section */}
      <section className="my-18 bg-linear-to-r from-[#FFEBEF] via-white to-[#EEF2FF]">
        <Container>
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <h4 className="text-5xl font-medium">
                Looking for blood <br /> request?
              </h4>
              <p className="w-150 font-light text-lg">
                Our volunteers are here to help you. Contact a verified
                volunteer to get assistance with creating a blood donation
                request.
              </p>
              <Button
                className="w-fit"
                label={"Contact a Volunteer"}
                iconName="arrow-outline"
                iconPosition="right"
              />
            </div>
            <img src={actionImg} alt="" />
          </div>
        </Container>
      </section>
      {/* Blood Needed  */}
      <Container>
        <section className="my-18 flex flex-col gap-10">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-xl text-[#F43F5E]">Blood Needed</h2>
            <h3 className="text-5xl font-semibold">Urgent Blood Requests</h3>
            <p className="text-[#424242] text-lg font-light">
              People who need your help right now
            </p>
          </div>
          <div className="w-fit mx-auto grid grid-cols-3 gap-8">
            {isLoading
              ? [...Array(3)].map((_, i) => <LoadingSpinner key={i} />)
              : requests
                  .slice(0, 3)
                  .map((request) => (
                    <BloodRequestsCard key={request._id} request={request} />
                  ))}
          </div>
        </section>
      </Container>
      {/* Contact Us Section */}
      <section
        id="contact-us"
        className="w-7/12 mx-auto my-50 flex justify-center gap-18 "
      >
        <div className="w-full flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl text-[#F43F5E]">Contact Us</h2>
            <h3 className="text-5xl font-medium">
              We're here to help. <br /> Reach out anytime.
            </h3>
            <p className="text-[#424242] text-lg font-light">
              We're here to help. Reach out anytime.
            </p>
          </div>
          {/* Cards */}
          <div>
            <div className="border mt-5 border-[#F43F5E] p-2 rounded-3xl">
              <div className="flex items-center gap-4 justify-start px-3">
                <div
                  className="w-fit bg-[#FDEBEE] p-4 rounded-full
                   text-[#F43F5E]"
                >
                  <Icon size={25} name="call-fill" />
                </div>
                <div>
                  <h5 className="text-xl font-medium">Phone</h5>
                  <div className="text-lg font-light text-[#676767]">
                    <p>01234-567890</p>
                    <p>01234-567890</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border mt-5 border-[#F43F5E] p-2 rounded-3xl">
              <div className="flex items-center gap-4 justify-start px-3">
                <div
                  className="w-fit bg-[#FDEBEE] p-4 rounded-full
                   text-[#F43F5E]"
                >
                  <Icon size={25} name="mailbox-fill" />
                </div>
                <div>
                  <h5 className="text-xl font-medium">Email</h5>
                  <div className="text-lg font-light text-[#676767]">
                    <p>info@lifeflow.org</p>
                    <p>support@lifeflow.org</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Forms */}
        <div className="w-full rounded-4xl p-8 bg-[#FEF6F7] ">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              label="Your Name"
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              icon="person-outline"
              register={register}
              rules={{
                required: "Name is required",
              }}
            />
            <FormInput
              label="Email Address"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email addresses"
              icon="mailbox-outline"
              register={register}
              rules={{
                required: "Name is required",
              }}
            />
            <FormInput
              label="Message"
              id="message"
              name="message"
              type="text"
              placeholder="Write your message here"
              register={register}
              as="textarea"
              rows={4}
              rules={{
                required: "Name is required",
              }}
            />
            <button
              type="submit"
              className="cursor-pointer bg-[#F43F5E] text-white py-3 rounded-2xl w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
      {/* Action Section */}
      <section className="mt-18 bg-linear-to-r from-[#FFEBEF] via-white to-[#EEF2FF]">
        <Container>
          <div className="container py-18 mx-auto flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <h4 className="text-5xl font-medium">
                Be Part of the Lifesaving <br /> Mission
              </h4>
              <p className="w-150 font-light text-lg">
                Your financial support helps expand our outreach, improve
                systems, and ensure blood reaches.
              </p>
              <Button
                className="w-fit"
                label={"Fund Now"}
                iconName="arrow-outline"
                iconPosition="right"
              />
            </div>
            <img src={droplinksBox} alt="" />
          </div>
        </Container>
      </section>
    </>
  );
};

export default Home;
