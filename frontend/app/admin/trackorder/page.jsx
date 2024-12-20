'use client';

import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserUser } from '@/app/Provider';
import { redirect } from 'next/navigation';
import Cookies from 'js-cookie';  // Import js-cookie library
import UpdateOrder from '../updateorder/updateOrder';

const Page = () => {
  const { admin, isLoading } = UserUser();
  const [OpenTracking, setOpenTracking] = useState(false);
  const [OrderId, setOrderId] = useState('');
  const [IsLoading1, setIsLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [OrderData, setOrderData] = useState(null);
  
  if (isLoading) {
    return <p>Loading user data...</p>;
  }
  
  // if (!admin) {
  //   redirect('/');
  //   return null;
  // }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = Cookies.get('token');

      const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/order/${OrderId}`, {
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
      setError(true)
    } finally {
      setIsLoading(false);
    }
  };

  const totalweight = OrderData?.packages?.reduce((sum, pkg) => sum + pkg.weight, 0)

  return (
    <Sidebar admin={admin}>
      <div className='w-screen h-screen'>
        {OpenTracking ? (
          <UpdateOrder orderId={OrderData.orderId} status={OrderData.status} packages={OrderData.packages} user={OrderData.userId.firstname} weight={totalweight} price={OrderData.price}/>
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
                  value={OrderId}
                />
                <Button
                  className="text-white h-12"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={IsLoading1}
                >
                  {IsLoading1 ? 'Searching...' : 'Search'}
                </Button>
              </div>
              <p className='text-sm text-slate-500 mt-4'>Please enter a unique reference before launching your search, system will automatically recognise the type of value.</p>
              {
                Error ? (<p className='text-red-600'> Order ID does not exist</p>):''
              }
              
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default Page;
