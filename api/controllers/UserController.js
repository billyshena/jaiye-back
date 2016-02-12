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

    },


    find: function(req, res) {

      var where = req.allParams();
      UserService.findUsers(where, function(err, users) {
        if(err) {
          return res.serverError(err);
        }
        return res.json(users);
      });

    },


    update: function(req, res) {

      var params = req.allParams();

      // If not Admin, set user id to be the one of the token to avoid security issues
      if(req.token.type !== sails.config.custom.adminTypeUUID) {
        params.id = req.token.id;
      }

      UserService.updateUser(params, function(err, user) {
        if(err) {
          return res.serverError(err);
        }
        return res.json(user);

      });

    }





};

