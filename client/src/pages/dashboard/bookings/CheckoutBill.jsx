import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react';

const BillDialog = ({
  booking,
  open,
  onClose,
  onCheckout,
  showCheckoutButton,
}) => {
  if (!booking) return null; // Early return if booking data is not provided

  return (
    <Dialog open={open} handler={onClose}>
      <DialogHeader>Bill Details</DialogHeader>
      <DialogBody>
        <div>
          <Typography variant="h6" className="mb-4">
            Room Cost: Rs. {booking.roomCost}
          </Typography>
          <Typography variant="h6" className="mb-4">
            Food Cost: Rs. {booking.foodCost}
          </Typography>
          <Typography variant="h6" className="mb-4">
            Total Price: Rs. {booking.totalPrice}
          </Typography>
          <div className="mt-4">
            <Typography variant="h6">Food Items:</Typography>
            <ul className="list-disc pl-5">
              {booking.food.map((item, index) => (
                <li key={index}>
                  {item.itemName} - {item.quantity} x RS. {item.price}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="flex gap-x-3">
        <Button variant="text" color="red" onClick={onClose} className="mr-1">
          Close
        </Button>
        {showCheckoutButton && (
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              onCheckout();
              onClose();
            }}
          >
            Checkout
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
};

export default BillDialog;
