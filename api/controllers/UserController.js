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
var nodemailer = require('nodemailer');

module.exports = {

  create: async function (req, res) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.badRequest('Invalid password!');
    }

    var allowedParameters = [
      "email", "password"
    ]

    var data = _.pick(req.body, allowedParameters);

    var createdUser = await User.create(data).fetch();

    delete createdUser.password

    var token = jwt.sign(createdUser, jwtSecret, {expiresIn: 180 * 60});

    var responseData = {
      user: createdUser,
      token: token
    }

    res.status(201)

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
              user: 'piza.juan1@gmail.com',
              pass: '1505zhjd2019*'
            }
    })

    const mailData = {
      from: 'piza.juan1@gmail.com', // sender address
      to: 'piza.juan1@gmail.com', // list of receivers
      subject: 'Subject of your email', // Subject line
      html: '<p>Hola</p>'// plain text body
    }

    transporter.sendMail(mailData, function (err, info) {
      if(err)
        sails.log(err)
      else
        sails.log(info);
    })


    return res.json(responseData)
  },

  login: async function(req, res) {

      var user = await User.findOne({email: req.body.email});
      //Compare the password
      bcrypt.compare(req.body.password, user.password, function(err, result) {
          if(result) {
            //password is a match
            delete user.password
            return res.ok({
                  user:user,
                  token: jwt.sign(user, jwtSecret, {expiresIn: 10000000})//generate the token and send it in the response
              });
          } else {
            //password is not a match
            return res.forbidden({err: 'Email and password combination do not match'});
          }
      });
  }

};

