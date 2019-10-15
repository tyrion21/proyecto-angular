'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema

var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs:String,
    image: String
})

// eslint-disable-next-line no-undef
module.exports = mongoose.model('Project',ProjectSchema)