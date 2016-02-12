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


exports.findUsers = function(where, next) {

  User
      .find()
      .where(where)
      .exec(function(err, users) {
        if(err) {
          console.log('err', err);
        }
        if(!users) {
          console.log('Users not found in findUsers');
        }
        next(err, users);

      });

};


exports.updateUser = function(params, next) {

  User
      .update(params.id, params)
      .exec(function(err, user) {
        if(err) {
          console.log('err', err);
        }
        if(!user || !user[0]) {
          console.log('No user object found in updateUser');
        }
        next(err, user[0]);

      });

};