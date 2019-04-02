/**
 * Todo.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    name: {
      type: 'string',
      required: true,
      isNotEmptyString: true,
      minLength: 4
      //example of custom validation
      // custom: function(value) {
      //   // • be a string
      //   // • be at least 6 characters long
      //   // • contain at least one number
      //   // • contain at least one letter
      //   return _.isString(value) && value.length >= 6 && value.match(/[a-z]/i) && value.match(/[0-9]/);
      // }
    },

    description: {
      type: 'string',
      required: true
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    tasks: {
      collection: 'task',
      via: 'todo'
    }

  },

  beforeCreate: function (valuesToSet, proceed) {
    sails.log('before create');
    sails.log(valuesToSet.tasks)
    return proceed();
  },

  afterCreate: function (valuesToSet, proceed) {
    sails.log('after create');
    return proceed();
  },

  // customToJSON: function() {// si se desea agregar o quitar algo a la respuesta
  //   // Return a shallow copy of this record with the password and ssn removed.
  //   // sails.log(this)
  //   // this['count']=10
  //   // sails.log(this)
  //   return _.omit(this, ['tasks'])
  // },

  // count: 10,

};

