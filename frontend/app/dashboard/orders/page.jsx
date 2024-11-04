'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import OrderWidget from '@/components/OrderWidget'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import DefaultWidget from '@/components/DefaultWidget'
import { useUser } from '@/app/Provider'
import { redirect } from 'next/navigation'
import { getDeliveries } from '@/lib/utils'



const Orders = () => {
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

  const ongoing = orders.filter(order => order.status === 'ongoing');
  const completed = orders.filter(order => order.status === 'completed');
  const pending = orders.filter(order => order.status === 'pending');

  return (
    <Sidebar>

      <div className='flex w-full'>
        <div className=' bg-light p-4 w-2/5'>
          <div>Orders</div>

          <Tabs defaultValue="ongoing" className=" w-full">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger className='' value="ongoing">Ongoing</TabsTrigger>
    <TabsTrigger value="pending">Pending</TabsTrigger>
    <TabsTrigger value="completed">Completed</TabsTrigger>
  </TabsList>

  <TabsContent value="ongoing">
    <div className='max-h-screen overflow-y-auto'>
      <h1>ONGOING</h1>
      {
        ongoing.length > 0 ? (
          ongoing.map((order) => (
            <OrderWidget
              key={order.orderId}
              orderId={order.orderId}
              status={order.status}
              address={order.destination}
            />
          ))
        ) : (
          <p>No ongoing orders available</p>
        )
      }
    </div>
  </TabsContent>

  <TabsContent value="pending">
    <div className='max-h-screen overflow-y-auto'>
      <h1>PENDING</h1>
      {
        pending.length > 0 ? (
          pending.map((order) => (
            <OrderWidget
              key={order.orderId}
              orderId={order.orderId}
              status={order.status}
              address={order.destination}
            />
          ))
        ) : (
          <p>No pending orders available</p>
        )
      }
    </div>
  </TabsContent>

  <TabsContent value="completed">
    <div className='max-h-screen overflow-y-auto'>
      <h1>COMPLETED</h1>
      {
        completed.length > 0 ? (
          completed.map((order) => (
            <OrderWidget
              key={order.orderId}
              orderId={order.orderId}
              status={order.status}
              address={order.destination}
            />
          ))
        ) : (
          <p>No completed orders available</p>
        )
      }
    </div>
  </TabsContent>
</Tabs>



        </div>

        <div className='bg-lime-300 flex flex-col w-3/5 p-4 gap-y-4'>
          <DefaultWidget className="text-center bg-custom-radial-2">
                1
          </DefaultWidget>

          <DefaultWidget className="text-center bg-custom-radial">
              2
          </DefaultWidget>

          <DefaultWidget className="text-center bg-custom-radial-3">
              3
          </DefaultWidget>
            
        </div>

      </div>
    </Sidebar>
  )
}

export default Orders