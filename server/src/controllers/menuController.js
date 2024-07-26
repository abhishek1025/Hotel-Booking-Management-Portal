import mongoose from 'mongoose';
import { HttpStatus } from '../constant/constants.js';
import {
  asyncErrorHandler,
  sendSuccessResponse,
  throwError,
} from '../helpers/index.js';
import { MenuItem } from '../schemaModels/model.js';

export const createMenuItem = asyncErrorHandler(async (req, res) => {
  const { name, category, price } = req.body;

  // Check for existing menu item by name
  const existingItem = await MenuItem.findOne({ name });

  if (existingItem) {
    throwError({
      message: 'Menu item with this name already exists',
      statusCode: HttpStatus.CONFLICT,
    });
  }

  const menuItem = new MenuItem({ name, category, price });

  await menuItem.save();

  sendSuccessResponse({
    res,
    message: 'Menu item created successfully',
    data: menuItem,
  });
});


export const getAllMenuItems = asyncErrorHandler(async (req, res) => {
  const { category } = req.query;

  // Build the query object conditionally based on the presence of the category
  const query = category ? { category } : {};

  // Find menu items based on the query
  const menuItems = await MenuItem.find(query);

  if (!menuItems.length) {
    throwError({
      message: 'No menu items found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  sendSuccessResponse({
    res,
    message: 'Menu items retrieved successfully',
    data: menuItems,
  });
});


export const updateMenuItem = asyncErrorHandler(async (req, res) => {
  const menuItemID = req.params.menuItemID;
  const { name, category, price } = req.body;

  if (!mongoose.Types.ObjectId.isValid(menuItemID)) {
    throwError({
      message: 'Invalid menu item ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const menuItem = await MenuItem.findByIdAndUpdate(
    menuItemID,
    { name, category, price },
    { new: true, runValidators: true }
  );

  if (!menuItem) {
    throwError({
      message: 'Menu item not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  sendSuccessResponse({
    res,
    message: 'Menu item updated successfully',
    data: menuItem,
  });
});


export const deleteMenuItem = asyncErrorHandler(async (req, res) => {
  const menuItemID = req.params.menuItemID;

  if (!mongoose.Types.ObjectId.isValid(menuItemID)) {
    throwError({
      message: 'Invalid menu item ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const menuItem = await MenuItem.findByIdAndDelete(menuItemID);

  if (!menuItem) {
    throwError({
      message: 'Menu item not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  sendSuccessResponse({
    res,
    message: 'Menu item deleted successfully',
  });
});
