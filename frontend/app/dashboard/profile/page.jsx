'use client'
import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const ProfileDetails = () => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  return (
    <Sidebar>
      <div className='bg-light w-full h-full'>
        <div className='bg-white p-4'>
          <h1 className='text-semibold text-2xl'>Profile Details</h1>
        </div>

        <div className='bg-white m-4 p-4 rounded-md'>
          <div className='flex flex-row items-center gap-4'>
            <i className='bg-secondary w-16 h-16 rounded-full'></i> 
            <h2 className='text-xl'>Hey, Damilola!</h2> 
          </div> 
        </div>

        <div className='bg-white m-4 p-4 rounded-md '>
          <div className='grid grid-cols-2 gap-10'>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="firstname">Firstname</Label>
              <Input 
                type="text" 
                id="firstname" 
                placeholder="Firstname" 
                // value="" 
                disabled={!isEditing} 
                
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="lastname">Lastname</Label>
              <Input 
                type="text" 
                id="lastname" 
                placeholder="Lastname" 
                value="" 
                disabled={!isEditing} 
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input 
                type="email" 
                id="email" 
                placeholder="Email" 
                value="" 
                disabled={!isEditing} 
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="address">Address</Label>
              <Input 
                type="text" 
                id="address" 
                placeholder="Address" 
                value="" 
                disabled={!isEditing} 
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="number">Number</Label>
              <Input 
                type="number" 
                id="number" 
                placeholder="Number" 
                value="" 
                disabled={!isEditing} 
              />
            </div>
          </div>

          <div className='pt-8'>
            <button 
              className='bg-primary px-3 py-2 rounded-md text-white text-sm'
              onClick={handleEditClick}
            >
              {isEditing ? 'Save Changes' : 'Edit'}
            </button>
          </div>
        </div>
      </div>
    </Sidebar>
  )
}

export default ProfileDetails
