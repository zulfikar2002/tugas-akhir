import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Account from "./account";
import pic from "./asset/icon2.png";
import axios from "axios";

const ShowLogin = () => {
  return (
    <>
      <a
        href="/login"
        className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      >
        Login
      </a>
    </>
  );
};

export default function Navbar() {
  const navigate = useNavigate();

  // // State untuk mengecek apakah user sudah login atau belum
  const [isLogin, setIsLogin] = React.useState(false);

  React.useEffect(() => {
    // 2. buat fungsi verifikasi token yang sama seperti di halaman home
    const verifikasi = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/verify`,
          {
            token: localStorage.getItem("token"),
          }
        );

        if (response.status == 200) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
          if (!isLogin) {
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.removeItem("id");
            localStorage.removeItem("saldo");
            localStorage.removeItem("id_item");
            localStorage.removeItem("lokasi");
            localStorage.removeItem("token");
            localStorage.removeItem("nama");
            localStorage.removeItem("id_user");
          }
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        localStorage.removeItem("saldo");
        localStorage.removeItem("id_item");
        localStorage.removeItem("lokasi");
        localStorage.removeItem("token");
        localStorage.removeItem("nama");
        localStorage.removeItem("id_user");
      }
    };
    // panggil fungsi verifikasi token di bawah sini
    verifikasi();
  }, []);

  const handleCheckout = async (event) => {
    event.preventDefault();
    const isLogin = localStorage.getItem("token");
    if (isLogin) {
      window.location.href = "/checkout";
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-rose-700 via-rose-600 to-pink-600 border-gray-200 px-2 sm:px-4  dark:bg-gray-900">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="/" className="flex items-center">
            <img src={pic} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              My Jewel
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col items-center p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium ">
              <li>
                <a
                  href="/collection"
                  className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Collection
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>
              <li>{isLogin ? <Account /> : <ShowLogin />}</li>
              <li>
                <button
                  onClick={handleCheckout}
                  type="button"
                  className="text-pink-600 bg-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    aria-hidden="true"
                    className="mr-2 -ml-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                  </svg>
                  Cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
