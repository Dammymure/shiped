'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Cookies from 'js-cookie';
import { useRouter, redirect } from 'next/navigation';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import MapComponent from '@/components/SelectMap';
import { useUser } from '@/app/Provider';

const PlaceOrder = () => {
  const { user, isLoading } = useUser();  // Move the hook outside the condition

  const [Locations, setLocations] = useState({
    currentLocation: null,
    deliveryLocation: null,
  });

  const [PopUp, setPopUp] = useState(false);
  const [FormData, setFormData] = useState({
    destination: '',
    packages: [{ item: 'food', weight: '' }],
    price: 0,
    status: 'pending',
  });

  const [IsNowLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const totalCost = FormData.packages.reduce(
      (total, pkg) => total + Number(pkg.weight || 0),
      0
    ) * 500;
    setFormData((prevData) => ({ ...prevData, price: totalCost }));
  }, [FormData.packages]);

  const handleLocationChange = (newLocations) => setLocations(newLocations);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPackages = [...FormData.packages];
    updatedPackages[index][name] = value;
    setFormData({ ...FormData, packages: updatedPackages });
  };

  const handleDestinationChange = (e) =>
    setFormData({ ...FormData, destination: e.target.value });

  const addPackage = () =>
    setFormData({
      ...FormData,
      packages: [...FormData.packages, { item: 'food', weight: '' }],
    });

  const removePackage = (index) => {
    const updatedPackages = FormData.packages.filter(
      (_, pkgIndex) => pkgIndex !== index
    );
    setFormData({ ...FormData, packages: updatedPackages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = Cookies.get('token');
      if (!token) throw new Error('No token found');

      const orderData = {
        ...FormData,
        packages: FormData.packages.map((pkg) => ({
          item: pkg.item,
          weight: Number(pkg.weight),
        })),
        currentLocation: Locations.currentLocation,
        deliveryLocation: Locations.deliveryLocation,
      };

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/user/place-delivery`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!res.ok) throw new Error('Failed to place order');

      const data = await res.json();
      setIsLoading(false);
      setPopUp(true);

      setFormData({
        destination: '',
        packages: [{ item: 'food', weight: '' }],
        price: 0,
        status: 'pending',
      });

      setTimeout(() => {
        setPopUp(false);
        router.refresh();
      }, 3000);

      return data;
    } catch (error) {
      console.error('Error placing order:', error);
      setIsLoading(false);
      return null;
    }
  };

  // Conditional rendering based on `isLoading` and `user` after hooks have been called
  if (isLoading) return <p>Loading user data...</p>;

  if (!user) {
    redirect('/');
    return null;
  }

  return (
    <Sidebar user={user}>
      <div className="grid grid-cols-2 w-full">
        <div className="w-full p-4 h-full bg-light rounded-md shadow-md">
          <div className="bg-white p-4 rounded-md">
            <h1 className="text-2xl">Create your order</h1>
            <form onSubmit={handleSubmit} className="py-4 w-full h-screen mx-auto">
              <div className="mb-4">
                <label htmlFor="destination" className="block text-gray-700 font-semibold mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={FormData.destination}
                  onChange={handleDestinationChange}
                  placeholder="Enter destination"
                  className="w-full p-2 border border-gray-400 rounded focus:border-secondary focus:shadow-custom-purple focus:ring-1 focus:ring-secondary"
                />
              </div>

              {FormData.packages.map((pkg, index) => (
                <div key={index}>
                  <button
                    type="button"
                    onClick={() => removePackage(index)}
                    className="text-red-600 text-sm flex ml-auto cursor-pointer"
                  >
                    Delete Package
                  </button>
                  <div className="mb-4 grid grid-cols-2 gap-10">
                    <div>
                      <label htmlFor={`item-${index}`} className="block text-gray-700 font-semibold mb-2">
                        Item
                      </label>
                      <select
                        id={`item-${index}`}
                        name="item"
                        value={pkg.item}
                        onChange={(e) => handleChange(e, index)}
                        className="w-full p-2 border border-gray-400 rounded focus:border-secondary focus:shadow-custom-purple focus:ring-1 focus:ring-secondary"
                      >
                        <option value="food">Food</option>
                        <option value="gadget">Gadget</option>
                        <option value="electronic">Electronic</option>
                        <option value="snacks">Snacks</option>
                        <option value="drinks">Drinks</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`weight-${index}`} className="block text-gray-700 font-semibold mb-2">
                        Weight
                      </label>
                      <input
                        type="number"
                        id={`weight-${index}`}
                        name="weight"
                        value={pkg.weight}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="e.g 50kg"
                        className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-secondary focus:shadow-custom-purple focus:ring-1 focus:ring-secondary"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <h1>1 naira/kg: {FormData.price}</h1>
              <p onClick={addPackage} className="text-slate-800 text-center cursor-pointer p-2 rounded w-full mb-4">
                + Add Another Package
              </p>

              <button type="submit" className="bg-primary text-white p-2 rounded w-full hover:bg-primary/90" disabled={IsNowLoading}>
                {IsNowLoading ? <span>Processing...</span> : 'Place Order'}
              </button>

              {PopUp && (
                <Alert className="w-[50%]">
                  <RocketIcon className="h-4 w-4" />
                  <AlertTitle>Order Placed!</AlertTitle>
                  <AlertDescription>Your order has been placed and is being processed.</AlertDescription>
                </Alert>
              )}
            </form>
          </div>
        </div>

        <div className="w-full h-screen bg-light p-4">
          <div className="bg-white p-4 rounded-md">
            <h1>Package Delivery</h1>
            <MapComponent onLocationChange={handleLocationChange} />
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default PlaceOrder;
