'use client';
import Cookies from 'js-cookie';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from "next/navigation"
import React, { useState, useEffect } from 'react';

const LoginUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();  // Keep useRouter inside the component
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userdetails = { email, password };

    const res = await fetch('http://localhost:8000/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userdetails),
    });

    const data = await res.json();


    if (res.status === 200) {

      Cookies.set('token', data.token, { expires: 7 }); // Set cookie expiration
      router.push('/dashboard');  // Ensure it's available in client-side rendering
      router.push('/dashboard');  // Ensure it's available in client-side rendering


    }

    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User</CardTitle>
        <CardDescription>
          Login to get started sending your packages.
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
    </Card>
  );
};

export default LoginUser;
