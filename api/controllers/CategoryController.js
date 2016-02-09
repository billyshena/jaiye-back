/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


    create: function(req, res) {

        if(!req.param('name')) {
          return res.badRequest();
        }

        CategoryService
          .createCategory( { name: req.param('name') }, function(err, category) {
              if(err) {
                return res.serverError(err);
              }
              return res.json(category);
          });

    }

};

