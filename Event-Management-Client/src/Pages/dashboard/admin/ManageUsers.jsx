import  { useState, useEffect } from 'react';
import axios from 'axios';


const ManageUsers = () => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        // Fetch user data from the server when the component mounts
        fetchUsers();
    }, []);


    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    const updateUserRole = async (userId, newRole) => {
        try {
            // Make a PATCH request to update the user's role on the server
            const response = await axios.patch(`http://localhost:5000/users/${userId}`, { role: newRole });


            // Update the user's role on the client-side after successful server update
            const updatedUsers = users.map(user =>
                user._id === userId ? { ...user, role: newRole } : user
            );
            setUsers(updatedUsers);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {users.map(user => (
                    <div
                        key={user._id}
                        className="user-card border-2 border-dashed border-blue-500 bg-white p-4 rounded-lg shadow-md flex flex-col items-center gap-4"
                    >
                        <img
                            src={user.photoURL}
                            alt={user.name}
                            className="w-20 h-20 rounded-full"
                        />
                        <div className="flex flex-col items-center gap-2">
                            <h3 className="text-xl font-semibold">{user.name}</h3>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-sm">Role: {user.role}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => updateUserRole(user._id, 'organizer')}
                                className={`px-4 py-2 rounded-md text-white font-medium shadow-md transition-colors ${user.role === 'organizer' ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                            >
                                Make Organizer
                            </button>
                            <button
                                onClick={() => updateUserRole(user._id, 'admin')}
                                className={`px-4 py-2 rounded-md text-white font-medium shadow-md transition-colors ${user.role === 'admin' ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'}`}
                            >
                                Make Admin
                            </button>
                            <button
                                onClick={() => updateUserRole(user._id, 'user')}
                                className={`px-4 py-2 rounded-md text-white font-medium shadow-md transition-colors ${user.role === 'user' ? 'bg-purple-600' : 'bg-purple-500 hover:bg-purple-600'}`}
                            >
                                Make User
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default ManageUsers;
