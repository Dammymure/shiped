import React from 'react'
import { GoLocation } from "react-icons/go";

const getStatusColor = (status) => {
  switch (status) {
    case 'complete':
      return 'bg-green-500'; // Green for completed
    case 'ongoing':
      return 'bg-blue-500'; // Blue for ongoing
    case 'pending':
      return 'bg-orange-500'; // Orange for pending
    default:
      return 'bg-gray-500'; // Default color if status is unknown
  }
};

const OrderWidget = ({className, orderId, status, address}) => {
  return (
    <div className={`bg-white p-4 my-2 rounded-md border-l-2 border-secondary ${className}`} >
        <p className=' text-xs text-slate-500'>SHIPMENT NUMBER</p>

        <div className='flex justify-between'>
          <p className='font-semibold'>{orderId}</p>
          <p className={`${getStatusColor(status)} px-2 text-sm flex items-center text-white font-semibold rounded-md`}>{status}</p> 
        </div>

        <div className='p-4 bg-background mt-4 rounded-sm'>
          <p className='text-sm text-slate-500'>Delivery Address</p>
          <div className=' flex gap-2'>
            <div className='pt-[4px]'>
            <GoLocation size={15}/>
            </div>
            <h3 className='font-semibold'>
            {address}
            </h3>
          </div>
        </div>
    </div>
  )
}

export default OrderWidget