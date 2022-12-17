import Navbar from "./navbar";
import axios from "axios";
import React from "react";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

function Header({ itemCount }) {
  return (
    <header className="container w-11/12 my-5 mx-auto overflow-auto mb-6">
      <span className="count float-right ">{itemCount} items in the Cart</span>
    </header>
  );
}

function ProductList({ products, onChangeProductQuantity, onRemoveProduct }) {
  return (
    <section className="container w-11/12 my-0 mx-auto overflow-auto">
      <ul className="products border-b flex flex-col  border-solid border-cyan-200 p-0 m-0 list-none">
        {products.map((product, index) => {
          const a = parseInt(product.jumlah);
          const b = formatCurrency(parseInt(product.harga));

          return (
            <li
              className="row flex flex-row relative overflow-auto w-full py-4 px-0 border-b border-solid border-cyan-200"
              key={index}
            >
              <div className="col left w-3/4 justify-between flex flex-row float-left">
                <div>
                  
                    <img
                      className=" w-[150px] h-[150px]  rounded"
                      src={product.url}
                      alt="pic"
                    />
                  
                </div>
                <div className="detail ml-[-400px] py-0 px-2 leading-8">
                  <div className="name text-xl">
                    <a
                      href="#"
                      className="no-underline text-red-300 hover:text-green-300"
                    >
                      {product.nama}
                    </a>
                  </div>
                  <div className="price text-2xl">{b}</div>
                </div>
                <div className="quantity w-1/5 mt-6 text-center float-left">
                  <input
                    type="text"
                    className="quantity w-1/2 border-2 border-black text-center float-left transition-all duration-300 outline-none"
                    step="1"
                    value={a}
                    onChange={(event) => onChangeProductQuantity(index, event)}
                  />
                </div>
              </div>

              <div className="col right float-left w-1/4 relative right-0 top-2">
                <div className="remove w-1/2 text-center">
                  <svg
                    onClick={() => onRemoveProduct(index)}
                    version="1.1"
                    className="close w-14 h-14 cursor-pointer fill-amber-400 hover:fill-red-400"
                    x="0px"
                    y="0px"
                    viewBox="0 0 60 60"
                    enableBackground="new 0 0 60 60"
                  >
                    <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812" />
                  </svg>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Summary({
  subTotal,
  discount,
  tax,
  onEnterPromoCode,
  checkPromoCode,
  handleCheckout,
  products,
}) {
  const total = subTotal - discount + tax;

  return (
    <section className="container flex flex-col w-10/12 my-0 mx-auto overflow-auto">
      <div className="flex flex-row">
        <div className="promotion float-left w-full mt-4">
          <label htmlFor="promo-code" className="float-left w-full mb-4">
            Have A Promo Code?
          </label>
          <input
            type="text"
            className=" border-2 border-black rounded float-left w-4/5 text-base py-2 pr-0 pl-7 hover:border-yellow-400"
            onChange={onEnterPromoCode}
          />
          <button
            className="bg-gradient-to-r  from-rose-700 via-rose-600 to-pink-600 border-2 float-left w-1/5 px-0 py-2 rounded-sm hover:border-orange-700 after:content-['\276f'] after:text-sm text-white cursor-pointer hover:text-blue-700"
            type="button"
            onClick={checkPromoCode}
          />
        </div>

        <div className="summary text-xl text-right flex flex-col float-left w-full mt-4">
          <ul className="p-0 m-0 list-none">
            <li className="px-0 py-2">
              Subtotal{" "}
              <span className="inline-block w-1/3">
                {formatCurrency(subTotal)}
              </span>
            </li>
            {discount > 0 && (
              <li className="px-0 py-2">
                Discount{" "}
                <span className="inline-block w-1/3">
                  {formatCurrency(discount)}
                </span>
              </li>
            )}
            <li className="px-0 py-2">
              Tax{" "}
              <span className="inline-block w-1/3">{formatCurrency(tax)}</span>
            </li>
            <li className="total font-bold px-0 py-2">
              Total{" "}
              <span className="inline-block w-1/3">
                {formatCurrency(total)}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="checkout flex flex-row justify-end text-left  mt-4">
        <form action="" onSubmit={(event)=>handleCheckout(products,event)}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative float-right block mb-2 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <button
            className="bg-gradient-to-r  from-rose-700 via-rose-600 to-pink-600  text-white float-right border-2 text-lg py-3 px-11 rounded-3xl cursor-pointer hover:text-blue-700"
            type="submit"
          >
            Check Out
          </button>
        </form>
      </div>
    </section>
  );
}

const PROMOTIONS = [
  {
    code: "SUMMER",
    discount: "50%",
  },
  {
    code: "AUTUMN",
    discount: "40%",
  },
  {
    code: "WINTER",
    discount: "30%",
  },
];
const TAX = 5000;

export default function Page() {
  React.useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/checkout`, {
        token: localStorage.getItem("token"),
      })
      .then(function (response) {
        setProducts(response.data);
      })

      .catch(function (error) {
        console.log(error);
        alert("Failed!");
      });
  }, []);

  const [products, setProducts] = React.useState([]);
  const [promoCode, setPromoCode] = React.useState("");
  const [discountPercent, setDiscountPercent] = React.useState(0);

  const itemCount = products.reduce((jumlah, product) => {
    return jumlah + +product.jumlah;
  }, 0);
  const subTotal = products.reduce((total, product) => {
    return total + product.harga * +product.jumlah;
  }, 0);
  const discount = (subTotal * discountPercent) / 100;

  const onChangeProductQuantity = (index, event) => {
    const value = event.target.value;
    const valueInt = parseInt(value);
    const cloneProducts = [...products];
    console.log(value);

    // Minimum quantity is 1, maximum quantity is 100, can left blank to input easily
    if (value === "") {
      cloneProducts[index].jumlah = 0;
    } else if (valueInt > 0 && valueInt <= 1000) {
      cloneProducts[index].jumlah = valueInt;
    }

    setProducts(cloneProducts);
  };

  const onRemoveProduct = (i) => {
    const filteredProduct = products.filter((product, index) => {
      console.log(product[0])
      return index != i;
    });
    console.log(filteredProduct[0].id_item);

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/removecart`, {
        token: localStorage.getItem("token"),
        id_item: filteredProduct[0].id_item,
      })
      .then(function (response) {
        console.log(response);
        setProducts(response.data);
      })

      .catch(function (error) {
        console.log(error);
        alert("Failed!");
      });
  };

  const onEnterPromoCode = (event) => {
    setPromoCode(event.target.value);
  };

  const checkPromoCode = () => {
    for (var i = 0; i < PROMOTIONS.length; i++) {
      if (promoCode === PROMOTIONS[i].code) {
        setDiscountPercent(parseFloat(PROMOTIONS[i].discount.replace("%", "")));

        return;
      }
    }

    alert("Sorry, the Promotional code you entered is not valid!");
  };

  const handleCheckout =(products, event)=>{
    const data = new FormData(event.currentTarget);
    console.log(products)
    axios
      .post(`https://backend-web-production.up.railway.app/productlog`, {
        token: localStorage.getItem("token"),
        password: data.get("password"),
        id_item:products.id_item,
        jumlah:products.jumlah,
        harga:products.harga*products.jumlah,

      })
      .then(function (response) {
        console.log(response);
        alert("checkout berhasil");
      })

      .catch(function (error) {
        console.log(error);
        alert("Failed!");
      });

  }
  const navigate=useNavigate();

  return (
    <div>
      <Navbar />
      <Header itemCount={itemCount} />

      {products.length > 0 ? (
        <div>
          <ProductList
            products={products}
            onChangeProductQuantity={onChangeProductQuantity}
            onRemoveProduct={onRemoveProduct}
          />

          <Summary
            subTotal={subTotal}
            discount={discount}
            tax={TAX}
            onEnterPromoCode={onEnterPromoCode}
            checkPromoCode={checkPromoCode}
            handleCheckout={handleCheckout}
            products={products}
          />
          <Footer/>
        </div>
      ) : (
        <div className="empty-product text-center">
          <h3>Buy Some Product?</h3>
          <a
            className="bg-red-500 border-2 text-xl px-7 py-2 rounded text-blue-500 cursor-pointer hover:bg-green-500 "
            href="/collection"
          >
            Collection
          </a>
        </div>
      )}
    </div>
  );
}


function formatCurrency(value) {
  return Number(value).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
}
