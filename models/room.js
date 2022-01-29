const mongoose = require('mongoose');

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: ['Please enter room name'],
      trim: true,
      maxLength: [100, 'Room name can not exceed 100 characters'],
    },
    pricePerNight: {
      type: Number,
      required: ['Please enter room price per night'],
      maxLength: [4, 'Room Price can not exceed 4 characters'],
      default: 0.0,
    },
    description: {
      type: String,
      required: ['Please enter room description'],
    },
    address: {
      type: String,
      required: ['Please Enter room address'],
    },
    //heres my question . room er abar address hoy naki hotel er address hote pare . room  jodi different branch er hotel er under a hoye thake tahole hote pare. eita
    guestCapacity: {
      type: Number,
      required: ['Please enter room guest capacity'],
    },
    numOfBeds: {
      type: Number,
      required: ['Please enter the number of beds'],
    },
    internet: {
      type: Boolean,
      default: false,
    },
    breakfast: {
      type: Boolean,
      default: false,
    },
    airConditioned: {
      type: Boolean,
      default: false,
    },
    petsAllowed: {
      type: Boolean,
      default: false,
    },
    roomCleaning: {
      type: Boolean,
      default: false,
    },
    ratings: {
      type: Boolean,
      default: false,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: ['Please Enter room category'],
      enum: {
        values: ['King', 'Single', 'Twins'],
      },
    },
    subCategory: {
      type: String,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],

    //ei user hocche je ei room ta create korche se .
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.models.Room || mongoose.model('Room', roomSchema);
