const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedhelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) + 10; 
        const camp = new Campground({
            author: '617755192f7eb342f59281d2',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum praesentium nostrum eligendi',
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
                  url: 'https://res.cloudinary.com/dgcafi3pb/image/upload/v1636226740/YelpCamp/vkokxh16smuhnbpio0sx.jpg',
                  filename: 'YelpCamp/vkokxh16smuhnbpio0sx',
                },
                {
                  url: 'https://res.cloudinary.com/dgcafi3pb/image/upload/v1636226741/YelpCamp/wnqdpogi0v1zbniutkfv.jpg',
                  filename: 'YelpCamp/wnqdpogi0v1zbniutkfv',
                }
            ]})
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close()
})