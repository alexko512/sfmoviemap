const mongoose = require('mongoose')

const  dataSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    }, 
    YearofRelease: {
        type: String,
        required: true
    },
    Locations: {
        type: String,
        required: true
    },
    ProductionCompany: {
        type: String,
        required: true
    },
    Distributor: {
        type: String,
        required: true
    },
    Director: {
        type: String,
        required: true
    },
    Writer: {
        type: String,
        required: true
    },
    Actors: {
        type: String,
        required: true
    }}, { collection: 'sf' }
)

const locationData = mongoose.model('location', dataSchema)
module.exports = locationData;