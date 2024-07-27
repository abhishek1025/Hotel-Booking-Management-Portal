import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react';
import { BOOKING_STATUS } from '../../constants';

const UserBillDialog = ({ booking }) => {
  const [open, setOpen] = useState(false);

  if (!booking) return null;

  // Only display the bill if the status is CheckedIn or CheckedOut
  if (
    booking.status !== BOOKING_STATUS.CHECKED_IN &&
    booking.status !== BOOKING_STATUS.CHECKED_OUT
  ) {
    return null;
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="gradient" color="blue" onClick={handleOpen} size="sm">
        View Bill
      </Button>
      <Dialog open={open} handler={handleClose} className="text-black">
        <DialogHeader className="bg-gray-800 text-white flex justify-center">
          Booking & Bill Details
        </DialogHeader>
        <DialogBody className="bg-white  h-[60vh] overflow-scroll">
          <div className="p-4">
            <Typography
              variant="h6"
              className="mb-2 font-semibold border-b pb-2"
            >
              Booking Details
            </Typography>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Typography variant="body1" color="blue-gray">
                  Booking ID:
                </Typography>
                <Typography variant="body2">{booking._id}</Typography>
              </div>
              <div>
                <Typography variant="body1" color="blue-gray">
                  Room Number:
                </Typography>
                <Typography variant="body2">
                  {booking.room.roomNumber}
                </Typography>
              </div>
              <div>
                <Typography variant="body1" color="blue-gray">
                  Check-in Date:
                </Typography>
                <Typography variant="body2">
                  {new Date(booking.checkIn).toLocaleDateString()}
                </Typography>
              </div>
              <div>
                <Typography variant="body1" color="blue-gray">
                  Check-out Date:
                </Typography>
                <Typography variant="body2">
                  {new Date(booking.checkOut).toLocaleDateString()}
                </Typography>
              </div>
            </div>
            <Typography
              variant="h6"
              className="mb-2 font-semibold border-b pb-2"
            >
              Billing Details
            </Typography>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Typography variant="body1" color="blue-gray">
                  Room Cost:
                </Typography>
                <Typography variant="body2">Rs. {booking.roomCost}</Typography>
              </div>
              <div>
                <Typography variant="body1" color="blue-gray">
                  Food Cost:
                </Typography>
                <Typography variant="body2">Rs. {booking.foodCost}</Typography>
              </div>
              <div>
                <Typography variant="body1" color="blue-gray">
                  Total Price:
                </Typography>
                <Typography variant="body2" className="font-semibold">
                  Rs. {booking.totalPrice}
                </Typography>
              </div>
            </div>
            <div className="mt-4">
              <Typography variant="h6" className="mb-2 font-semibold">
                Food Items
              </Typography>
              <ul className="list-disc pl-5 text-gray-700">
                {booking.food.map((item, index) => (
                  <li key={index}>
                    {item.itemName} - {item.quantity} x Rs. {item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex gap-x-3 bg-gray-50">
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default UserBillDialog;
