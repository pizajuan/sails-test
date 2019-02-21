var jwt = require('jsonwebtoken');
var jwtSecret = sails.config.secrets.jwtSecret;

module.exports = {


  friendlyName: 'Jwt issue',


  description: '',


  inputs: {

    payload: {
      type: 'json',
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    token = jwt.sign(inputs, jwtSecret, {expiresIn: 180 * 60})
    return exits.success(token);

  }


};

