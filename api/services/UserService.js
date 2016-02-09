/**
 * Created by bshen on 09/02/16.
 */


// Create a new User / Sign up
exports.createUser = function(params, next) {

    User
      .create(params)
      .exec(function(err, user) {
          if(err) {
            console.log('err', err);
          }
          next(err, user);
        });

};


// User login system
exports.userLogin = function(params, next) {

    User
        .findOne(params)
        .exec(function(err, user) {
          if(err) {
            console.log('err', err);
          }
          if(!user) {
            console.log('No user found for this e-mail in userLogin');
          }
          next(err, user);
        });
};
