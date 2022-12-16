import Navbar from "./navbar";
import Footer from "./footer";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Collection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/zulfikar2002/myjewel_json/main/myjewel.json"
      )
      .then((res) => {
        localStorage.removeItem('id_item');
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <a
                key={product.id}
                defaultValue={product.id}
                href={"/product/" + product.id}
                className="group"
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.url}
                    alt={product.deskripsi}
                    className="h-96 w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.nama}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                {formatCurrency(product.harga)}
                </p>
              </a>
            ))}
          </div>
        </div>
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
