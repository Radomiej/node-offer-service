const OfferModel = require('../models/OfferModel');

exports.getOne = async function (request, h) {
    try {
        let user = await OfferModel.findById(request.params.id).exec();
        return h.response(user);
    } catch (error) {
        return h.response(error).code(500);
    }
};

exports.getAll = async function (request, h) {
    try {
        let user = await OfferModel.find().exec();
        return h.response(user);
    } catch (error) {
        return h.response(error).code(500);
    }
};

exports.findNearest = async function (request, reply) {
    let latitude = request.query.lat;
    let longitude = request.query.lon;
    // Max distance to search
    let maxDistance = 1000;
    if (request.query.distance !== 'undefined') {
        maxDistance = request.query.distance;
    }

    let findQuery = {
        location: {
            $near: {
                $maxDistance: maxDistance,
                $geometry: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                }
            }
        }
    };

    console.log("distance: " + maxDistance);

    try {
        let offers = await OfferModel.find(findQuery).exec();
        return reply.response(offers);
    } catch (error) {
        return reply.response(error).code(500);
    }


};


exports.count = function () {
    OfferModel.estimatedDocumentCount({}, function (err, c) {
        console.log('internal user count: ' + c);
        return c;
    });
};

exports.addOne = function (offerForm) {
    const offer = new OfferModel();

    offer._id = null;
    offer.owner = offerForm.owner;
    offer.created = Date.now();
    offer.updated = Date.now();
    offer.title = offerForm.title;
    offer.header = offerForm.header;
    offer.content = offerForm.content;
    offer.location = offerForm.location;


    console.log('add offer: ' + offer);

    offer.save(function (err) {


        if (err) {
            console.error(err);
            return false;
        }
        return offer;
    });
};