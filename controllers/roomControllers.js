import Room from '../models/room';

import ErrorHandler from '../utils/errorHandler';
import catchAsyncError from '../middlewares/catchAsyncError';
import APIFeatures from '../utils/apiFeatures';

//Create all rooms => /api/rooms

const allRooms = catchAsyncError(async (req, res) => { 
  const resPerPage = 4;
  const roomsCount = await Room.countDocuments();
  const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter();
  let rooms = await apiFeatures;
  const filteredRoomsCount = rooms.length;
  apiFeatures.pagination(resPerPage);
  rooms = await apiFeatures.query;

  res.json({
    success: true,
    roomsCount,
    resPerPage,
    filteredRoomsCount,
    rooms,
  });
});

//create new room => /api/rooms
const newRoom = catchAsyncError(async (req, res) => {
  const images = req.body.images;
  // let imagesLinks = [];
  // for (let i = 0; i < images.length; i++) {
  //   const result = await cloudinary.v2.uploader.upload(images[i],{
  //     folder: '/bookit/rooms'
  //   });
  //   imagesLinks.push({
  //     public_id: result.public_id,
  //     url: result.secure_url
  //   })
  // }
  //req.body.images = imageLinks;
  //req.body.user = req.user._id; //this one will come when i will authenticate.
  const room = await Room.create(req.body);
  res.status(201).json({
    success: true,
    room,
  });
});

//Get room details => /api/rooms/:id
const getSingleRoom = catchAsyncError(async (req, res, next) => {
  const room = await Room.findById(req.query.id); //this should be req.params.id
  if (!room) {
    return next(new ErrorHnalder('Room Not Found with this ID', 404));
  }
  res.status(200).json({
    success: true,
    room,
  });
});

//update room details => /api/rooms/:id
const updateRoom = catchAsyncError(async (req, res) => {
  let room = await Room.findById(req.query.id);
  if (!room) {
    return next(new ErrorHandler('Room not found with this ID', 404));
  }
  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    room,
  });
});

//Delete room => /api/rooms/:id
const deleteRoom = catchAsyncError(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  if (!room) {
    return next(new ErrorHandler('Room not found with this ID', 404));
  }
  await room.remove(); //we could also do find by id and delete.
  res.json({
    success: true,
    message: 'Room is deleted',
  });
});

export { allRooms, deleteRoom, newRoom, updateRoom, getSingleRoom };
