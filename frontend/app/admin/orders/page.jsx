'use client'
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import OrdersTable from './OrderTable';
import { UserUser } from '../../Provider';
import { redirect } from 'next/navigation';
import { getOrders } from '@/lib/utils';

const Orders = () => {
  const { admin, isLoading } = UserUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return <p>Loading admin data...</p>;
  }

  // if (!admin) {
  //   redirect('/');
  //   return null;
  // }
  

  return (
    <Sidebar admin={admin}>
      <div className="bg-light w-full h-full">
        <div className="bg-white p-4">
          <h1 className="font-semibold text-xl">Customer Order</h1>
          <h1 className="font-semibold text-xl">{admin?.email}</h1>
        </div>

        <div className="bg-white m-4 rounded-md max-h-[80vh] overflow-y-auto">
        <div className="p-4 ">
      <table className="min-w-full border-collapse items-center border-slate-400 text-sm ">
        <thead>
          <tr className='bg-secondary/20'>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Weight</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Items</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
          {orders.map((order) => {
            const totalWeight = order.packages?.reduce((sum, pkg) => sum + pkg.weight, 0) || 0;

            return (
                <OrdersTable
                  key={order._id} // Ensure unique keys
                  id={order.orderId}
                  user={order.userId.firstname}
                  weight={totalWeight}
                  price={order.price}
                  items={order.packages?.length || 0}
                  status={order.status}
                />
              
            );
          })}
          </table>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Orders;
