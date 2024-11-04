'use client'
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { RocketIcon } from "@radix-ui/react-icons"
import MapComponent from '@/components/SelectMap';

const PlaceOrder = () => {
  // SELECT LOCATION
  const [locations, setLocations] = useState({
    currentLocation: null,
    deliveryLocation: null,
  });

  const handleLocationChange = (newLocations) => {
    setLocations(newLocations);
  };

  const router = useRouter();
  const [popUp, setPopUp] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    packages: [{ item: 'food', weight: '' }],
    price: 0,
    status: 'pending',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Calculate total cost when packages change
  useEffect(() => {
    const totalCost = formData.packages.reduce((total, pkg) => total + Number(pkg.weight || 0), 0) * 500;
    setFormData(prevData => ({ ...prevData, price: totalCost }));
  }, [formData.packages]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPackages = [...formData.packages];
    updatedPackages[index][name] = value;
    setFormData({ ...formData, packages: updatedPackages });
  };

  const handleDestinationChange = (e) => setFormData({ ...formData, destination: e.target.value });

  const addPackage = () => setFormData({ ...formData, packages: [...formData.packages, { item: 'food', weight: '' }] });

  const removePackage = (index) => {
    const updatedPackages = formData.packages.filter((_, pkgIndex) => pkgIndex !== index);
    setFormData({ ...formData, packages: updatedPackages });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = Cookies.get('token');
      if (!token) throw new Error('No token found');

      const orderData = {
        ...formData,
        packages: formData.packages.map(pkg => ({
          item: pkg.item,
          weight: Number(pkg.weight),
        })),
        currentLocation: locations.currentLocation,
        deliveryLocation: locations.deliveryLocation,
      };

      const res = await fetch('http://localhost:8000/user/place-delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

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

  return (
    <Sidebar>
      <div className="grid grid-cols-2 w-full">
        <div className="w-full p-4 h-screen bg-light rounded-md shadow-md">
          <div className='bg-white p-4 rounded-md'>
            <h1 className='text-2xl'>Create your order</h1>
            <form onSubmit={handleSubmit} className="py-4 w-full h-screen mx-auto">
              {/* Destination Input */}
              <div className="mb-4">
                <label htmlFor="destination" className="block text-gray-700 font-semibold mb-2">Destination</label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleDestinationChange}
                  placeholder="Enter destination"
                  className="w-full p-2 border border-gray-400 rounded focus:border-secondary focus:shadow-custom-purple focus:ring-1 focus:ring-secondary"
                />
              </div>

              {/* Package and Weight Fields */}
              {formData.packages.map((pkg, index) => (
                <div key={index}>
                  <button
                    type="button"
                    onClick={() => removePackage(index)}
                    className=" text-red-600 text-sm flex ml-auto cursor-pointer"
                  >
                    Delete Package
                  </button>
                  <div className="mb-4 grid grid-cols-2 gap-10">
                    <div>
                      <label htmlFor={`item-${index}`} className="block text-gray-700 font-semibold mb-2">Item</label>
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
                      <label htmlFor={`weight-${index}`} className="block text-gray-700 font-semibold mb-2">Weight</label>
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
              
              <h1>1 naira/kg: {formData.price}</h1>
              <p onClick={addPackage} className="text-slate-800 text-center cursor-pointer p-2 rounded w-full mb-4">+ Add Another Package</p>

              <button type="submit" className="bg-primary text-white p-2 rounded w-full hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? <span>Processing...</span> : 'Place Order'}
              </button>

              <div className="grid w-full place-items-center">
                {popUp &&
                  <Alert className="w-[50%]">
                    <RocketIcon className="h-4 w-4" />
                    <AlertTitle>Order Placed!</AlertTitle>
                    <AlertDescription>Your order has been placed and is being processed.</AlertDescription>
                  </Alert>
                }
              </div>
            </form>
          </div>
        </div>

        <div className='w-full h-screen bg-custom-radial'>
          <h1>Package Delivery</h1>
          <MapComponent onLocationChange={handleLocationChange} />
          {locations.currentLocation && (
            <div>
              <h2>Current Location Coordinates:</h2>
              <p>Latitude: {locations.currentLocation.lat}</p>
              <p>Longitude: {locations.currentLocation.lng}</p>
            </div>
          )}
          {locations.deliveryLocation && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <h2>Delivery Location Coordinates:</h2>
              <p>Latitude: {locations.deliveryLocation.lat}</p>
              <p>Longitude: {locations.deliveryLocation.lng}</p>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
};

export default PlaceOrder;
