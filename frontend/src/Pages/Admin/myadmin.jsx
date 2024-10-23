import React, { useState, useEffect } from "react";

function MyAdmin() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [view, setView] = useState("orders"); // Default view
  const [errorDetails, setErrorDetails] = useState(null); // State for error details

  const apiBaseUrl = "http://localhost:3000/api"; // Updated API base URL
  
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    if (view === "orders") fetchOrders();
    if (view === "products") fetchProducts();
    if (view === "users") fetchUsers();
  }, [view]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/orders`,
         {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/products`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.message);
    }
  };

  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the user with ID: ${userId}?`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch("http://localhost:3010/api/users/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token for delete request
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorDetails(errorData);
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((user) => user._id !== userId));
      setErrorDetails(null);
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error.message);
    }
  };

  const handleViewChange = (viewType) => {
    setView(viewType);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "20%",
          backgroundColor: "#f4f4f4",
          padding: "20px",
          borderRight: "1px solid #ddd",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#007bff" }}>Admin Menu</h2>
        <button
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: view === "orders" ? "#007bff" : "#f0f0f0",
            color: view === "orders" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleViewChange("orders")}
        >
          Orders
        </button>
        <button
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: view === "products" ? "#007bff" : "#f0f0f0",
            color: view === "products" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleViewChange("products")}
        >
          Products
        </button>
        <button
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            backgroundColor: view === "users" ? "#007bff" : "#f0f0f0",
            color: view === "users" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleViewChange("users")}
        >
          Users
        </button>
      </div>

      <div
        style={{
          width: "80%",
          padding: "20px",
          overflowY: "scroll",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          {view === "orders"
            ? "Orders Data"
            : view === "products"
            ? "Products Data"
            : "Users Data"}
        </h2>
        {error ? (
          <div style={{ color: "red", fontWeight: "bold" }}>{error}</div>
        ) : view === "orders" ? (
          <ul>
            {orders.map((order) => (
              <li
                key={order._id}
                style={{
                  marginBottom: "20px",
                  padding: "15px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  listStyle: "none",
                }}
              >
                <strong>Order ID:</strong> {order._id} <br />
                <strong>User ID:</strong> {order.user} <br />
                <strong>Shipping Address:</strong>{" "}
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.country} <br />
                <strong>Items:</strong>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item._id} style={{ listStyleType: "circle" }}>
                      {item.name} - {item.qty} x ${item.price}
                    </li>
                  ))}
                </ul>
                <strong>Total Price:</strong> ${order.totalPrice} <br />
                <strong>Payment Method:</strong> {order.paymentMethod} <br />
                <strong>Paid:</strong> {order.isPaid ? "Yes" : "No"} <br />
                <strong>Delivered:</strong> {order.isDelivered ? "Yes" : "No"}
              </li>
            ))}
          </ul>
        ) : view === "products" ? (
          <ul>
            {products.map((product) => (
              <li
                key={product._id}
                style={{
                  marginBottom: "20px",
                  padding: "15px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  listStyle: "none",
                }}
              >
                <strong>Product Name:</strong> {product.name} <br />
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                />
                <br />
                <strong>Price:</strong> ${product.price} <br />
                <strong>Stock:</strong> {product.countInStock} units <br />
                <strong>Rating:</strong> {product.rating} / 5 (
                {product.numReview} reviews)
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {users.map((user) => (
              <li
                key={user._id}
                style={{
                  marginBottom: "20px",
                  padding: "15px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  listStyle: "none",
                }}
              >
                <strong>User ID:</strong> {user._id} <br />
                <strong>Name:</strong> {user.name} <br />
                <strong>Email:</strong> {user.email} <br />
                <strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"} <br />
                <button
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                  onClick={() => deleteUser(user._id)} // Send userId to delete function
                >
                  Delete User
                </button>
              </li>
            ))}
          </ul>
        )}
        {errorDetails && (
          <div
            style={{
              color: "red",
              marginTop: "20px",
              backgroundColor: "#f8d7da",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <strong>Error Details:</strong>
            <pre>{JSON.stringify(errorDetails, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAdmin;
