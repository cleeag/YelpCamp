const mongoose = require('mongoose');
const cities = require("./cities");
const Campground = require('../models/campground')
const { places, descriptors} = require('./seedHelpers');

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

  for(let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)}, ${sample(places)}`,
      image: 'http://source.unsplash.com/collection/483251',
      description: 'something something',
      price
    })
    await camp.save();
  }
  const c = new Campground({ title: 'purple field'});
  await c.save();
}

seedDB().then(() => {
  mongoose.connection.close();
})