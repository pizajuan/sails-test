var jwt = require('jsonwebtoken');
var jwtSecret = sails.config.secrets.jwtSecret;

module.exports = function(req, res, next) {

  sails.log('checking')
	var token;
	//Check if authorization header is present
	if(req.headers && req.headers.authorization) {
		//authorization header is present
		var parts = req.headers.authorization.split(' ');
		if(parts.length == 2) {
			var scheme = parts[0];
			var credentials = parts[1];

			if(/^Bearer$/i.test(scheme)) {
				token = credentials;
			}
		} else {
			return res.json(401, {err: 'Format is Authorization: Bearer [token]'});
		}
	} else {
    //authorization header is not present
    return res.json(401, {err: 'No Authorization header was found'});
  }

  var decoded = jwt.verify(token, jwtSecret);

  if(decoded){
    next();
  } else {
    return res.json(401, {err: 'Invalid token'});
  }
};
