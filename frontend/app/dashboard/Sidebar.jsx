"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // usePathname to get current path
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { CalendarDays } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useUser } from '../Provider';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'


const Sidebar = ({ children, className }) => {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return <p>Loading user data...</p>;
  }
  const router = useRouter();  // Keep useRouter inside the component

  const pathname = usePathname(); // Get the current route path

const handleLogout = () => {
  Cookies.remove('token');  // Removes the token from cookies
  router.push('/');  // Redirect to the login or home page
};

  return (
    <div className='flex w-screen overflow-hidde'>
      <div className={`h-screen bg-primary text-white w-1/5 ${className}`}>
        <div className='flex flex-col justify-center px-4 py-10'>
          {/* Top Part */}
          <div className='flex flex-col'>
            <div className='flex justify-center pb-10'>
              <h1 className='text-2xl'>SHIPED</h1>
            </div>


<HoverCard>
      <HoverCardTrigger asChild>
      <div className='flex flex-row items-center gap-2 border-y-[1px] py-3 border-slate-500'>
          <i className='bg-secondary w-10 h-10 rounded-full'>
            <h1>{user.firstname.charAt(0)}</h1>
            <h1>{user.lastname.charAt(0)}</h1>
          </i>
          <div className='flex flex-col leading-5'>
          <p>{user.firstname} {user.lastname}</p>
          <p className='text-slate-500 text-sm'>{user.email}</p>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-primary">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-white">@nextjs</h4>
            <p className="text-sm text-white">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70 text-white" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>

            {/* <div className='flex flex-row items-center gap-2 border-y-[1px] py-3 border-slate-500'>
              <i className='bg-secondary w-10 h-10 rounded-full'></i>
              <div className='flex flex-col leading-5'>
                <p>Alexia Putelas</p>
                <p className='text-slate-500 text-sm'>alexputelas@gmail.com</p>
              </div>
            </div> */}



            <ul className='flex flex-col py-8 gap-y-4'>
                <Link
                  href='/dashboard'
                  className={`hover:bg-secondary hover:text-primary px-2 py-2 rounded-md ${
                    pathname === '/dashboard' ? 'bg-secondary text-primary' : ''
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href='/dashboard/place-order'
                  className={`hover:bg-secondary hover:text-primary px-2 py-2 rounded-md ${
                    pathname === '/dashboard/place-order' ? 'bg-secondary text-primary' : ''
                  }`}
                >
                  Create Order
                </Link>
                <Link
                  href='/dashboard/orders'
                  className={`hover:bg-secondary hover:text-primary px-2 py-2 rounded-md ${
                    pathname === '/dashboard/orders' ? 'bg-secondary text-primary' : ''
                  }`}
                >
                  Orders
                </Link>

                <Link
                  href='/dashboard/track-order'
                  className={`hover:bg-secondary hover:text-primary px-2 py-2 rounded-md ${
                    pathname === '/dashboard/track-order' ? 'bg-secondary text-primary' : ''
                  } ${pathname === '/dashboard/tracking' ? 'bg-secondary text-primary' : ''}`}
                >
                  Track Order
                </Link>
            </ul>
          </div>

          {/* Bottom part */}
          <div className='flex-1 mt-[100%]'>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <p className='cursor-pointer' variant="outline">Logout</p>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                <AlertDialogDescription>
                  You would need to log back in to access your info
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="text-white" onClick={handleLogout}>Logout</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
            <h2>FAQ</h2>
          </div>
        </div>
      </div>

      <div className='w-4/5 flex h-screen overflow-y-auto overscroll-y-auto'>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
