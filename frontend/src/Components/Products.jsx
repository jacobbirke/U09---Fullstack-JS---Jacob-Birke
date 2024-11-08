import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../Redux/Actions/Product";
import { Link } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const ProductListReducer = useSelector((state) => state.ProductListReducer);
  const { loading, error, products = [] } = ProductListReducer;

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  // Function to handle search query changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="container mx-auto px-5 py-10">
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-4 rounded-full border-2 border-gray-300 shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <svg
              className="h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 3a8 8 0 100 16 8 8 0 000-16zM21 21l-4.35-4.35"
              />
            </svg>
          </div>
        </div>

        {loading ? (
          <h1 className="text-center text-2xl font-bold">Loading...</h1>
        ) : error ? (
          <h1 className="text-center text-2xl text-red-600">{error}</h1>
        ) : (
          <section className="text-gray-600 body-font">
            <div className="flex flex-wrap -m-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div className="p-4 lg:w-1/4 md:w-1/2" key={product._id}>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 duration-300 flex flex-col h-full">
                      <Link to={`/products/${product._id}`} className="flex-grow">
                        <div className="w-full overflow-hidden flex justify-center items-center mb-6 lg:mb-0">
                          {/* Image for mobile and tablet */}
                          <img
                            src={product.image}
                            alt={`Image of ${product.name}`}
                            className="object-contain transition duration-300 transform hover:scale-110 lg:hidden"
                          />
                          {/* Image for laptop and desktop */}
                          <img
                            src={product.image}
                            alt={`Image of ${product.name}`}
                            className="object-cover object-center rounded hidden lg:block lg:w-1/2 lg:h-auto"
                          />
                        </div>
                      </Link>
                      <div className="p-4 flex flex-col justify-between flex-grow">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                          <Link
                            to={`/products/${product._id}`}
                            className="hover:text-blue-500"
                          >
                            {product.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          Number of reviews:{" "}
                          <span className="font-semibold">
                            {product.numReview}
                          </span>
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {product.price} kr
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h2 className="text-center text-xl font-medium text-gray-600 w-full">
                  No products available.
                </h2>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Products;
