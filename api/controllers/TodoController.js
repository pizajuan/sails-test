/**
 * TodoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// let blueprint = require('sails-nested-blueprint');
// module.exports = blueprint;
'use strict';

module.exports = {
  // find: function(req, res){

  //   res.send('Ok');
  // }

  // create: require('sails-nested-blueprint').blueprint.create,

  filter: async function(req, res){
    // sails.log(req.allParams())
    // res.send(req.allParams().select);

    var list = await Todos.find({
      // where: { 'task.description': 'subir escaleras' },
      select: ['name','description']
    }).populate('tasks', {
      where: { description: "subir escaleras1" }
    });

    // var list = await Task.find({ desde task lo relaciono con todo
    //   where: { description: 'subir escaleras' },
    //   // select: ['name','description']
    // }).populate('todo');

    list = list.filter( todo => todo.tasks.length > 0) // filtro todos con tasks

    // list = list.filter(function(todo){
    //   return true;
    // })

    res.send(list);
  },

  getRelationFields: function(model) {
    var Model = sails.models[model];

    var output = [];

    _.each(Model.attributes, function(schema, field) {
      if (schema.hasOwnProperty('model') || schema.hasOwnProperty('collection')) {
        output.push(field);
      }
    });

    return output;
  },

  create: async function(req, res) {

    // todo esto lo hacemos para aceptar las creaciones con relaciones anidadas en primera estancia
    // luego de debe realizar alguna solucion general que permita realizarlo en todas las entidades
    //ademas debe hacerse transaccional

    // Assuming the POST contains all the data we need to create a user...
    sails.log(req.options.model)
    let mainModel = sails.models[req.options.model];

    var fields = module.exports.getRelationFields(req.options.model);
    sails.log('fields', fields);
    var todoData = req.allParams();
    // Extract the pet from the POSTed data
    var tasksData = todoData.tasks;
    // tasksData = tasksData[0];
    sails.log(tasksData);
    // Delete the pet from the POSTed data, if you
    // don't want it saved to the User collection in Mongo
    // sails.log(tasksData);
    delete todoData.tasks;

    sails.log(mainModel.attributes)// tengo todos los atributos del modelo
    sails.log('validacion: ',mainModel.validate('name','a')) // con esto valido cada uno

    if (!mainModel.validate('name','a')) {
      return res.badRequest();
    }

    var newTodo = await mainModel.create(todoData).fetch();

    sails.log(newTodo);

    for (let task of tasksData) {
      task.todo = newTodo.id;
    }

    sails.log(tasksData);

    var newTasks = await Task.createEach(tasksData).fetch();

    sails.log(newTasks);

    newTodo.tasks = newTasks;

    return res.json(newTodo);

  },

  // create: async function(req, res) {
  //   var ModelCreated = await module.exports.createNested('todos',
  //   {
  //     name: "todo nested2trans",
  //     description: "desc nested2trans",
  //     tasks:[
  //       {
  //         description: "subir nested2trans"
  //       }
  //     ]
  //   });

  //   res.json(ModelCreated);
  // },

  // createEachNested: function(model, records) {
  //   if (records && records.length > 0) {
  //     return module.exports.createNested(model, records.shift()).then(function(object) {
  //       return module.exports.createEachNested(model, records).then(function(objects) {
  //         objects.push(object);

  //         return Promise.resolve(objects);
  //       });
  //     });
  //   }

  //   return Promise.resolve([]);
  // },

  // getRelationFields: function(model) {
  //   var Model = sails.models[model];

  //   var output = [];

  //   _.each(Model.attributes, function(schema, field) {
  //     if (schema.hasOwnProperty('model') || schema.hasOwnProperty('collection')) {
  //       output.push(field);
  //     }
  //   });

  //   return output;
  // },

  // createNested: function(model, values) {
  //   // sails.log(model);
  //   var mainModel = sails.models[model];

  //   var fields = module.exports.getRelationFields(model);

  //   for (var i in fields) {
  //     var field = fields[i];

  //     if (typeof values[field] === 'object') {
  //       // If the value is an object or array - we need to create it first.

  //       var relatedSchema = mainModel.attributes[field];

  //       // faltaria el caso para el one-to-many

  //       if (values[field] instanceof Array) {
  //         // Many-to-Many associations.

  //         return module.exports.createEachNested(relatedSchema.collection, values[field]).then(function(relatedObjects) {
  //           delete values[field];

  //           return module.exports.createNested(model, values).then(function(object) {
  //             // Create relation between objects and new object
  //             var relatediModel = sails.models[relatedSchema.through];

  //             var outputPromises = relatedObjects.map(function(relatedObject) {
  //               var data = {};

  //               data[relatedSchema.collection] = relatedObject.id;
  //               data[relatedSchema.via] = object.id;

  //               return relatediModel.create(data);
  //             });

  //             return Promise.all(outputPromises).then(function() {
  //               return object;
  //             });
  //           });
  //         });
  //       }
  //       else {
  //         // One Way associations.

  //         return module.exports.createNested(relatedSchema.model, values[field]).then(function(object) {
  //           values[field] = object.id;

  //           return module.exports.createNested(model, values);
  //         });
  //       }
  //     }
  //   }

  //   return mainModel.findOrCreate(_.clone(values), _.clone(values));
  // }


}
