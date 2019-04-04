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

    // todo esto lo hacemos para aceptar las creaciones con relaciones anidadas se realiza para cada modelo que lo solicite
    let mainModel = sails.models[req.options.model];
    var todoData = req.allParams();
    var tasksData = todoData.tasks
    var objectiveData = todoData.objective
    delete todoData.tasks
    delete todoData.objective


    //aqui faltaria validar que los modelos esten bien formados antes de guardarlos
    // sails.log(mainModel.attributes)// tengo todos los atributos del modelo
    // sails.log('validacion: ',mainModel.validate('name','a')) // con esto valido cada uno

    // if (!mainModel.validate('name','a')) {
    //   return res.badRequest();
    // }

    // sails.log(objectiveData)

    var newObjective = await Objective.create(objectiveData).fetch();

    todoData.objective = newObjective.id

    var newTodo = await mainModel.create(todoData).fetch();

    for (let task of tasksData) {
      task.todo = newTodo.id;
    }

    var newTasks = await Task.createEach(tasksData).fetch();

    newTodo.tasks = newTasks;

    res.status(201);

    return res.json(newTodo);

  },

}
