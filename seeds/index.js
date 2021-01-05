const mongoose = require('mongoose');
const cities = require("./cities");
const Campground = require('../models/campground')
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connnection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '5ff28e0954685713db07e8a6',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)}, ${sample(places)}`,
      description: 'something something',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dsgkkqc2o/image/upload/v1609798390/YelpCamp/pdvf2dr2vgy5pzyppbtw.jpg',
          filename: 'YelpCamp/pdvf2dr2vgy5pzyppbtw'
        },
        {
          url: 'https://res.cloudinary.com/dsgkkqc2o/image/upload/v1609798390/YelpCamp/aa4bd9c2ksvmufcomepa.jpg',
          filename: 'YelpCamp/aa4bd9c2ksvmufcomepa'
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})