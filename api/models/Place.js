const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
title: String,
adress: String,
photos: [String],
description: String,
perks: [String],
expraInfo: String,
checkIn: Number,
checkOut: Number,
maxGuests: Number,
})

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;