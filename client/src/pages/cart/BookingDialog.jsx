import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from '@material-tailwind/react';
import { toast } from 'react-toastify';
import { postRequest, putRequest } from '../../utils';

const BookingDialog = ({ bookingIDs, onBookingSuccess }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
  });
  const [apiError, setApiError] = useState('');

  const handleOpen = () => {
    setOpen(!open);
    if (!open) {
      setFormData({
        checkInDate: '',
        checkOutDate: '',
      });
      setApiError('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateDates = () => {
    const { checkInDate, checkOutDate } = formData;
    const today = new Date().toISOString().split('T')[0];

    if (!checkInDate || !checkOutDate) {
      setApiError('Both check-in and check-out dates are required.');
      return false;
    }

    if (checkInDate < today) {
      setApiError('Check-in date cannot be in the past.');
      return false;
    }

    if (checkOutDate <= checkInDate) {
      setApiError('Check-out date must be after the check-in date.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateDates()) {
      return;
    }

    try {
      const response = await putRequest({
        endpoint: '/bookings/book-room',
        data: {
          bookings: bookingIDs,
          checkIn: formData.checkInDate,
          checkOut: formData.checkOutDate,
        },
      });

      if (response.ok) {
        toast.success('Booking successful!');
        handleOpen();
        onBookingSuccess();
      } else {
        setApiError(response.message);
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);

      setApiError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient" color="blue">
        Book Now
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Book Room</DialogHeader>
        <DialogBody>
          {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}
          <form className="flex flex-col space-y-4">
            <Input
              type="date"
              name="checkInDate"
              label="Check-in Date"
              value={formData.checkInDate}
              onChange={handleChange}
              required
            />
            <Input
              type="date"
              name="checkOutDate"
              label="Check-out Date"
              value={formData.checkOutDate}
              onChange={handleChange}
              required
            />
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            Confirm Booking
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default BookingDialog;
