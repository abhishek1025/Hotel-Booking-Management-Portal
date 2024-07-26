import express from 'express';
import {
    createMenuItem,
    deleteMenuItem,
    getAllMenuItems,
    updateMenuItem,
} from '../controllers/menuController.js';

const menuItemRouter = express.Router();

// Routes for all menu items
menuItemRouter
  .route('/')
  .post(createMenuItem) // Create a new menu item
  .get(getAllMenuItems); // Get all menu items

// Routes for specific menu item by ID
menuItemRouter
  .route('/:menuItemID') // Get a specific menu item by ID
  .put(updateMenuItem) // Update a specific menu item by ID
  .delete(deleteMenuItem); // Delete a specific menu item by ID

export default menuItemRouter;
