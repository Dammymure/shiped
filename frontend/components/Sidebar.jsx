import React from 'react'
import Link from 'next/link'


const Sidebar = ({children, className }) => {
  return (
    <div className={`h-screen bg-primary text-white w-1/5 ${className}`} >
      <div className='flex flex-col  justify-center px-4 py-10'>
        {/* Top Part */}
        <div className='flex flex-col'>
          <div className='flex justify-center pb-10'>
            <h1 className='text-2xl'>SHIPED</h1>
          </div>

          <div className='flex flex-row items-center gap-2 border-y-[1px] py-3 border-slate-500'>
            <i className='bg-secondary w-10 h-10 rounded-full'></i>
            <div className='flex flex-col leading-5'>
              <p>Alexia Putelas</p>
              <p className='text-slate-500 text-sm'>alexputelas@gmail.com</p>
            </div>
          </div>

          <ul className='flex flex-col py-6 *:rounded-md *:py-2 *:px-2 *:my-2 *:cursor-pointer *:font-medium' >
            <Link href='/dashboard' className='hover:bg-secondary hover:text-primary'>Dashboard</Link>
            <Link href='/dashboard/place-order' className='hover:bg-secondary hover:text-primary'>Create Order</Link>
            <Link href='/dashboard/orders' className='hover:bg-secondary hover:text-primary'>Orders</Link>
            <Link href='/dashboard/track-order' className='hover:bg-secondary hover:text-primary'>Track Order</Link>
          </ul>


        </div>


        {/* Buttom part */}
        <div className='flex-1 mt-[100%] *:font-medium'>
            <h2>Settings</h2>
            <h2>FAQ</h2>
        </div>
      </div>
    </div>
  )
}

export default Sidebar