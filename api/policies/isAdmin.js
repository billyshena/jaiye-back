/**
 * Created by bshen on 09/02/16.
 */
module.exports = function(req, res, next) {
  if(req.token.type !== sails.config.custom.adminTypeUUID){
    return res.forbidden();
  }
  return next();
};
