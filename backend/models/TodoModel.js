const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema(
  {
    name: {type: String, require: true, unique: true},
    color: {type: String, require: true},
    todos: [
      {
        title: {type: String, require: true},
        completed: {type: Boolean},
      },
    ],
  },
  {timestamps: true},
);

module.exports = mongoose.model('Todo', TodoSchema);
