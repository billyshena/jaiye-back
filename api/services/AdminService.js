/**
 * Created by bshen on 09/02/16.
 */

// Admin auth system
exports.adminAuth = function(email, next) {


  Admin
    .findOne( { email: email } )
    .exec(function(err, admin) {
      if(err) {
        console.log('err', err);
      }
      if(!admin) {
        console.log('No Admin found in adminAuth');
      }
      next(err, admin);
    });

};


// Create a new Admin user
exports.createAdmin = function(params, next) {

  Admin
    .create(params)
    .exec(function(err, admin) {
      if(err) {
        console.log('err', err);
      }
      next(err, admin);
    });


};
