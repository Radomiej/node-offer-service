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
        login: "admin",
        password: "admin",
        roles: ['admin', 'user', 'manager']
    };

    OfferService.addOne(firstOffer);
}