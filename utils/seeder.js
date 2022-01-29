const Room = require('../models/room');
const rooms = require('../data/rooms');
const mongoose = require('mongoose');
mongoose
  .connect('mongodb://127.0.0.1:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => console.log('Connected to database'));
const seedRooms = async () => {
  try {
    await Room.deleteMany();
    console.log('Rooms are deleted');
    await Room.insertMany(rooms);
    console.log('All rooms are added');
    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};
seedRooms();
