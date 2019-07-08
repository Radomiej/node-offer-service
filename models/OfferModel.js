const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new mongoose.Schema({
    _id: {type: Schema.Types.ObjectId, required: false},
    type: {type: String, enum: ['Point'], required: true},
    coordinates: {type: [Number], required: true}
});

let OfferSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, required: false},
    owner: {type: String, required: true},
    created: {type: String, required: true},
    updated: {type: String, required: true},
    title: {type: [String], required: true},
    header: {type: String, required: false},
    content: {type: String, required: false},
    location: {type: pointSchema, required: true}
}, {collection: 'offers'});

OfferSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret._class;
        delete ret.password;
        delete ret.basic;
    }
});

OfferSchema.index({ created: 1 });
OfferSchema.index({ location: "2dsphere" });

// Export the models
module.exports = mongoose.model('Offer', OfferSchema);