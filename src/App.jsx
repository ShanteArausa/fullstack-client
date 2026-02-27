import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const API = "http://localhost:3000/users";

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(API);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Add user
  const addUser = async () => {
    if (!name.trim()) return;

    try {
      await axios.post(API, { name });
      setName("");
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
  <div className="container">
    <div className="card">
      <h1>Full Stack User Manager</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Enter name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <span>{user.name}</span>
            <button
              className="delete"
              onClick={() => deleteUser(user._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}

export default App;