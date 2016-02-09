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
