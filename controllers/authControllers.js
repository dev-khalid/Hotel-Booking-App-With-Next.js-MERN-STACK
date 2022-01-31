import User from '../models/user';
import cloudinary from 'cloudinary';
import ErrorHandler from '../utils/errorHandler';
import catchAsyncError from '../middlewares/catchAsyncError';

import crypto from 'crypto';

// Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const registerUser = catchAsyncError(async (req, res, next) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'bookit/avatars',
    width: '150',
    crop: 'scale',
  });
  console.log('result a ki ache', result);
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });
  console.log('result ki ', user);
  res.status(201).json({
    success: true,
    message: 'Account Registered Successfully!',
  });
});

// Cuurent user profile   =>   /api/me
const currentUserProfile = catchAsyncError(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

//update user profile => /api/me/update
const updateProfile = catchAsyncError(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;
  }

  //Update avatar
  if (req.body.avatar !== '') {
    const image_id = user.avatar.public_id;
    //Delete user previos image/avatar
    await cloudinary.v2.uploader.destroy(image_id);
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'bookit/avatars',
      width: '150',
      crop: 'scale',
    });
    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  await user.save();
  res.status(200).json({
    success: true,
  });
});

export { registerUser, currentUserProfile, updateProfile };
