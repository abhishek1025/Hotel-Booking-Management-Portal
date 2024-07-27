import  { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Select,
  Option,
} from '@material-tailwind/react';
import { postRequest } from '../../../utils';
import { toast } from 'react-toastify';

const AddRoomDialog = ({ onCreate }) => {
  const [open, setOpen] = useState(false);
  const defaultInfo = {
    roomNumber: '',
    roomType: '',
    capacity: '',
    pricePerNight: '',
    description: '',
    images: [],
  };
  const [formData, setFormData] = useState(defaultInfo);
  const [apiError, setApiError] = useState('');

  const handleOpen = () => {
    setOpen(!open);
    if (!open) {
      setFormData(defaultInfo);
      setApiError(''); // Reset error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleRoomTypeChange = (value) => {
    setFormData({ ...formData, roomType: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(''); // Clear any previous errors
    try {
      const apiData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'images') {
          apiData.append(key, value);
        }
      });

      formData.images.forEach((image) => {
        apiData.append('images', image);
      });

      const res = await postRequest({
        endpoint: '/rooms',
        data: apiData,
      });

      if (res.ok) {
        toast.success(res.message);
        handleOpen(); // Close dialog after successful submit
        onCreate();
        return;
      }

      setApiError(res.message);
    } catch (error) {
      setApiError(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Add Room
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add New Room</DialogHeader>
        <DialogBody>
          {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}
          <form className="flex flex-col space-y-4">
            <Input
              type="text"
              name="roomNumber"
              label="Room Number"
              value={formData.roomNumber}
              onChange={handleChange}
              required
            />
            <Select
              label="Room Type"
              value={formData.roomType}
              onChange={handleRoomTypeChange}
              required
            >
              <Option value="Single">Single</Option>
              <Option value="Double">Double</Option>
              <Option value="Suite">Suite</Option>
            </Select>
            <Input
              type="number"
              name="capacity"
              label="Capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="pricePerNight"
              label="Price per Night"
              value={formData.pricePerNight}
              onChange={handleChange}
              required
            />
            <Textarea
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <Input
              type="file"
              name="images"
              label="Room Images"
              onChange={handleFileChange}
              multiple
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
            Add Room
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AddRoomDialog;
