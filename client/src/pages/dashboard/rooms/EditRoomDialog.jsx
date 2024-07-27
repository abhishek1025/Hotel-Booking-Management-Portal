import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Option,
  Select,
  Textarea,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { putRequest } from '../../../utils'; // Adjust import based on your project structure

const EditRoomDialog = ({ roomData, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: '',
    capacity: '',
    pricePerNight: '',
    description: '',
    images: [],
  });
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (roomData) {
      setFormData(roomData);
    }
  }, [roomData]);

  const handleOpen = () => {
    setOpen(!open);
    if (!open && roomData) {
      setFormData(roomData);
      setApiError('');
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
    setApiError('');
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

      const res = await putRequest({
        endpoint: `/rooms/${roomData._id}`, // Assuming roomData has an ID field
        data: apiData,
        method: 'PUT', // Use PUT for updating the data
      });

      console.log(res);

      if (res.ok) {
        toast.success(res.message);
        handleOpen(); // Close dialog after successful update
        onUpdate();
        return;
      }

      setApiError(res.message);
    } catch (error) {
      setApiError(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        variant="text"
        className="text-xl"
        color="green"
      >
        <FaEdit />
      </IconButton>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Edit Room Details</DialogHeader>
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
            Update Room
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default EditRoomDialog;
