import  { useState, useEffect } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://event-management-server.vercel.app/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await axios.patch(
        `https://event-management-server.vercel.app/users/${userId}`,
        { role: newRole }
      );
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="text-left border p-2">Name</th>
            <th className="text-left border p-2">Email</th>
            <th className="text-left border p-2">Role</th>
            <th className="text-left border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              className={`${index % 2 === 0 ? "bg-gray-100" : ""}`}
            >
              <td className="py-2 border p-2">{user.name}</td>
              <td className="py-2 border p-2">{user.email}</td>
              <td className="py-2 border p-2">{user.role}</td>
              <td className="py-2 border p-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => updateUserRole(user._id, "organizer")}
                    disabled={user.role === "organizer"}
                    className={`px-4 py-2 rounded-md text-white font-medium shadow-md transition-colors ${
                      user.role === "organizer"
                        ? "bg-gray-400"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    Make Organizer
                  </button>
                  <button
                    onClick={() => updateUserRole(user._id, "admin")}
                    disabled={user.role === "admin"}
                    className={`px-4 py-2 rounded-md text-white font-medium shadow-md transition-colors ${
                      user.role === "admin"
                        ? "bg-gray-400"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => updateUserRole(user._id, "user")}
                    disabled={user.role === "user" || user.role === ""}
                    className={`px-4 py-2 rounded-md text-white font-medium shadow-md transition-colors ${
                      user.role === "user"
                        ? "bg-gray-400"
                        : "bg-purple-500 hover:bg-purple-600"
                    }`}
                  >
                    Make User
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
