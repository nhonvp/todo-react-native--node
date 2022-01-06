import {
  GET_DATA,
  CREATE_CHECKLIST,
  CREATE_TASK,
  DELETE_CHECKLIST,
  EDIT_COMPLETED,
  DELETE_TASK,
  CHECKLIST_DETAILS,
} from './constants.js';

const initialState = {
  task: [
    {
      name: '',
      colors: '',
      todos: [],
    },
  ],
};

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {...state, task: action.payload};
    case CREATE_CHECKLIST:
      return {...state, task: action.payload};
    case DELETE_CHECKLIST:
      return {...state, task: state.task.filter(x => x._id !== action.payload)};
    default:
      return state;
  }
};

const TodoDetailsReducer = (state = {todos: []}, action) => {
  switch (action.type) {
    case CHECKLIST_DETAILS:
      return {...state, todos: action.payload};
    default:
      return state;
  }
};
const TodoDetailsSaveReducer = (state = {todos: []}, action) => {
  switch (action.type) {
    case CREATE_TASK:
      return {...state, success : true, todos: action.payload};
    default:
      return state;
  }
};
const EditCompletedSaveReducer = (state = {todos: []}, action) => {
  switch (action.type) {
    case EDIT_COMPLETED:
      return {...state, success : true, todos: action.payload};
    default:
      return state;
  }
};
const DeleteTaskReducer = (state = {todos: []}, action) => {
  switch (action.type) {
    case DELETE_TASK:
      return {...state, success : true, todos: action.payload};
    default:
      return state;
  }
};
export {TodoReducer,TodoDetailsReducer,TodoDetailsSaveReducer,EditCompletedSaveReducer,DeleteTaskReducer};
