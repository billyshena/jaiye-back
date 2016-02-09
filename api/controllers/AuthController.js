/**
 * Created by bshen on 30/10/15.
 */
/**
 * AuthController
 *
 * @description :: Server-side logic for Jaiye's Auth system
 */

var https = require('https');
var bcrypt = require('bcrypt');

module.exports = {


  // Facebook Connect
  facebook: function (req, res) {

    if (!req.param('accessToken')) {
      return res.serverError('Missing parameters');
    }

    // Calling Graph API
    FBGraphService.fetch( req.param('accessToken'), 'email,name,first_name,last_name,birthday,gender,timezone,locale,location', function(profile) {

      User
        .findOrCreate(
        {
          facebookID: profile.id
        },
        {
          facebookID: profile.id,
          firstName: profile.first_name,
          lastName: profile.last_name,
          gender: profile.gender,
          locale: profile.locale,
          location: profile.location && profile.location.name ? profile.location.name : null,
          timezone: profile.timezone,
          birthday: profile.birthday,
          email: profile.email,
          avatar: 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
        }
      )
        .exec(function (err, user) {

          if (err) {
            return res.serverError(err);
          }

          if(!user) {
            return res.serverError(err);
          }

          var jsonToken = {
            id: user.id,
            hash: TokenService.issueToken(user)
          };


          return res.json({
            token: jsonToken,
            user: user
          });

        })
    });


  },


  // Admin panel auth function
  admin: function(req, res) {

    if(!req.param('email') || !req.param('password')) {
      return res.badRequest();
    }

    AdminService.adminAuth(req.param('email'), function(err, admin) {
      if(err) {
        return res.serverError(err);
      }

      // Compare password from the form params to the encrypted password of the user found.
      bcrypt.compare(req.param('password'), admin.password, function (err, valid) {

        if (err) {
          return serverError(err);
        }

        // If the password from the form doesn't match the password from the database...
        if (!valid) {
          return res.badRequest();
        }

        // Generate API access token to be stored in the browser (session/local storage)
        var jsonToken = JSON.stringify({
          id: admin.id,
          type: admin.type,
          hash: TokenService.issueToken(admin)
        });

        return res.json({
          token: jsonToken
        });

      });
    });

  },


  // Auth system for regular User
  user: function(req, res) {

      if(!req.param('email') || !req.param('password')) {
        return res.badRequest();
      }

      UserService
          .userLogin( { email: req.param('email') }, function(err, user) {
            if(err) {
              return res.serverError(err);
            }

            // Compare password from the form params to the encrypted password of the user found.
            bcrypt.compare(req.param('password'), user.password, function (err, valid) {

              if (err) {
                return serverError(err);
              }

              // If the password from the form doesn't match the password from the database...
              if (!valid) {
                return res.badRequest();
              }

              // Generate API access token to be stored in the browser (session/local storage)
              var jsonToken = JSON.stringify({
                id: user.id,
                hash: TokenService.issueToken(user)
              });

              return res.json({
                token: jsonToken
              });

            });

          });

  }





};
