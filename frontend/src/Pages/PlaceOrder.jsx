import { useDispatch, useSelector } from "react-redux";
import Layout from "./../Layouts/Layouts";
import { CartReducer } from "./../Redux/Reducers/Cart";
import CartItem from "../Components/CartItem";
import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { BASE_URL } from "../Redux/Constants/BASE_URL";
import { orderAction } from "../Redux/Actions/Order";
import axios from "axios";
import { SaveShippingAddressAction } from './../Redux/Actions/Cart';

export default function PlaceOrder() {
  const cart = useSelector((state) => state.CartReducer);
  const { cartItems, shippingAddress } = cart;

  // subtotal med frakt utan moms
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // subtotal
  const subtotal = addDecimal(
    cartItems.reduce((total, item) => total + item.qty * item.price, 0)
  );
  const taxPrice = addDecimal(Number(0.15 * subtotal).toFixed(2));
  const shippingPrice = addDecimal(subtotal > 100 ? 0 : 20);

  // total
  const total = (
    Number(subtotal) +
    Number(taxPrice) +
    Number(shippingPrice)
  ).toFixed(2);

  // shipping address formulär
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postCode, setPostCode] = useState(shippingAddress.postCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const [clientId, setClientId] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false); // New state for order confirmation
  useEffect(() => {
    getPaypalClientID();
  }, []);

  const getPaypalClientID = async () => {
    const response = await axios.get(`${BASE_URL}/api/config/paypal`);
    const fetchedClientId = response.data;
    setClientId(fetchedClientId);
  };

  const dispatch = useDispatch();
  const successPaymentHandler = async (paymentResult) => {
    try {
      dispatch(
        orderAction({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          totalPrice: total,
          paymentMethod: "paypal",
          price: subtotal,
          taxPrice: taxPrice,
          shippingPrice: shippingPrice,
        })
      );
      setOrderPlaced(true); // Set orderPlaced to true after successful payment
    } catch (err) {
      console.log(err);
    }
  };

  const saveShippingAddress = () => {
    dispatch(
      SaveShippingAddressAction({
        address,
        city,
        postCode,
        country,
      })
    );
  };

  return (
    <>
      <Layout>
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-20 mx-auto">
            {orderPlaced ? ( // Conditional rendering for thank you message
              <div className="text-center">
                <h2 className="text-lg font-bold mb-4">Thank You for Your Order!</h2>
                <p className="text-gray-700">Your order has been placed successfully.</p>
              </div>
            ) : (
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    Order Summary
                  </h2>

                  <p className="leading-relaxed mb-4">
                    <CartItem cartItems={cartItems}></CartItem>
                  </p>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="ml-auto text-gray-900">${subtotal}</span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Moms</span>
                    <span className="ml-auto text-gray-900">${taxPrice}</span>
                  </div>
                  <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                    <span className="text-gray-500">Shipping</span>
                    <span className="ml-auto text-gray-900">
                      ${shippingPrice}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      ${total}
                    </span>
                  </div>
                </div>

                <div className="lg:w-1/3 md:w-1/2 p-1 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 ">
                  <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                    Shipping Address
                  </h2>
                  <div className="relative mb-4">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="relative mb-4">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="relative mb-4">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Postcode
                    </label>
                    <input
                      type="text"
                      id="postocde"
                      name="postocde"
                      value={postCode}
                      onChange={(e) => setPostCode(e.target.value)}
                      className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="relative mb-2">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <button
                    onClick={saveShippingAddress}
                    className=" mb-10 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Save Shipping Address
                  </button>
                  {clientId && (
                    <PayPalScriptProvider options={{ clientId: clientId }}>
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  currency_code: "USD",
                                  value: total,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then(function (details) {
                            successPaymentHandler(details);
                          });
                        }}
                      />
                    </PayPalScriptProvider>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}
