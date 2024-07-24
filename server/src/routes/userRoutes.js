import express from "express";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserByID,
  updateUser,
} from "../controllers/userController.js";
import upload from "../middlewares/fileUpload.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .post(upload.single("userImg"), addUser)
  .get(getAllUsers)
  .patch()
  .delete();

userRouter
  .route("/:userID")
  .post()
  .get(getUserByID)
  .patch(upload.single("userImg"), updateUser)
  .delete(deleteUser);


export default userRouter;
