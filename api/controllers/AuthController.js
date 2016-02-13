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
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var request = require('request');
var qs = require('querystring');

module.exports = {


  // Facebook Connect
  facebook: function (req, res) {

    var fields = ['email', 'name', 'first_name', 'last_name', 'birthday', 'gender', 'timezone', 'locale', 'location'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    var params = {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: sails.config.custom.facebook.clientSecret,
      redirect_uri: req.body.redirectUri
    };

    // 1: Get an access token from the graph api
    request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
      if (response.statusCode !== 200) {
        return res.status(500).send({ message: accessToken.error.message });
      }

      // Step 2. Retrieve profile information about the current user.
      request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
        if (response.statusCode !== 200) {
          return res.status(500).send({ message: profile.error.message });
        }

        // Find User or Create if does not exist
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

              /* Returns JWT to call the Jaiye API */
              return res.json({
                token: jsonToken,
                user: user
              });

            });

      });
    });
  },



  twitter: function(req, res) {


    var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
    var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
    var profileUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name=';

    // Part 1 of 2: Initial request from Satellizer.
    if (!req.body.oauth_token || !req.body.oauth_verifier) {

      var requestTokenOauth = {
        consumer_key: sails.config.custom.twitter.consumerKey,
        consumer_secret: sails.config.custom.twitter.consumerSecret,
        callback: req.body.redirectUri
      };

      // Step 1. Obtain request token for the authorization popup.
      request.post({ url: requestTokenUrl, oauth: requestTokenOauth }, function(err, response, body) {
        var oauthToken = qs.parse(body);

        // Step 2. Send OAuth token back to open the authorization screen.
        res.send(oauthToken);
      });
    } else {

      // Part 2 of 2: Second request after Authorize app is clicked.
      var accessTokenOauth = {
        consumer_key: sails.config.custom.twitter.consumerKey,
        consumer_secret: sails.config.custom.twitter.consumerSecret,
        token: req.body.oauth_token,
        verifier: req.body.oauth_verifier
      };

      // Step 3. Exchange oauth token and oauth verifier for access token.
      request.post({ url: accessTokenUrl, oauth: accessTokenOauth }, function(err, response, accessToken) {

        accessToken = qs.parse(accessToken);

        var profileOauth = {
          consumer_key: sails.config.custom.twitter.consumerKey,
          consumer_secret:sails.config.custom.twitter.consumerSecret,
          oauth_token: accessToken.oauth_token
        };

        // Step 4. Retrieve profile information about the current user.
        request.get({
          url: profileUrl + accessToken.screen_name,
          oauth: profileOauth,
          json: true
        }, function(err, response, profile) {

          if(err) {
            console.log('err', err);
          }

          console.log('profile', profile);


          // Find User or Create if does not exist
          User
              .findOrCreate(
              {
                twitterID: profile.id
              },
              {
                twitterID: profile.id,
                firstName: profile.name,
                lastName: profile.screen_name,
                gender: profile.gender,
                locale: profile.lang,
                location: profile.time_zone,
                birthday: profile.birthday,
                avatar: profile.profile_image_url
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

                /* Returns JWT to call the Jaiye API */
                return res.json({
                  token: jsonToken,
                  user: user
                });

              });
        });
      });
    }



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
            console.log('user', user);
            if(err) {
              return res.serverError(err);
            }

            if(!user) {
              return res.badRequest();
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
