// Get role
export const getRole = async (email) => {
    const response = await fetch(`http://localhost:5000/users/${email}`);
    const user = await response.json();
    return user?.role;
  };
  