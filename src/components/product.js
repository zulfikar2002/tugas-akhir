import Footer from "./footer";
import Navbar from "./navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Features from "./features";

export default function Product() {
  const { id } = useParams();
  const id_user = localStorage.getItem("id_user");
  const [data, setData] = useState([]);

  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/zulfikar2002/myjewel_json/main/myjewel.json"
      )
      .then((res) => {
        localStorage.setItem("id_item", id);
        setData(res.data[id - 1]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddCart = async (event) => {
    event.preventDefault();
    const isLogin = localStorage.getItem("token");
    if (isLogin) {
      let a = 0;
      let countItem = parseInt(count);
      a += countItem;

      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/addcart`, {
          count: a,
          id_item: id,
          id_user: id_user,
          url: data.url,
          nama: data.nama,
          harga: data.harga,
          token: localStorage.getItem("token"),
        })
        .then(function (response) {
          console.log(response);
          alert("Produk Telah Dimasukkan Dalam Keranjang");
        })
        .catch(function (error) {
          console.log(error);
          alert("Failed!");
        });
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <>
      <Navbar />
      <div className="container flex px-5">
        <div className="picture flex w-1/2 pl-24">
          <div className="colomn-picture flex flex-col justify-between px-2 bottom-0">
            <img
              src={data.url}
              alt={data.nama}
              className="py-4 object-contain object-center rounded-full h-[150px] w-[150px]"
            />
            <img
              src={data.url}
              alt={data.nama}
              className="py-4 object-contain object-center rounded-full h-[150px] w-[150px]"
            />
            <img
              src={data.url}
              alt={data.nama}
              className="py-4 object-contain object-center rounded-full h-[150px] w-[150px]"
            />
            <img
              src={data.url}
              alt={data.nama}
              className="py-4 object-contain object-center rounded-full h-[150px] w-[150px]"
            />
          </div>
          <div className="main-picture p-6 ">
            <img
              src={data.url}
              alt={data.nama}
              className=" min-h-min max-h-[500px] object-contain object-center rounded-xl"
            />
          </div>
        </div>
        <div className="product flex w-2/5 justify-center px-6 py-24">
          <div className="product-desc p-4">
            <h2 className="pb-6 text-3xl">{data.nama}</h2>
            <h3 className="pb-6 indent-10">{data.deskripsi}</h3>
            <p className="pb-6 text-xl">{formatCurrency(data.harga)}</p>
            <div className="add-cart pb-6 flex ">
              <div className="flex items-center mr-2 ">
                <button
                  className="px-3 py-1 rounded-l-lg bg-gray-300 hover:bg-gray-400"
                  onClick={decrement}
                >
                  -
                </button>
                <input
                  type="number hidden"
                  value={count}
                  className="w-12 text-center py-1 rounded-none bg-gray-10"
                />
                <button
                  className="px-3 py-1 rounded-r-lg bg-gray-300 hover:bg-gray-400"
                  onClick={increment}
                >
                  +
                </button>
              </div>
              <a
                href="#"
                onClick={handleAddCart}
                className="bg-gradient-to-r from-rose-700 via-rose-600 to-pink-600 text-white rounded-lg bg flex justify-center items-center p-3 z-10 w-full"
              >
                Add to cart
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <Features />
      </div>

      <Footer />
    </>
  );
}

function formatCurrency(value) {
  return Number(value).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
}
