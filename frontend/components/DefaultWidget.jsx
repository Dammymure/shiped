import React from 'react'

const DefaultWidget = ({className, children}) => {
  return (
    <div className={`h-full rounded-md ${className}`}>
      {children}
    </div>
  )
}

export default DefaultWidget