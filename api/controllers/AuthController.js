/**
 * Created by bshen on 30/10/15.
 */
/**
 * AuthController
 *
 * @description :: Server-side logic for Jaiye's Auth system
 */

var https = require('https');

module.exports = {


  // Facebook Connect
  facebook: function (req, res) {

    if (!req.param('accessToken')) {
      return res.serverError('Missing parameters');
    }

    // Calling Graph API
    FBGraphService.fetch( req.param('accessToken'), 'email,name,first_name,last_name,birthday,gender,timezone,locale,location', function(profile) {

      sails.log('Facebook User', profile);
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


  }





};
