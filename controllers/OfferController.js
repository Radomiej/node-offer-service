const OfferService = require('../services/OfferService');

exports.register = function (server) {
    server.route({
        method: 'GET',
        path: '/offers',
        handler: OfferService.getAll
    });

    server.route({
        method: 'GET',
        path: '/offers/{id}',
        handler: OfferService.getOne
    });

    server.route({
        method: 'GET',
        path: '/offers/nearest',
        handler: OfferService.findNearest
    });
};