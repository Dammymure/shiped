'use client';

import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TrackPage from '../track-order/TrackPage.jsx';
import { useUser } from '@/app/Provider';
import { redirect } from 'next/navigation';
import Cookies from 'js-cookie';  // Import js-cookie library

const TrackOrder = () => {
  const { user, isLoading } = useUser();
  const [openTracking, setOpenTracking] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isLoading1, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  
  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  if (!user) {
    redirect('/');
    return null;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = Cookies.get('token');

      const res = await fetch(`http://localhost:8000/user/delivery/${orderId}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch order');
      }

      const data = await res.json();
      setOrderData(data);
      setOpenTracking(true);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sidebar>
      <div className='w-screen h-screen'>
        {openTracking ? (
          <TrackPage data={orderData} />
        ) : (
          <div className='bg-white rounded-md w-full p-8 h-screen overflow-hidden'>
            <h2 className='text-2xl'>Track Order</h2>
            <div className='flex flex-col h-screen justify-center items-cente'>
              <h1 className='text-2xl'>Track your package</h1>
              <p className='text-slate-500 text-sm'>Order ID</p>
              <div className='flex gap-4 w-full items-center justify-center'>
                <Input
                  className="h-12"
                  type="text"
                  placeholder="Enter Order ID..."
                  onChange={(e) => setOrderId(e.target.value)}
                  value={orderId}
                />
                <Button
                  className="text-white h-12"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading1}
                >
                  {isLoading1 ? 'Searching...' : 'Search'}
                </Button>
              </div>
              <p className='text-sm text-slate-500 mt-4'>Please enter a unique reference before launching your search, system will automatically recognise the type of value.</p>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default TrackOrder;
