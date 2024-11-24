'use client'
import { getOneOrder } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import UpdateOrder from '../../updateorder/updateOrder';
import Sidebar from '../../Sidebar';
import { UserUser } from '@/app/Provider';
import { redirect } from 'next/navigation';

const Page = ({ params: { id } }) => {
  const { admin, isLoading } = UserUser();
  const [order, setOrder] = useState();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const fetchedOrder = await getOneOrder(id);  // Pass id directly here
        setOrder(fetchedOrder);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, [id]);

  const totalWeight = order?.packages?.reduce((sum, pkg) => sum + pkg.weight, 0) || 0;

  if (isLoading) {
    return <p>Loading admin data...</p>;
  }

  if (!admin) {
    redirect('/');
    return null;
  }

  return (
    <Sidebar admin={admin} id={id}>

        {order ? (
          <UpdateOrder
            orderId={order.orderId}
            status={order.status}
            packages={order?.packages}
            user={order.userId}
            weight={totalWeight}
            price={order.price}
          />
        ) : (
          <p>Loading order details...</p>
        )}
      </Sidebar>
  );
};

export default Page;
