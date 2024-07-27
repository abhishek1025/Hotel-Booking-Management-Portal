import React, { useEffect, useState } from 'react';
import { LandingHeader } from '../ui/Headings';
import { deleteRequest, getRequest } from '../utils';

import { Card, CardBody, Typography } from '@material-tailwind/react';
import { PrimaryButton } from '../ui/buttons/Buttons';

import { formatImageUrl } from '../utils';

const CartItemCard = ({ cartItem, deleteCartItem }) => {
  const { room, status, pricePerNight, roomCost, foodCost, totalPrice } =
    cartItem;

  console.log(room._id);

  console.log(cartItem);
  return (
    <Card className="w-80 bg-white shadow-md rounded-lg overflow-hidden relative">
      <div className="relative">
        {/* Display room image */}
        <div className="relative">
          <div className="w-full h-40 overflow-hidden">
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
      </div>
      <CardBody className="p-4">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 font-semibold"
        >
          Room Type: {room ? room.roomType : 'Unknown'}
        </Typography>
        <p>Description: {room.description}</p>
        <p>Capacity: {room.capacity}</p>

        <PrimaryButton
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => deleteCartItem(room._id)}
        >
          Remove from Cart
        </PrimaryButton>
      </CardBody>
    </Card>
  );
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = async () => {
    const res = await getRequest({
      endpoint: '/bookings/cart-items',
    });

    if (res.ok) {
      setCartItems(res.data);
      console.log(res.data);
    }
  };

  const deleteCartItem = async (bookingId) => {
    const res = await deleteRequest({
      endpoint: `/bookings/cart-items/${bookingId}`,
    });

    if (res.ok) {
      console.log('done');
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <div className="mt-[110px] px-4">
      <LandingHeader>Cart</LandingHeader>
      <div className="grid grid-cols-3">
        {cartItems.map((item) => (
          <CartItemCard
            key={item._id}
            cartItem={item}
            deleteCartItem={deleteCartItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Cart;
