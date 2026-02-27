import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const API = "http://localhost:3000/users";

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Add user
  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      if (editingId) {
        // UPDATE
        await axios.put(`${API}/${editingId}`, { name });
        setEditingId(null);
      } else {
        // CREATE
        console.log("Sending name:", name);
        await axios.post(API, { name });
        setMessage("User added successfully ✅");
        setError(null);
        setTimeout(() => setMessage(null), 3000);
      }

      setName("");
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
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
    setMessage("User deleted successfully ✅");
    setError(null);
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Full Stack User Manager</h1>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="form">
          <input
            type="text"
            placeholder="Enter name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleSubmit}>
            {editingId ? "Update User" : "Add User"}
          </button>
        </div>
        {loading && <div className="loader"></div>}
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <span>{user.name}</span>
              <div>
                <button
                  onClick={() => {
                    setName(user.name);
                    setEditingId(user._id);
                  }}
                >
                  Edit
                </button>

                <button className="delete" onClick={() => deleteUser(user._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
