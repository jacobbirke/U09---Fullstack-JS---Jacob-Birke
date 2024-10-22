import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layouts/Layouts";
import { UserLoginAction } from "../../Redux/Actions/User";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const UserLoginReducer = useSelector((state) => state.UserLoginReducer);

  const { loading, error } = UserLoginReducer;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(UserLoginAction(email, password));
  };
  return (
    <>
      <Layout>
        {loading ? (
          <h1>loading</h1>
        ) 
        // : error ? (
        //   <h1>{error}</h1>
        // ) 
        : (
          <>
            <form
              className="max-w-sm mx-auto h-screen"
              onSubmit={submitHandler}
            >
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Håkan"
                  required
                  value={email || ""} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="******"
                  required
                  value={password || ""} 
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-start mb-5">
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
            </form>
          </>
        )}
      </Layout>
    </>
  );
}
