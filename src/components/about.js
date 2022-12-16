import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import pic1 from "./member/aop.png";
import pic2 from "./member/iqy.png";
import pic3 from "./member/rendy.jpg";
import pic4 from "./member/zul.jpg";

export default function About() {
  const members = [
    {
      name: "Adriel",
      position: "Front-End Developer",
      description:
        "Kalau ga Full-Stuck, ya Full-Snack",
      github: "https://github.com/adrielop",
      linkedin : "https://www.linkedin.com/in/adriel-omarpadu-pandiangan-197b9123a/",
      instagram: "https://www.instagram.com/adrielopandiangan/",
      pic : pic1
    },
    {
      name: "Rizqi",
      position: "Back-End Developer",
      description:
        "Backend, Backend, Backend Jaya, Jaya, Jaya",
        github: "https://github.com/Iqyyy",
      linkedin : "https://www.linkedin.com/in/mhd-rizqi-nasution-467b85216/",
      instagram: "https://www.instagram.com/rizqi_nasution/",
      pic : pic2
    },
    {
      name: "Rendy",
      position: "UI/UX Designer",
      description:
        "u and i , u and ex",
        github: "https://github.com/Rendy1906",
      linkedin : "http://www.linkedin.com/in/rendy-cahya-aditya",
      instagram: "https://www.instagram.com/rendychydty/",
      pic : pic3
    },
    {
      name: "Zulfikar",
      position: "Database Engineer",
      description:
        "ERD, Flowchart, 3NF",
        github: "https://github.com/zulfikar2002",
      linkedin : "https://www.linkedin.com/in/zulfikar-zahir/",
      instagram: "https://www.instagram.com/zulfikar_zahir/",
      pic : pic4
    },
  ];
  return (
    <>
      <Navbar />
      <div className="container flex justify-center mx-auto pt-16">
        <div>
          <p className="text-gray-500 text-lg text-center font-normal pb-3">
            BUILDING TEAM
          </p>
          <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">
            The Talented People Behind the Scenes of the Organization
          </h1>
        </div>
      </div>

      <div className="w-full  bg-gray-100 px-10 pt-10">
        <div className="container mx-auto">
          <div className="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around">
            {members.map((member) => (
              <div className="xl:w-1/5 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                <div className="rounded overflow-hidden shadow-md bg-white">
                  <div className="absolute -mt-20 w-full flex justify-center">
                    <div className="h-32 w-32">
                      <img
                        src={member.pic}
                        alt
                        className="rounded-full object-cover h-full w-full shadow-md"
                      />
                    </div>
                  </div>
                  <div className="px-6 mt-16">
                    <div className="font-bold text-3xl text-center pb-1">
                      {member.name}
                    </div>
                    <p className="text-gray-800 text-sm text-center">
                      {member.position}
                    </p>
                    <p className="text-center text-gray-600 text-base pt-3 font-normal">
                      {member.description}
                    </p>
                    <div className="w-full flex justify-center pt-5 pb-5">
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="mx-5">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-github"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                          </svg>
                        </div>
                      </a>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="mx-5">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-linkedin"
                          >
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                          </svg>
                        </div>
                      </a>
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="mx-5">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-instagram"
                          >
                            <rect
                              x={2}
                              y={2}
                              width={20}
                              height={20}
                              rx={5}
                              ry={5}
                            />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
