import { Button } from '@material-tailwind/react';
import { BOOKING_STATUS } from '../../../constants';
import FoodOrderDialog from './FoodOrderDialog';

import { patchRequest } from '../../../utils';
import { toast } from 'react-toastify';
import { useState } from 'react';
import BillDialog from './CheckoutBill';

const BookingActionButton = ({ booking, status, onSuccess }) => {
  const [openBillDialog, setOpenBillDialog] = useState(false);
  const [showCheckoutButton, setShowCheckoutButton] = useState(false);

  const handleBillDialog = () => setOpenBillDialog(!openBillDialog);

  const onCheckIn = async () => {
    const res = await patchRequest({
      endpoint: `/bookings/${booking._id}/check-in`,
    });

    if (res.ok) {
      toast.success(res.message);
      onSuccess();
      return;
    }

    toast.error(res.message);
  };

  const onCheckOut = async () => {
    const res = await patchRequest({
      endpoint: `/bookings/${booking._id}/check-out`,
    });

    if (res.ok) {
      toast.success(res.message);
      onSuccess();
      return;
    }

    toast.error(res.message);
  };

  const onViewBill = () => {
    setShowCheckoutButton(false);
    setOpenBillDialog(true);
  };

  return (
    <>
      {status === BOOKING_STATUS.BOOKED && (
        <Button variant="gradient" size="sm" color="blue" onClick={onCheckIn}>
          Check-In
        </Button>
      )}

      {status === BOOKING_STATUS.CHECKED_IN && (
        <div className="space-x-4">
          <FoodOrderDialog bookingId={booking._id} onOrderPlaced={onSuccess} />

          <Button
            variant="gradient"
            size="sm"
            color="red"
            onClick={() => {
              setShowCheckoutButton(true);
              setOpenBillDialog(true);
            }}
          >
            Check-Out
          </Button>
        </div>
      )}

      {status === BOOKING_STATUS.CHECKED_OUT && (
        <Button
          variant="gradient"
          size="sm"
          color="purple"
          onClick={onViewBill}
        >
          View Bill
        </Button>
      )}

      <BillDialog
        booking={booking}
        open={openBillDialog}
        onClose={handleBillDialog}
        onCheckout={onCheckOut}
        showCheckoutButton={showCheckoutButton}
      />
    </>
  );
};

export default BookingActionButton;
