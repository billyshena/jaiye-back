/**
 * TagController
 *
 * @description :: Server-side logic for managing tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // Create a new Tag
    create: function(req, res) {

        if(!req.param('name')) {
          return res.badRequest();
        }

        TagService
            .createTag( { name: req.param('name') }, function(err, tag) {
              if(err) {
                return res.serverError(err);
              }
              return res.json(tag);
            });

    },


    // Return all tags available
    find: function(req, res) {

        if(!req.param('term')) {
          return res.badRequest();
        }

        // Build automcompletion query parameters
        var where = {
          name: {
            startsWith: req.param('term')
          }
        };

        TagService
            .getTags(where, function(err, tags) {
              if(err) {
                return res.serverError(err);
              }
              return res.json(tags);
            });
    }
	
};

