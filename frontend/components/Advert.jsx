import React from 'react'

const Advert = ({height}) => {
  return (
  <div className='h-2/5 w-full bg-slate-400'>
      <div className='flex h-fit'>
        <video className='h-1/3' height="900" autoPlay muted loop playsInline preload="auto">
          <source src="/assets/ad.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
  </div>
  )
}

export default Advert