import bcrypt from 'bcrypt';
import { HttpStatus } from '../constant/constants.js';
import { User } from '../schemaModels/model.js';
import { generateAuthToken } from '../utils/index.js';

import {
  asyncErrorHandler,
  sendSuccessResponse,
  throwError,
} from '../helpers/index.js';

export const login = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throwError({
      message: 'Email and password required',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    throwError({
      message: 'User does not exist with this email address',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Comparing the password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throwError({
      message: 'Wrong email or password',
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }

  // Cannot send password to frontend because of security issues
  const userInfoForToken = { _id: user._id, email };

  const authToken = generateAuthToken(userInfoForToken);

  user.password = null;

  sendSuccessResponse({
    res,
    statusCode: HttpStatus.OK,
    message: `Authentication successful`,
    data: {
      user: user,
      token: authToken,
    },
  });
});

export const changePassword = asyncErrorHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const email = req.email;

  if (!email || !currentPassword || !newPassword) {
    throwError({
      message: 'Current password and new password are required',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    throwError({
      message: 'User does not exist with this email address',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Comparing the password
  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isCurrentPasswordValid) {
    throwError({
      message: 'Wrong password, please check your password',
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }

  user.password = newPassword;

  await user.save();

  sendSuccessResponse({
    res,
    statusCode: HttpStatus.OK,
    message: 'Password has been changed successfully',
  });
});
