import { useEffect, useState } from "react";
import axios from "axios"; // Import axios for API requests
import Layout from "../../Layouts/Layouts";

const UserList = () => {
  const [users, setUsers] = useState([]); // State to hold user data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(""); // State to hold error messages

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        const response = await axios.get(`http://localhost:3000/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token in the headers
          },
        });
        setUsers(response.data); // Update state with fetched user data
      } catch (error) {
        setError("Error fetching users"); // Handle errors
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUsers(); // Call the fetch function
  }, []);

  // Render loading, error, or user data
  return (
    <>
      <Layout>
        <div>
          <h1>User List</h1>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center border-b py-2"
              >
                <p>
                  {user.name} ({user.email})
                </p>
              </div>
            ))
          ) : (
            <p>No users available</p>
          )}
        </div>
      </Layout>
    </>
  );
};

export default UserList;
