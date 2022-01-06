const Router = require('express').Router();
const TodoController = require('../controllers/TodoControllers.js');

Router.get('/',TodoController.getall);
Router.get('/:id',TodoController.gettodo);
Router.post('/save',TodoController.save);
Router.post('/:id',TodoController.savetodo)
Router.put('/:id',TodoController.update);
Router.put('/:idtask/task/:id',TodoController.updateTask)
Router.delete('/:id',TodoController.delete)
Router.delete('/:idtask/task/:id',TodoController.deletetask)

module.exports = Router;