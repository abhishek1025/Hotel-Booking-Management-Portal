import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from '@material-tailwind/react';
import { postRequest } from '../../../utils';
import { toast } from 'react-toastify';

const AddMenuItemDialog = ({ onCreate }) => {
  const [open, setOpen] = useState(false);
  const defaultInfo = {
    name: '',
    category: '',
    price: '',
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

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(''); // Clear any previous errors
    try {
      const res = await postRequest({
        endpoint: '/menu-items',
        data: formData,
      });

      if (res.ok) {
        toast.success(res.message);
        handleOpen(); // Close dialog after successful submit
        onCreate(); // Refresh the parent component's data
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
        Add Menu Item
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add New Menu Item</DialogHeader>
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
            Add Item
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AddMenuItemDialog;
