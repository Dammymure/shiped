import React from 'react'

const StatWidget = ({ ongoing, complete, pending }) => {
  return (
    <div className="flex flex-col justify-cente h-3/5 divide-stone-400 border-slate-500 rounded-md border-[1px] px-5">
    <h1 className='pb-4 pt-4 font-semibold text-xl'>Shipment Statistics</h1>
      <div className=' flex items-center justify-around divide-x-2'>


      <div className='w-32 h-32 rounded-full bg-blue-600'>
      </div>

      <div className='grid grid-cols-2 justify-end w-1/2'>

          <div className='flex flex-col'>
            <div className='flex mx-auto items-center gap-1 text-xs'><p className='w-2 h-2 rounded-full bg-blue-400'></p> Complete</div>
            <h1 className='flex mx-auto text-4xl font-semibold'>{complete}</h1>
          </div>
          <div className='flex flex-col'>
            <div className='flex mx-auto items-center gap-1 text-xs'><p className='w-2 h-2 rounded-full bg-blue-400'></p> Pending</div>
            <h1 className='flex mx-auto text-4xl font-semibold '>{pending}</h1>
          </div>
          <div className='flex flex-col'>
            <div className='flex mx-auto items-center gap-1 text-xs'><p className='w-2 h-2 rounded-full bg-blue-400'></p> Ongoing</div>
            <h1 className='flex mx-auto text-4xl font-semibold'>{ongoing}</h1>
          </div>
          <div className='flex flex-col '>
            <div className='flex mx-auto items-center gap-1 text-xs' ><p className='w-2 h-2 rounded-full bg-blue-400'></p> Issues</div>
            <h1 className='flex mx-auto text-4xl font-semibold'>0</h1>
          </div>

      </div>

      </div>
    
    </div>
  )
}

export default StatWidget