import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";


export default function Profile() {
  const navigate = useNavigate();
  // State untuk mengecek apakah user sudah login atau belum
  const [isLogin, setIsLogin] = React.useState(false);

  const nama = localStorage.getItem("nama");
  const id_user = localStorage.getItem("id_user");
  const email = localStorage.getItem("email");
  React.useEffect(() => {
    const verifikasi = async () => {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
          token: localStorage.getItem("token"),
        })
        // simpan 'token' dan 'user' ke localStorage
        // jika berhasil, set localStorage 'user' dan 'token' serta redirect ke halaman profile
        .then(function (response) {
          window.lokasi = response.data.alamat;
          window.saldo = response.data.saldo;

          if (response.status == 200) {
            setIsLogin(true);
          } else {
            navigate("/login");
          }
        })
        .catch(function (error) {
          console.log(error);
          alert("Failed!"); // jika gagal, tampilkan alert 'Login Gagal'
        });
    };
    // panggil fungsi verifikasi token di bawah sini
    verifikasi();

  
  }, []);

  const handleToHome = () => {
    window.location.href = "/";
  };

  const handleLogout = async () => {
    // 1. Hapus localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("id");

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
        token: localStorage.getItem("token"),
      })
      .then(function (res) {
        localStorage.removeItem("token");
        alert("Logout Success");
      });
    // 3. Redirect ke halaman login, clue : window.location.href = "/"
    window.location.href = "/";
  };

  // if (!isLogin) {
  //   return (
  //     <>
  //     <p>not yet login</p>
  //     </>

  //   );
  // }

  return (
    <>
      <Navbar />
      <section className="relative lg:pb-24 pb-16">
        <div className="container-fluid">
          <div className="profile-banner relative text-transparent">
            <input
              id="pro-banner"
              name="profile-banner"
              type="file"
              className="hidden"
              // onChange="loadFile(event)"
            />
            <div className="relative shrink-0">
              <img
                src="https://shreethemes.in/techwind/layouts/assets/images/blog/bg.jpg"
                className="h-80 w-full object-cover"
                id="profile-banner"
                alt=""
              />
              <div className="absolute inset-0 bg-black/70"></div>
              <label
                className="absolute inset-0 cursor-pointer"
                htmlFor="pro-banner"
              ></label>
            </div>
          </div>
        </div>

        <div className="container lg:mt-24 mt-16">
          <div className="md:flex">
            <div className="lg:w-1/4 md:w-1/3 md:px-3">
              <div className="relative md:-mt-48 -mt-32">
                <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
                  <div className="profile-pic text-center mb-5">
                    <input
                      id="pro-img"
                      name="profile-image"
                      type="file"
                      className="hidden"
                      // onChange="loadFile(event)"
                    />
                    <div>
                      <div className="relative h-28 w-28 mx-auto">
                        <img
                          src="https://shreethemes.in/techwind/layouts/assets/images/client/05.jpg"
                          className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                          id="profile-image"
                          alt=""
                        />
                        <label
                          className="absolute inset-0 cursor-pointer"
                          htmlFor="pro-img"
                        ></label>
                      </div>

                      <div className="mt-4">
                        <h5 className="text-lg font-semibold"> {nama}</h5>
                        <p className="text-slate-400">{email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-700">
                    <ul
                      className="list-none sidebar-nav mb-0 mt-3"
                      id="navmenu-nav"
                    >
                      <li className="navbar-item account-menu active">
                        <a
                          href="/profile"
                          className="navbar-link text-slate-400 flex items-center py-2 rounded"
                        >
                          <span className="mr-2 text-[18px] mb-0">
                            <i className="uil uil-dashboard"></i>
                          </span>
                          <h6 className="mb-0 font-semibold">Profile</h6>
                        </a>
                      </li>

                      <li className="navbar-item account-menu">
                        <a
                          className="navbar-link text-slate-400 flex items-center py-2 rounded"
                          onClick={handleLogout}
                        >
                          <span className="mr-2 text-[18px] mb-0">
                            <i className="uil uil-power"></i>
                          </span>
                          <h6 className="mb-0 font-semibold">Sign Out</h6>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-[30px] md:mt-0">
              <div className="pb-6 border-b border-gray-100 dark:border-gray-700">
                <h5 className="text-xl font-semibold">{nama}</h5>

                <p className="text-slate-400 mt-3">Ordinary Buyer</p>
              </div>

              <div className="grid lg:grid-cols-2 grid-cols-1 gap-[30px] pt-6">
                <div>
                  <h5 className="text-xl font-semibold">Personal Details :</h5>
                  <div className="mt-6">
                    <div className="flex items-center mt-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        className="bi bi-person pr-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                      </svg>
                      <div className="flex-1">
                        <h6 className="text-indigo-600 dark:text-white font-medium mb-0">
                          ID :
                        </h6>
                        <a href="" className="text-slate-400">
                          {id_user}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        className="bi bi-envelope pr-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                      </svg>
                      <div className="flex-1">
                        <h6 className="text-indigo-600 dark:text-white font-medium mb-0">
                          Email :
                        </h6>
                        <a href="" className="text-slate-400">
                          {email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center mt-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        className="bi bi-geo-alt pr-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      </svg>
                      <div className="flex-1">
                        <h6 className="text-indigo-600 dark:text-white font-medium mb-0">
                          Location :
                        </h6>
                        <a href="" className="text-slate-400">
                          {window.lokasi}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center mt-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        className="bi bi-cash pr-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                        <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                      </svg>
                      <div className="flex-1">
                        <h6 className="text-indigo-600 dark:text-white font-medium mb-0">
                          Saldo :
                        </h6>
                        <a href="" className="text-slate-400">
                          {window.saldo}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
