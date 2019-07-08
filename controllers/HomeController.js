exports.register = function (server) {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
            return 'User Service v 1.0.0';
        }
    });
};