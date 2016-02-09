/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // Create a new Admin user
    create: function(req, res) {

      if(!req.param('email') || !req.param('password')) {
        return res.badRequest();
      }

      AdminService.createAdmin(req.allParams(), function(err, admin) {
        if(err) {
          console.log('error');
          res.serverError(err);
        }
        else{
          return res.json(admin);
        }
      });

    }


};

