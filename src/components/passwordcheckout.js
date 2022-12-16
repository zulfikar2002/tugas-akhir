import pic from "./asset/icon.png";
import axios from "axios";

export default function Passwordcheckout() {
  const handleCheckoutSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      password: data.get("password"),
    });
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/finalcheckout`, {
        password: data.get("password"),
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
        alert("Failed!"); // jika gagal, tampilkan alert 'Login Gagal'
      });
  };

  return (
    <>
      <div className="flex z-50  bg-transparent min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-pink-700">
            <img className="mx-auto h-64 w-auto" src={pic} alt="Your Company" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Enter Your Password
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" onSubmit={handleCheckoutSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
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
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Checkout
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
