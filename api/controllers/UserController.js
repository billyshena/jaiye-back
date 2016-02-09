/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    create: function(req, res) {

        if(!req.param('firstName') || !req.param('lastName') || !req.param('email') || !req.param('password')) {
            return res.badRequest();
        }

        UserService
            .createUser(req.allParams(), function(err, user) {
              if(err) {
                return res.serverError(err);
              }
              return res.json(user);
            });

    }





};

