const OfferModel = require('../models/OfferModel');
const OfferService = require('./OfferService');

exports.init = function () {

    //Prepare demo
    // if(UserService.count() > 0) return;

    //Clean database
    OfferModel.deleteMany({}, (err) => {
        console.error('delete all users');
        addDemoUsers();
        // console.log('user count: ' + UserService.count());
    });


};

function addDemoUsers() {
    let firstOffer = {
        owner: "admin",
        title: "Offer Number One",
        header: "This is HEADER!",
        content: "THIS IS CONTENT!",
        location: {
            type: 'Point',
            coordinates: [16, 52]
        }
    };

    let secoundOffer = {
        owner: "admin",
        title: "Offer Number Two",
        header: "This is HEADER!",
        content: "THIS IS CONTENT!",
        location: {
            type: 'Point',
            coordinates: [52, 16]
        }
    };

    OfferService.addOne(firstOffer);
    OfferService.addOne(secoundOffer);
}