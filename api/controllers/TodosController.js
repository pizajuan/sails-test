/**
 * TodosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // find: function(req, res){

  //   res.send('Ok');
  // }

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
  }
};

