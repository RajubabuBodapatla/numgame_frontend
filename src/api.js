// api.js
export const registerUser = async (id, username, password, email) => {
    const res = await fetch('https://numgame-backend.onrender.com/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, username, password, email}),
    });
    return res.json();
  };
  
  export const loginUser = async (username, password) => {
    const res = await fetch('https://numgame-backend.onrender.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    return res.json();
  };
  
 