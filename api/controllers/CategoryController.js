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

    },


    // Fetch all categories available
    find: function(req, res) {

        var where = req.allParams();
        CategoryService.findCategories(where, function(err, categories) {
          if(err) {
            return res.serverError(err);
          }
          return res.json(categories);
        });

    },

    update: function(req, res) {

        if(!req.param('id') || !req.param('name')) {
          return res.badRequest();
        }

        CategoryService.updateCategory(req.param('id'), { name: req.param('name') }, function(err, category) {
          if(err) {
            return res.serverError(err);
          }
          return res.json(category);
        });

    },


    destroy: function(req, res) {

        if(!req.param('id')) {
          return res.badRequest();
        }

        CategoryService.deleteCategory(req.param('id'), function(err) {
          if(err) {
            return res.serverError(err);
          }
          return res.json(200);
        });

    }

};

