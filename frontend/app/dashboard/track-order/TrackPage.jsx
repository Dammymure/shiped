'use client'
import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import GoogleMapComponent from '@/components/GoogleMapComponent'
import GoogleMapRouteComponent from '@/components/GoogleMapRouteComponent'

const TrackPage = ({data}) => {
  // const [data, setData] = useState()
  // setData(data)
  const [childData, setChildData] = useState(null);


  const handleChildData = (data) => {
    setChildData(data);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
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
    <div className='w-4/5 flex h-screen overflow-y-auto overscroll-y-auto'>
      <div className='flex h-screen w-screen'>
        <div className='w-2/5 h-full bg-light'>
          <div className='p-4 mx-[2px] mb-[2px] rounded-b-md bg-white'>
            <h2>Track your package </h2>
          </div>

          <div className='p-4 mx-[2px] mb-[2px] rounded-md bg-white'>
            <p className='text-xs text-slate-500'>Order description</p>
            <h2 className='py-1'> {data?.packages.map((items)=>{
              return (items.item + "," )
            })}</h2>
            <p className='text-xs text-slate-500'>Order ID: <span className='text-black font-semibold'>{data?.orderId}</span></p>
          </div>

          <div className='px-4 py-2 mx-[2px] mb-[2px] rounded-md bg-white'>
            <div className='bg-primary p-1 m-4 rounded-md'>
              <div className='bg-white p-4 gap-3 rounded-md'>
                <div className='flex pb-2 gap-2 items-center '>
                  <i className='w-10 h-10 bg-light'></i>

                  <div>
                    <h4>Darwin Nunez</h4>
                    <p className='text-xs text-slate-500'>BG-4543-XD</p>
                  </div>

                </div>

                <div className='flex justify-between'>
                  <button className='hover:bg-primary hover:text-white  text-sm px-5 py-1 rounded-md border-slate-300 border-[1px]'>Call</button>
                  <button className='hover:bg-primary hover:text-white text-sm px-5 py-1 rounded-md border-slate-300 border-[1px]'>Send a message</button>

                </div>


              </div>

              <div className='p-3'>
                <h1 className='text-white '>Rider</h1>
              </div>
            </div>

          </div>

          <div className='p-4 mx-[2px] mb-[2px] rounded-md bg-white '>
            <h3>Delivery Status</h3>

            <div className='flex text-sm gap-2'>
              <p className='text-slate-500'>Status</p>
              <p className={`${getStatusColor(data?.status)} text-white px-2 py- rounded-sm `}>{data?.status}</p>
            </div>
            
            <div className='flex items-center gap-1 py-2'>
              {/* <i className='w-2 h-2 rounded-full bg-orange-500 flex'></i> */}
              <p className='text-sm text-slate-500'>Delivery price </p>
              <p className='font-semibold'>{data?.price}</p>
            </div>

            <div className='flex items-center gap-1 py-2'>
              <i className={`${getStatusColor(data?.status)} w-2 h-2 rounded-full flex`}></i>
              <p className='text-sm'>Damilola, your package is <span>in transit</span></p>
              <p></p>
            </div>

            <div className='flex items-center gap-1 py-2'>
              <i className={`${getStatusColor(data?.status)} w-2 h-2 rounded-full flex`}></i>
              <p className='text-sm'>Package being sent from <span>{data?.destination}</span></p>
              <p></p>
            </div>
            <div className='flex items-center gap-1 py-2'>
              <i className={`${getStatusColor(data?.status)} w-2 h-2 rounded-full flex`}></i>
              <p className='text-sm'>Estimated travel time<span className='font-semibold'> {childData}</span></p>
              <p></p>
            </div>
            <div className='flex items-center gap-1 py-2'>
              <i className={`${getStatusColor(data?.status)} w-2 h-2 rounded-full flex`}></i>
              <p className='text-sm'>Package being sent to <span>{data?.destination}</span></p>
              <p></p>
            </div>
            <div className='flex items-center gap-1 py-2'>
              <i className={`${getStatusColor(data?.status)} w-2 h-2 rounded-full flex`}></i>
              <p className='text-sm'>Your package has been delivered</p>
              <p></p>
            </div>

          </div>

          <div className='justify-center p-4 mx-[2px] mb-[2px] h-full items-center rounded-md bg-white '>
            {/* <button className='bg-primary px-2 py-2 rounded-md text-white'>Customer Care</button> */}
          </div>  



        </div>



        <div className='w-3/5 h-full bg-teal-300'>
        {/* <GoogleMapComponent/> */}
        <GoogleMapRouteComponent currentLocation={data.currentLocation} deliveryLocation={data.deliveryLocation} lng={data?.lng} lat={data?.lat} estimatedTravelTime={handleChildData}/>

        </div>
      </div>

    </div>

  )
}

export default TrackPage