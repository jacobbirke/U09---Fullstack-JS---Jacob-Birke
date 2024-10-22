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
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-5 py-10">
        {/* Search Bar */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 duration-300">
                      <Link to={`/products/${product._id}`}>
                        <div className="h-48 w-full overflow-hidden">
                          <img
                            src={product.image}
                            alt={`Image of ${product.name}`}
                            className="h-full w-full object-contain transition duration-300 transform hover:scale-110"
                          />
                        </div>
                      </Link>
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                          <Link to={`/products/${product._id}`} className="hover:text-blue-500">
                            {product.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          Number of reviews: <span className="font-semibold">{product.numReview}</span>
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {product.price} kr
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h2 className="text-center text-xl font-medium text-gray-600 w-full">No products available.</h2>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Products;
