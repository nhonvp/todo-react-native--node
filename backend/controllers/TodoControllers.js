const Todo = require('../models/TodoModel.js');

module.exports.getall = async function (req, res) {
  try {
    const todo = await Todo.find({});
    res.send(todo);
  } catch (error) {
    res.status(404).send({message: 'Todo Not Found'});
  }
};
module.exports.gettodo = async function (req, res) {
  try {
    const todo = await Todo.findById(req.params.id);
    res.send(todo);
  } catch (error) {
    res.status(404).send({message: 'Todo Not Found'});
  }
};
module.exports.update = async function (req, res) {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {new: true},
    );
    res.status(200).send({message: todo});
  } catch (error) {
    res.status(500).send({message: 'Failure'});
  }
};
module.exports.save = async function (req, res) {
  try {
    const todo = new Todo(req.body);
    const newtodo = await todo.save();
    res.status(200).send('Save to success');
  } catch (error) {
    res.status(500).send('Failure');
  }
};
module.exports.savetodo = async function (req, res) {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      todo.todos.push(req.body);
      const posttodo = await todo.save();
      res.status(200).send('Post todo success');
    }
  } catch (error) {
    res.status(500).send('Failure');
  }
};
module.exports.updateTask = async function (req, res) {
  try {
    const todo = await Todo.findOneAndUpdate(
      {_id: req.params.idtask, 'todos._id': req.params.id},
      {
        $set: {'todos.$.completed': req.body.completed},
      },
      {new: true},
    );
    res.status(200).send('update sucess');
  } catch (error) {
    res.status(500).send('Failure');
  }
};
module.exports.delete = async function (req, res) {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      const deleteTodo = await todo.remove();
    }
    res.status(200).send('Deleted to Success');
  } catch (error) {
    res.status(500).send('Failure');
  }
};
module.exports.deletetask = async function (req, res) {
  try {
    const todo = await Todo.updateOne(
      {
        _id: req.params.idtask,
      },
      {
        $pull: {"todos": {"_id": req.params.id}},
      },
    );
    res.status(200).send('Delete sucess');
  } catch (error) {
    res.status(500).send('Failure');
  }
};
