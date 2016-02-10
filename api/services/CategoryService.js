/**
 * Created by bshen on 09/02/16.
 */



exports.createCategory = function(params, next) {

    Category
      .create(params)
      .exec(function(err, category) {
        if(err) {
          console.log('err', err);
        }
        next(err, category);
      });

};


exports.findCategories = function(where, next) {

    Category
        .find()
        .where(where)
        .exec(function(err, categories) {
          if(err) {
            console.log('err', err);
          }
          next(err, categories);
        });

};


exports.updateCategory = function(id, params, next) {


    Category
        .update(id, params)
        .exec(function(err, category) {
          if(err) {
            console.log('err', err);
          }
          var result = category[0] || {};
          next(err, result);
        });



};

exports.deleteCategory = function(id, next) {

    Category
        .destroy(id)
        .exec(function(err) {
          if(err) {
            console.log('err', err);
          }
          next(err, null);
        });

};