'use client'
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import Cookies from 'js-cookie';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token'); // Assuming token is stored in cookies

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
        setFormData({
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
          address: response.data.address,
          phone: response.data.phone
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Submit updated data
  const handleUpdate = async () => {
    const token = Cookies.get('token');

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          address: formData.address,
          phone: formData.phone
        }),  // Make sure status is sent correctly
      });

      // const response = await axios.put('http://localhost:8000/user/update', {
      //   firstname: formData.firstname,
      //   lastname: formData.lastname,
      //   email: formData.email,
      //   address: formData.address,
      //   phone: formData.phone
      // }, {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // });
      if (!res.ok) throw new Error('Failed to update profile');

      setUser(res.data);
      setIsEditing(false); // Exit edit mode after saving
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <Sidebar user={user}>
      <div className='bg-light w-full h-full'>
        <div className='bg-white p-4'>
          <h1 className='text-semibold text-2xl'>Profile Details</h1>
        </div>

        <div className='bg-white m-4 p-4 rounded-md flex justify-between items-center'>
          <div className='flex flex-row items-center gap-4'>
            <i className='bg-secondary w-16 h-16 rounded-full'></i>
            <h2 className='text-xl'>Hey, {user?.firstname}!</h2>
          </div>
          <button
            className='bg-primary px-3 py-2 rounded-md text-white text-sm'
            onClick={handleEditClick}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <div className='bg-white m-4 p-4 rounded-md'>
          <div className='grid grid-cols-2 gap-10'>
            {['firstname', 'lastname', 'email', 'address', 'phone'].map((field) => (
              <div key={field} className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                <Input
                  type={field === 'email' ? 'email' : 'text'}
                  id={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            ))}
          </div>

          {isEditing && (
            <button
              className='bg-primary px-3 py-2 mt-4 rounded-md text-white text-sm'
              onClick={handleUpdate}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </Sidebar>
  );
};

export default ProfilePage;
