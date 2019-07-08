
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

exports.findNear = function (request, reply) {
    let latitude = request.params['lat'];
    let longitude = request.params['lon'];
    // Max distance to search
    let maxDistance = 1000;
    if(request.params['distance'] !== 'undefined'){
        maxDistance = request.params['distance']
    }

    OfferModel.find({
        location: {
            $near: {
                $maxDistance: maxDistance,
                $geometry: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                }
            }
        }
    }).exec(function (err, offers) {
        return reply.header('Content-Type', 'application/json').response(offers);
    });
};


exports.count = function () {
    OfferModel.estimatedDocumentCount({}, function (err, c) {
        console.log('internal user count: ' + c);
        return c;
    });
};

exports.addOne = function (userForm) {
    const user = new OfferModel();

    user._id = null;
    user.login = userForm.login;
    user.password = userForm.password;
    user.basic = makeBaseAuth(user.login, user.password);
    user.roles = userForm.roles;

    console.log('basic: ' + user.basic);

    user.save(function (err) {


        if (err) {
            console.error(err);
            return false;
        }
        return user;
    });
};

function makeBaseAuth(user, password) {
    let tok = user + ':' + password;

    let buff = Buffer.from(tok);
    let hash = buff.toString('base64');
    return "Basic " + hash;
}