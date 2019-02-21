/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var jwtSecret = sails.config.secrets.jwtSecret;
var bcrypt = require('bcrypt');

module.exports = {

  create: async function (req, res) {
    // sails.log('entro');
    sails.log(req.body);
    if (req.body.password !== req.body.confirmPassword) {
      return res.badRequest('Invalid password!');
    }

    var allowedParameters = [
      "email", "password"
    ]

    var data = _.pick(req.body, allowedParameters);

    sails.log(data);

    var createdUser = await User.create(data).fetch();

    var token = jwt.sign(createdUser, jwtSecret, {expiresIn: 180 * 60});

    sails.log(token);

    var responseData = {
      user: createdUser,
      token: token
    }

    sails.log(createdUser);

    return res.ok(responseData)
  },

  login: async function(req, res) {

      var user = await User.findOne({email: req.body.email});
      sails.log(user);
      //Compare the password
      bcrypt.compare(req.body.password, user.password, function(err, result) {
          if(result) {
            //password is a match
            return res.ok({
                  user:user,
                  token: jwt.sign(user, jwtSecret, {expiresIn: 10000})//generate the token and send it in the response
              });
          } else {
            //password is not a match
            return res.forbidden({err: 'Email and password combination do not match'});
          }
      });
  }

};

