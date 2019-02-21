var jwt = require('jsonwebtoken');
var jwtSecret = sails.config.secrets.jwtSecret;

module.exports = {


  friendlyName: 'Jwt service',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    // All done.
    return exits.success();

  },

  issue: function (payload) {
    token = jwt.sign(payload, jwtSecret, {expiresIn: 180 * 60})
    return token
  },

  verify: function (token, callback) {
    return jwt.verify(token, jwtSecret, callback);
  }


};

