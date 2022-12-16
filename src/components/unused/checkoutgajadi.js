import Footer from "../footer";
import Navbar from "../navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Checkout() {
  let sumPrice = 0;
  let standardShipping = 10;

  const [items, setItems] = useState([]);
  const qtyItems = items.length;
  useEffect(() => {
    axios
      .post("https://backend-web-production.up.railway.app/checkout", {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/zulfikar2002/myjewel_json/main/myjewel.json"
      )
      .then((res) => {
        setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [count, setCount] = useState([window.sumItem]);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  // const [inputCounters, setInputCounters] = useState([0 ]);

  // const increment = (index) => {
  //   const newInputCounters = [...inputCounters];
  //   newInputCounters[index] += 1;
  //   setInputCounters(newInputCounters);
  // };

  // const decrement = (index) => {
  //   const newInputCounters = [...inputCounters];
  //   if (newInputCounters[index] > 0) {
  //     newInputCounters[index] -= 1;
  //     setInputCounters(newInputCounters);
  //   }
  // };

  const handleCheckout = () => {};

  const handleRemove = async (event,indexItem) => {
    event.preventDefault();
    // const remove = document.getElementById(indexItem)
    console.log(indexItem)
  };

  

  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        <div className="container mx-auto mt-10">
          <div className="flex shadow-md my-10">
            <div className="w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">{qtyItems} Items</h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                  Quantity
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                  Price
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                  Total
                </h3>
              </div>

              <div className="flex flex-col  hover:bg-gray-100 -mx-8 px-6 py-5">
                {items.map((item) => {
                  const indexItem = item.id_item;

                  window.x = item.id_item;

                  window.a = parseInt(info[indexItem].harga) * item.sum;

                  sumPrice += window.a;

                  window.sumItem = item.sum;


                  return (
                    
                    <div
                      key={item.id_item}
                      className="flex flex-row mb-4 items-center justify-between"
                    >
                      <div className="flex w-2/5">
                        <div className="w-20">
                          <img
                            className="h-24"
                            src={info[indexItem].url}
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                          <span className="font-bold text-sm">
                            {info[indexItem].nama}
                          </span>
                          <a
                            id={info[indexItem].nama}
                            onClick={handleRemove(info[indexItem].nama)}
                            className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                          >
                            Remove
                          </a>
                        </div>
                      </div>

                      {/* {inputCounters.map((counter,index)=>(
                        <div className="flex justify-center w-1/5">
                        <button
                          className="px-3 py-1 rounded-l-lg bg-gray-300 hover:bg-gray-400"
                          onClick={()=>decrement(index)}
                        >
                          -
                        </button>
                        <input
                          readOnly
                          type="number hidden"
                          value={counter}
                          className=" py-1 w-12 text-center rounded-none bg-gray-10"
                        />
                        <button
                          className="px-3 py-1 rounded-r-lg bg-gray-300 hover:bg-gray-400"
                          onClick={()=>increment(index)}
                        >
                          +
                        </button>
                      </div>
                      ))} */}




                      <div className="flex justify-center w-1/5" id={item.id_item}>
                        <button
                          
                          className="px-3 py-1 rounded-l-lg bg-gray-300 hover:bg-gray-400"
                          onClick={decrement}
                        >
                          -
                        </button>
                        <input
                          readOnly
                          type="number hidden"
                          value={item.sum}
                          className=" py-1 w-12 text-center rounded-none bg-gray-10"
                        />
                        <button
                          className="px-3 py-1 rounded-r-lg bg-gray-300 hover:bg-gray-400"
                          onClick={increment}
                        >
                          +
                        </button>
                      </div>
                      <span className="text-center w-1/5 font-semibold text-sm">
                        {parseInt(info[indexItem].harga)}K
                      </span>
                      <span className="text-center w-1/5 font-semibold text-sm">
                        {parseInt(info[indexItem].harga) * item.sum}K
                      </span>
                    </div>
                  );
                })}
              </div>

              <a
                href="/collection"
                className="flex font-semibold text-indigo-600 text-sm mt-10"
              >
                <svg
                  className="fill-current mr-2 text-indigo-600 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </a>
            </div>

            <div id="summary" className="w-1/4 px-8 py-10">
              <h1 className="font-semibold text-2xl border-b pb-8">
                Order Summary
              </h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  Items {qtyItems}
                </span>
                <span className="font-semibold text-sm">{sumPrice}K</span>
              </div>
              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">
                  Shipping
                </label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                  <option>Standard shipping - 10K</option>
                </select>
              </div>
              <div className="py-10">
                <label
                  htmlFor="promo"
                  className="font-semibold inline-block mb-3 text-sm uppercase"
                >
                  Enter Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="p-2 text-sm w-full"
                />
              </div>
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>{sumPrice + standardShipping}K</span>
                </div>
                <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
