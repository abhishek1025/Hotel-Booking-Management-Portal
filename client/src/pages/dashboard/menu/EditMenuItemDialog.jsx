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
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { putRequest } from '../../../utils'; // Adjust import based on your project structure

const EditMenuItemDialog = ({ menuItemData, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
  });
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (menuItemData) {
      setFormData(menuItemData);
    }
  }, [menuItemData]);

  const handleOpen = () => {
    setOpen(!open);
    if (!open && menuItemData) {
      setFormData(menuItemData);
      setApiError('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    try {
      const res = await putRequest({
        endpoint: `/menu-items/${menuItemData._id}`, // Assuming menuItemData has an _id field
        data: formData,
        method: 'PUT',
      });

      if (res.ok) {
        toast.success(res.message);
        handleOpen(); // Close dialog after successful update
        onUpdate(); // Trigger refresh in parent component
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
        <DialogHeader>Edit Menu Item</DialogHeader>
        <DialogBody>
          {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}
          <form className="flex flex-col space-y-4">
            <Input
              type="text"
              name="name"
              label="Item Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Select
              label="Category"
              value={formData.category}
              onChange={handleCategoryChange}
              required
            >
              <Option value="Appetizer">Appetizer</Option>
              <Option value="Main Course">Main Course</Option>
              <Option value="Dessert">Dessert</Option>
              <Option value="Beverage">Beverage</Option>
              <Option value="Side">Side</Option>
            </Select>
            <Input
              type="number"
              name="price"
              label="Price"
              value={formData.price}
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
            Update Item
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default EditMenuItemDialog;
