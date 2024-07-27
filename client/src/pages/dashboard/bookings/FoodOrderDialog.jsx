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
  IconButton,
} from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { postRequest, getRequest, patchRequest } from '../../../utils';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const FoodOrderDialog = ({ bookingId, onOrderPlaced }) => {
  const [open, setOpen] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Appetizer');
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [apiError, setApiError] = useState('');

  const { data: menuItems, isLoading } = useQuery({
    queryKey: ['menuItems', selectedCategory],
    queryFn: async () => {
      if (!selectedCategory) return [];
      const res = await getRequest({
        endpoint: `/menu-items?category=${selectedCategory}`,
      });
      return res.data || [];
    },
    enabled: !!selectedCategory,
  });

  const handleOpen = () => {
    setOpen(!open);
    if (!open) {
      setOrderList([]);
      setSelectedItem('');
      setQuantity('');
      setApiError('');
    }
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedItem('');
  };

  const handleSelectChange = (itemID) => {
    const selectedItem = menuItems.find((item) => item._id === itemID);
    if (selectedItem) {
      setSelectedItem(selectedItem);
      setQuantity(''); // Reset quantity on new selection
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (
      value === '' ||
      (Number(value) > 0 && Number.isInteger(Number(value)))
    ) {
      setQuantity(value);
    }
  };

  const addFoodItemToOrder = () => {
    if (selectedItem && quantity > 0) {
      const { name, price, _id } = selectedItem;
      setOrderList([
        ...orderList,
        { _id, itemName: name, price, quantity: Number(quantity) },
      ]);
      setSelectedItem('');
      setQuantity('');
    } else {
      setApiError('Please select a food item and set a valid quantity.');
    }
  };

  const handleDeleteItem = (index) => {
    const newOrderList = [...orderList];
    newOrderList.splice(index, 1);
    setOrderList(newOrderList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    try {
      const res = await patchRequest({
        endpoint: `/bookings/${bookingId}/add-food`,
        data: { items: orderList },
      });

      if (res.ok) {
        handleOpen();
        onOrderPlaced();
        toast.success('Order added successfully');
        return;
      }

      setApiError(res.message);
    } catch (error) {
      setApiError(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient" size="sm">
        Add Food
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add Food Items</DialogHeader>
        <DialogBody className="text-black">
          {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}
          <div className="flex flex-col space-y-4">
            <Select
              label="Select Category"
              onChange={handleCategoryChange}
              value={selectedCategory}
              required
            >
              <Option value="Appetizer">Appetizer</Option>
              <Option value="Main Course">Main Course</Option>
              <Option value="Dessert">Dessert</Option>
              <Option value="Beverage">Beverage</Option>
              <Option value="Side">Side</Option>
            </Select>

            {isLoading ? (
              <p>Loading menu items...</p>
            ) : (
              <>
                <Select
                  label="Select Food Item"
                  onChange={handleSelectChange}
                  value={selectedItem._id || ''}
                  required
                >
                  {menuItems.map((item) => (
                    <Option key={item._id} value={item._id}>
                      {item.name} - NRP {item.price}
                    </Option>
                  ))}
                </Select>
                <Input
                  type="number"
                  label="Quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={1}
                  required
                />
                <Button variant="text" onClick={addFoodItemToOrder}>
                  Add to Order
                </Button>
              </>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-2">Order List</h3>
              <ul className="list-disc pl-5 space-y-2">
                {orderList.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>
                      {index + 1}. {item.itemName} - {item.quantity} x{' '}
                      {item.price} USD
                    </span>
                    <IconButton
                      size="sm"
                      color="red"
                      onClick={() => handleDeleteItem(index)}
                    >
                      <FaTrash />
                    </IconButton>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
            Add Food
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default FoodOrderDialog;
