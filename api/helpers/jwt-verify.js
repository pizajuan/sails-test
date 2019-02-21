var jwt = require('jsonwebtoken');
var jwtSecret = sails.config.secrets.jwtSecret;

module.exports = {


  friendlyName: 'Jwt verify',


  description: '',


  inputs: {
    token: {
      type: 'string',
      required: true
    },
    callback: {
      type: 'json',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    return exits.success(jwt.verify(token, jwtSecret, callback));

  }


};

