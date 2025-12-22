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
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const Home = () => {
  const axiosSecure = useAxiosSecure();
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
      const result = await axiosSecure(`/donation-requests/pending`);
      return result.data;
    },
  });
  if (isError) return <LoadingSpinner />;

  return (
    <>
      <Container>
        {/* Top Hero Section */}
        <section className="relative flex flex-col md:flex-row md:py-18  gap-25 items-start justify-between">
          <div className=" absolute right-60 rounded-full z-0 blur-[400px] bg-[#f43f5d35] w-150 h-100"></div>
          {/* Left Section */}
          <div className="flex-2 z-10 px-2 flex flex-col gap-5">
            <div className="flex items-center gap-2 w-fit  bg-[#fdeef1] text-[#F43F5E] py-1 px-3 text-lg rounded-xl font-light">
              <Icon name="sparkle-outline" />
              <h6>Modern blood support</h6>
            </div>
            <h2 className="text-4xl md:w-140 md:text-6xl font-bold">
              A calm, guided way to respond when blood is needed most.
            </h2>
            <p className=" text-lg md:font-light text-[#424242]">
              Stay ahead of emergencies with instant matching, live
              verification, and clear steps that keep donors, hospitals, and
              responders aligned.
            </p>
            <div className="flex flex-col md:flex-row gap-2">
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
            <section>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { title: "Live", subtitle: "Supported", value: "120+" },
                  { title: "Active", subtitle: "Donors", value: "420+" },
                  { title: "Partner", subtitle: "Hospitals", value: "34+" },
                  { title: "Total", subtitle: "Requests", value: "980+" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="border border-black/5 py-5 bg-white flex flex-col items-center gap-2 rounded-2xl"
                  >
                    <h6 className="text-[#777777] text-center leading-tight">
                      {item.title} <br /> {item.subtitle}
                    </h6>
                    <span className="text-3xl md:text-4xl font-bold">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
          {/* Left Section */}
          <div className="flex-2 z-10 flex flex-col justify-between items-center bg-white rounded-4xl">
            <div className="w-full mb-4 py-15 flex flex-col justify-center items-center bg-linear-to-r from-[#FFEBEF] via-white to-[#EEF2FF] h-24 ring-2 ring-inset ring-white rounded-t-4xl ">
              <p className="text-black/50 text-xl">Unified requests</p>
              <h4 className="text-2xl w-60 md:w-full text-center font-medium">
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
            <h3 className="text-3xl md:text-5xl font-semibold">
              Donate & Save Life
            </h3>
            <p className="text-[#424242] text-lg md:font-light">
              Make a difference in someone's life
            </p>
          </div>
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
            {[
              {
                icon: "love-fill",
                title: "Help Save Lives",
                desc: "One donation can save up to three lives in emergency situations",
                button: "Search Donors",
              },
              {
                icon: "users-fill",
                title: "Build Healthier Society",
                desc: "Contribute to a stronger, more caring community together",
                button: "Find a donor",
              },
              {
                icon: "shield-fill",
                title: "Quick & Safe Process",
                desc: "Professional management ensures a comfortable and secure donation",
                button: "Let’s Start",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 p-5 shadow-[0_4px_50px_2px_rgba(244,63,94,0.08)] transform transition hover:scale-110 cursor-pointer bg-white rounded-2xl"
              >
                <div className="w-fit bg-[#FDEBEE] p-4 rounded-2xl text-[#F43F5E]">
                  <Icon size={25} name={item.icon} />
                </div>

                <h4 className="text-2xl font-medium">{item.title}</h4>

                <p className="font-light text-lg text-[#424242]">{item.desc}</p>

                <Button
                  className="w-fit"
                  label={item.button}
                  outline
                  iconName="arrow-outline"
                  iconPosition="right"
                />
              </div>
            ))}
          </div>
        </section>
      </Container>
      {/* Action Section */}
      <section className=" my-18 pt-10 px-2 bg-linear-to-r from-[#FFEBEF] via-white to-[#EEF2FF]">
        <Container>
          <div className="md:container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col gap-3">
              <h4 className="md:text-5xl text-3xl font-medium">
                Looking for blood <br /> request?
              </h4>
              <p className="md:w-150 font-light text-lg">
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
            <h3 className="text-3xl md:text-5xl font-semibold">
              Urgent Blood Requests
            </h3>
            <p className="text-[#424242] text-lg md:font-light">
              People who need your help right now
            </p>
          </div>
          <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
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
        className="md:w-7/12 px-5 mx-auto my-50 flex flex-col md:flex-row justify-center gap-18 "
      >
        <div className="w-full flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl text-[#F43F5E]">Contact Us</h2>
            <h3 className="text-3xl md:text-5xl font-medium">
              We're here to help. <br /> Reach out anytime.
            </h3>
            <p className="text-[#424242] text-lg md:font-light">
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
        <div className="w-full rounded-4xl py-8 px-5 md:p-8 bg-[#FEF6F7] ">
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

      <section className=" mt-18 pt-10 px-2 bg-linear-to-r from-[#FFEBEF] via-white to-[#EEF2FF]">
        <Container>
          <div className="md:container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col gap-3">
              <h4 className="md:text-5xl text-3xl font-medium">
                Be Part of the Lifesaving <br /> Mission
              </h4>
              <p className="md:w-150 font-light text-lg">
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
            <img className="pt-14" src={droplinksBox} alt="" />
          </div>
        </Container>
      </section>
    </>
  );
};

export default Home;
