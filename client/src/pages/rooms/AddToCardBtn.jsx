import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getRequest, postRequest } from '../../utils';
import { BOOKING_STATUS } from '../../constants';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const AddToCardBtn = ({ room }) => {
  const [isCart, setIsCart] = useState(
    room.status === BOOKING_STATUS.IN_CART || false
  );

  const { data: isRoomInCart } = useQuery({
    queryKey: ['Cart Status', room._id],
    queryFn: async () => {
      const res = await getRequest({
        endpoint: `/bookings/check-cart/room/${room._id}`,
      });

      return res.data.isInCart;
    },
  });

  useEffect(() => {
    setIsCart(isRoomInCart);
  }, [isRoomInCart]);

  const handleAddToCart = async () => {
    if (isCart) {
      toast.error('Already in cart');
      return;
    }

    const response = await postRequest({
      endpoint: '/bookings/cart',
      data: {
        room: room._id,
        pricePerNight: room.pricePerNight,
      },
    });

    if (response.ok) {
      setIsCart(true);
      toast.success(response.message);
      return;
    }

    toast.error(response.message);
  };

  return (
    <div className="mt-4 flex items-center justify-between">
      {!isCart ? (
        <>
          <Button
            onClick={handleAddToCart}
            size="sm"
            variant="gradient"
            color="blue"
            className="mr-2"
          >
            Add to Cart
          </Button>
        </>
      ) : (
        <>
          <div>
            <span className="text-gray-700 mb-1 text-sm">
              Already in your cart!!
            </span>
          </div>
          <div>
            <Link to="/cart">
              <Button size="sm" variant="gradient" color="green">
                Book
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AddToCardBtn;
