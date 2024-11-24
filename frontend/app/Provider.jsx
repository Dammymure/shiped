"use client";
import { getAdmin, getUser } from '@/lib/utils';
import { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export async function UserProvider  ({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(true);
  
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const adminData = await getAdmin();
        console.log(adminData);
        
        setAdmin(adminData);
        console.log(admin);
        
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setIsLoadingAdmin(false);
      }
    };
    fetchAdmin();
  },);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoadingUser(false);
      }
    };
    fetchUser();
  }, );


  const isLoading = isLoadingUser || isLoadingAdmin;

  return (
    <UserContext.Provider value={{ user, admin, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
