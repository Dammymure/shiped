'use client';  // This tells Next.js that this component should only be rendered on the client.

import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import OrderWidget from '@/components/OrderWidget';
import StatWidget from '@/components/StatWidget';
import { FaBiking } from "react-icons/fa";
import Link from 'next/link';
import { useUser } from '../Provider';
import { redirect } from 'next/navigation';
import { getDeliveries } from '@/lib/utils';

const Dashboard = () => {
  const { user, isLoading } = useUser();
  const [orders, setOrders] = useState([]);  // State for holding the orders data

  // Fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getDeliveries();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);  // Empty dependency array ensures this runs once when the component mounts

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  if (!user) {
    redirect('/');
    return null;  // Ensure that the component doesn't continue rendering after redirect
  }

  const ongoing = orders.filter(order => order.status === 'ongoing').length;
  const completed = orders.filter(order => order.status === 'completed').length;
  const pending = orders.filter(order => order.status === 'pending').length;

  return (
    <div className='flex flex-row'>
      <Sidebar className="overflow-hidde">
        <div className='w-2/5 h-screen p-5 bg-light flex flex-col justify-betwee'>
          <h1 className='text-3xl font-semibold'>Shipment Orders</h1>
          <div className='max-h-screen overflow-y-auto'>
              {
                orders.length > 0 ? (
                  orders.map((order) => (
                    <OrderWidget
                      key={order.orderId} // Add a key when mapping items
                      orderId={order.orderId}
                      status={order.status}
                      address={order.destination}
                    />
                  ))
                ) : (
                  <p>No orders available</p>
                )
              }

          </div>
        </div>

        <div className='flex flex-col w-3/5 h-screen px-4 py-5 gap-x-4 gap-y-4 overflow-hidden'>
          <div className='h-2/5 p-5 bg-secondary border-slate-500 rounded-md border-[1px]'>
            <div className='flex gap-2'>
              <h1 className='text-2xl'>Hello! {user.firstname}, what are we sending today</h1>
              <FaBiking size={30} />
            </div>

            <div className='flex gap-2 pt-3'>
              <Link href='/dashboard/place-order' className='bg-primary text-white p-1 rounded-md'>Place Order</Link>
              <Link href='/dashboard/track-order' className='bg-white text-primary p-1 rounded-md'>Track Order</Link>
            </div>
          </div>

          {/* STATISTICS */}
          <StatWidget 
            ongoing={ongoing} 
            completed={completed} 
            pending={pending} 
          />

          {/* ADVERT BOARD */}
          <div className='h-2/5 w-full bg-slate-400'>
            <div className='flex h-fit'>
              <video className='h-full' height="900" autoPlay muted loop playsInline preload="auto">
                <source src="/assets/ad.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default Dashboard;
