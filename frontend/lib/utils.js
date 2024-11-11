'use client'
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import Cookies from 'js-cookie';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// const token = localStorage.getItem("token");
export const getAdmin = async () => {
  try {
    // Check for token in localStorage
    // const token = localStorage.getItem("token");
    const token = Cookies.get('admintoken')
    if (!token) {
      console.warn('No token found in cookie');
      return null;
    }

    // Make the request to fetch admin data
    const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    // Log status code and any non-OK response body for debugging
    if (!res.ok) {
      console.error(`Failed to fetch admin: Status ${res.status}`);
      const errorText = await res.text();
      console.error("Response:", errorText);
      return null;
    }

    // Try parsing response JSON
    try {
      const data = await res.json();
      return data;
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      return null;
    }

  } catch (error) {
    console.error('Error fetching admin:', error);
    return null;
  }
};




 export const getUser = async () => {
  try {
    // Retrieve token from cookies
    const token = Cookies.get('token');

    if (!token) {
      throw new Error('No token found');
    }

    const res = await fetch(`${process.env.REACT_APP_API_URL}/user/auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add token to Authorization header
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user');
    }

    const data = await res.json();
    return data; // Return user data
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};





export const getDeliveries = async () => {
  try {
    // Retrieve token from cookies
    const token = Cookies.get('token');

    if (!token) {
      throw new Error('No token found');
    }

    const res = await fetch(`${process.env.REACT_APP_API_URL}/user/deliveries`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add token to Authorization header
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch deliveries');
    }

    const data = await res.json();
    return data; // Return user data
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const getOrders = async () => {
  try {
    // Retrieve token from cookies
    const token = Cookies.get('admintoken');

    if (!token) {
      throw new Error('No token found');
    }

    const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add token to Authorization header
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch deliveries');
    }

    const data = await res.json();
    return data; // Return user data
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const getOneOrder = async (id) => {  // Expect id directly, not as an object
  try {
    const token = Cookies.get('admintoken');

    if (!token) {
      throw new Error('No token found');
    }

    const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/order/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add token to Authorization header
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch order');
    }

    const data = await res.json();
    return data; // Return order data
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
};

export const postOrder = async (formData) => {
  try {
    // Retrieve token from cookies
    const token = Cookies.get('token');

    if (!token) {
      throw new Error('No token found');
    }

    const res = await fetch(`${process.env.REACT_APP_API_URL}/user/place-delivery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add token to Authorization header
        body: JSON.stringify(formData)
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user');
    }

    const data = await res.json();
    return data; // Return user data
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};



// export const getDeliveries = async () => {
//   try {
//     // Retrieve token from cookies
//     const token = Cookies.get('token');

//     if (!token) {
//       throw new Error('No token found');
//     }

//     const res = await fetch('http://localhost:8000/user/deliveries', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`, // Add token to Authorization header
//       },
//     });

//     if (!res.ok) {
//       throw new Error('Failed to fetch deliveries');
//     }

//     const data = await res.json();
//     return data; // Return user data
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return null;
//   }
// };
