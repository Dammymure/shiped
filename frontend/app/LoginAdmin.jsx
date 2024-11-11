'use client';
import Cookies from 'js-cookie';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from "next/navigation"
import React, { useState, useEffect } from 'react';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();  // Keep useRouter inside the component
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const userdetails = { email, password };
  
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userdetails),
      });
  
      const data = await res.json();
  
      if (res.ok) { // Use res.ok to check for a successful response
        router.push('/admin'); // Redirect to the orders page
        Cookies.set('admintoken', data.token, { expires: 7 });
      } else {
        console.error('Login failed:', data.message || 'Unexpected error');
        // Optionally, show an error message to the user
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin</CardTitle>
        <CardDescription>
          Login Admin account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="useremail">Email</Label>
          <Input
            required
            id="useremail"
            type="email"
            placeholder="johndoe@email.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="passworduser">Password</Label>
          <Input
            required
            id="passworduser"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="text-white"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? 'Login...' : 'Login'}
        </Button>
      </CardFooter>
      <p onClick={()=> router.push('/create-account')} className="cursor-pointer text-blue-700 text-sm pl-5 pb-5">Don&apos;t have an account? Create an account</p>
    </Card>
  );
};

export default LoginAdmin;
