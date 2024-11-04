'use client'

import Link from 'next/link'
import React from 'react'

const OrdersTable = ({id, user, weight, price, items, status, date}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'complete':
        return 'bg-green-300'; // Green for completed
      case 'ongoing':
        return 'bg-blue-300'; // Blue for ongoing
      case 'pending':
        return 'bg-orange-300'; // Orange for pending
      default:
        return 'bg-gray-300'; // Default color if status is unknown
    }
  };
  const statusColor = (status) => {
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
  return (

        <tbody className='max-h-screen overflow-y-auto'>
          <tr className='hover:bg-light'>
            <td className="border border-b-0  text-center flex"><Link className='w-full px-4 py-2 underline hover:no-underline' href={`/admin/orders/${id}`}>{id}</Link> </td>
            <td className="border px-4 py-2 text-center"><Link className='w-full px-4 py-2' href={`/admin/orders/${id}`}>{user}</Link> </td>
            <td className="border px-4 py-2 text-center"><Link className='w-full px-4 py-2' href={`/admin/orders/${id}`}>{weight}</Link> </td>
            <td className="border px-4 py-2 text-center"><Link className='w-full px-4 py-2' href={`/admin/orders/${id}`}>{price}</Link> </td>
            <td className="border px-4 py-2 text-center"><Link className='w-full px-4 py-2' href={`/admin/orders/${id}`}>{items}</Link> </td>

            <td className="border border-b-0 px-4 py-2 flex items-cenaaaaaaaater mx-auto justify-center align-middle text-center">
                <div className={`${getStatusColor(status)} px-1 rounded-full flex items-center gap-1`}>
                    <i className={`w-2 h-2 rounded-full ${statusColor(status)} flex`}></i>
                    <p className='text-sm'>{status}</p>
                </div>
            </td>

            <td className="border px-4 py-2 text-center">2024-10-16</td>
          </tr>
        </tbody>

  )
}

export default OrdersTable
