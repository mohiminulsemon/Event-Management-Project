 // save a user to database
export const saveUser = user => {
  const currentUser = {
    email: user.email,
    name: user.displayName,
  }

  fetch(`https://event-management-server.vercel.app/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(currentUser),
  })
    .then(res => res.json())
    .then(data => console.log(data))
}

// Get role
export const getRole = async (email) => {
    const response = await fetch(`https://event-management-server.vercel.app/users/${email}`);
    const user = await response.json();
    return user?.role;
  };