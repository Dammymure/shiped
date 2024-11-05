'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RocketIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';


const UpdateOrder = ({orderId, status, packages, user, weight, price,  }) => {
  const router = useRouter();


    const [selectedStatus, setSelectedStatus] = useState(status)
    const [isLoading, setIsLoading] = useState(false)
    const [popUp, setPopUp] = useState(false);


    const handleChange = (e) => {
      setSelectedStatus(e.target.value)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
    
      try {
        const token = Cookies.get('admintoken');
        if (!token) throw new Error('No token found');
    
        const res = await fetch(`http://localhost:8000/admin/order-update/${orderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ status: selectedStatus }),  // Make sure status is sent correctly
        });
    
        if (!res.ok) throw new Error('Failed to update order');
    
        const data = await res.json();
        setPopUp(true);
    
        setTimeout(() => {
          setPopUp(false);
          // router.refresh(); // Make sure `router` is defined or correctly imported
          window.location.reload();

        }, 3000);
    
        setIsLoading(false);
        return data;
      } catch (error) {
        console.error('Error updating order:', error); // Add error logging
        setIsLoading(false);
      } 
    };
    

  
    const getBackgroundColor = () => {
      switch (selectedStatus) {
        case 'pending':
          return 'bg-orange-400' // Yellow for pending
        case 'ongoing':
          return 'bg-blue-500'  // Green for approved
        case 'complete':
          return 'bg-green-500'   // Blue for completed
        default:
          return 'bg-white'      // Default color
      }
    }
    const getMainColor = () => {
      switch (status) {
        case 'pending':
          return 'bg-orange-400' // Yellow for pending
        case 'ongoing':
          return 'bg-blue-400'  // Green for approved
        case 'complete':
          return 'bg-green-400'   // Blue for completed
        default:
          return 'bg-white'      // Default color
      }
    }

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
        <div className='bg-ligh w-full h-full'>
            <div className='bg-white p-4 border-b-[1px] border-slate-200'>
                <h1 className='text-semibold text-xl'>Update Order</h1>
            </div>

            <div className='flex p-4 gap-3'>
                <h1>Order ID: {orderId}</h1>

                <div className={`${getMainColor(status)} px-1 rounded-full flex items-center gap-1`}>
                    <i className={`${statusColor(status)} w-2 h-2 rounded-full  flex`}></i>
                    <p className='text-xs'>{status}</p>
                </div>
            </div>

            <div className=' flex h-full'>


                {/* <div className='flex'> */}
                    <div className='w-1/2 bg-white h-full p-4 border-r-[1px] border-slate-300'>
                        <h4 className='font-semibold'>Order Item</h4>
                        {
                            packages.map((pack)=>{
                            return (<div className='py-5 flex items-center justify-between'>
                                <div className='flex items-center gap-3'>
                                <div className='w-20 h-20 bg-green-400 rounded-md'></div>
                                <div>
                                    <p className='text-sm text-slate-400'>{pack.item}</p>
                                    {/* <h3>Spagatti and fried meat balls in peppered stew</h3> */}
                                </div>

                                </div>
                                <div>
                                    {pack.weight}
                                </div>
                            </div>)

                            })
                        }
                        {/* <div className='py-5 flex justify-between items-center'>
                            <div className='flex items-center gap-3'>
                            <div className='w-20 h-20 bg-purple-400 rounded-md'></div>
                            <div>
                                <p className='text-sm text-slate-400'>Food</p>
                                <h3>Spagatti and fried meat balls in peppered stew</h3>
                            </div>

                            </div>
                            <div>
                                20kg
                            </div>
                        </div> */}
                    </div>

                    <div className='w-1/2 bg-white h-full p-4'>
                        <h1 className='font-semibold'>Summary</h1>

                        <div className='py-5'>
                            <h1>Customer</h1>
                            <div className='text-sm text-slate-500 flex flex-col gap-2'>
                                <p>{user.firstname}</p>
                                <p>{user.email}</p>
                                <p>{user.number}</p>
                                <p>{user.address}</p>
                            </div>
                        </div>
                        
                        <div>
                            <h1>Shipment Information</h1>

                            <div className='text-sm gap-1 '>
                                <div>
                                    <p className='text-slate-500'>$/kg: <span className='font-semibold text-black'>{weight}</span></p>
                                </div>
                                <div>
                                    <p className='text-slate-500'>Total: <span className='font-semibold text-black'>{price}</span></p>
                                </div>


                                <div className='py-5 text-black'>
                                    <h4 className='text-sm text-black'>Status Update</h4>
                                    <select
                                        value={selectedStatus}
                                        onChange={handleChange}
                                        className={`w-1/4 p-1 border border-transparent rounded-full focus:border-secondary focus:shadow-custom-purple focus:ring-[1px] focus:ring-secondary ${getBackgroundColor(selectedStatus)}`}
                                        >
                                        <option value="pending">Pending</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="complete">Complete</option>
                                    </select>
                                </div>

                                {/* <div>

                                    <Label htmlFor="latitude">Latitude</Label>
                                    <Input 
                                        type="number" 
                                        id="latitude" 
                                        placeholder="latitude" 
                                        // value="" 
                                        // disabled={} 
                                    />
                                </div>
                                <div>

                                    <Label htmlFor="longitude">Longitude</Label>
                                    <Input 
                                        type="number" 
                                        id="longitude" 
                                        placeholder="longitude" 
                                        // value="" 
                                        // disabled={} 
                                    />
                                </div> */}

                            </div>


                        </div>

                        <div className='py-5'>
                            {/* <Button className='bg-primary p-2 text-white rounded-md'>
                                Update Order
                            </Button> */}
                            <Button
                              className="text-white"
                              disabled={isLoading}
                              onClick={handleSubmit}
                            >
                              {isLoading ? 'Updating...' : 'Update Order'}
                              </Button>

                        </div>

                        <div className="grid w-full place-items-center">
                            {popUp &&
                              <Alert className="w-full">
                                <RocketIcon className="h-4 w-4" />
                                <AlertTitle>Order Updated!</AlertTitle>
                                <AlertDescription>Your order has been updated.</AlertDescription>
                              </Alert>
                            }
                          </div>

                    </div>
                {/* </div> */}

            </div>
        </div>
  )
}

export default UpdateOrder