import React, { useEffect, useState } from 'react';
import { LandingHeader } from '../../ui/Headings';
import { deleteRequest, getRequest } from '../../utils';

import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import { PrimaryButton } from '../../ui/buttons/Buttons';

import { formatImageUrl } from '../../utils';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import BookingDialog from './BookingDialog';

const CartItemCard = ({ cartItem, onSuccess }) => {
  const { room, _id: bookingId } = cartItem;

  const deleteCartItem = async () => {
    const res = await deleteRequest({
      endpoint: `/bookings/cart/${bookingId}`,
    });

    if (res.ok) {
      toast.success(res.message);
      onSuccess();
      return;
    }

    toast.error(res.message);
  };

  return (
    <Card className="w-72 bg-white shadow-md rounded-lg overflow-hidden relative">
      <div className="relative">
        {/* Display room image */}
        <div className="w-full h-32 overflow-hidden">
          {room && room.images && room.images.length > 0 ? (
            <img
              src={formatImageUrl(room.images[0])}
              alt={room.roomType}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              No Image Available
            </div>
          )}
        </div>
      </div>
      <CardBody className="p-4">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 font-semibold"
        >
          Room Type: {room ? room.roomType : 'Unknown'}
        </Typography>
        <p className="text-gray-600 mb-2 line-clamp-2">
          Description: {room.description}
        </p>
        <Typography className="text-gray-500 mb-2">
          Capacity: {room.capacity} guests
        </Typography>

        <PrimaryButton
          className="mt-4 bg-red-500 hover:bg-red-600 text-white"
          onClick={() => deleteCartItem(room._id)}
        >
          Remove from Cart
        </PrimaryButton>
      </CardBody>
    </Card>
  );
};

const Cart = () => {
  const {
    data: cartItems,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const res = await getRequest({
        endpoint: '/bookings/cart-items',
      });

      return res.data;
    },
    queryKey: ['cartItems'],
  });

  if (isLoading) {
    return (
      <Typography variant="h4" className="text-center">
        Loading ....
      </Typography>
    );
  }

  return (
    <>
      <div className="w-[80%] mx-auto ">
        <div className="flex justify-between items-center mb-10">
          <LandingHeader>Your Rooms</LandingHeader>

          <BookingDialog
            bookingIDs={[...cartItems.map((item) => item._id)]}
            onBookingSuccess={refetch}
          />
        </div>

        <div className="grid grid-cols-3 gap-x-6 gap-y-10">
          {cartItems.map((item) => (
            <CartItemCard key={item._id} cartItem={item} onSuccess={refetch} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
