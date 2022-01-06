import {
  GET_DATA,
  CREATE_CHECKLIST,
  CREATE_CHECKLIST_SUCCESS,
  CREATE_TASK,
  DELETE_CHECKLIST,
  EDIT_COMPLETED,
  DELETE_TASK,
  CHECKLIST_DETAILS,
} from './constants.js';

export const getData = () => async dispatch => {
  try {
    const data = await fetch('http://192.168.1.5:5000/api/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    if (json) {
      dispatch({
        type: GET_DATA,
        payload: json,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const setTodo = todo => async (dispatch, getState) => {
  try {
    const task = await fetch('http://192.168.1.5:5000/api/todos/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: todo,
    });
    dispatch({
      type: CREATE_CHECKLIST,
      payload: task,
    });
  } catch (error) {
    console.log(error);
  }
};

export const detailchecklist = (checkid) => async (dispatch, getState) => {
  try {
    const checklistdetails = await fetch(
      'http://192.168.1.5:5000/api/todos/' + checkid,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const json = await checklistdetails.json();
    if (json) {
      dispatch({
        type: CHECKLIST_DETAILS,
        payload: json,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const setJob = (task, id) => async (dispatch, getState) => {
  try {
    const todo = await fetch('http://192.168.1.5:5000/api/todos/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: task,
    });
    dispatch({
      type: CREATE_TASK,
      payload: todo,
    });
  } catch (error) {
    console.log(error);
  }
};
export const editcompleted = (completed, taskid, id) => async (dispatch, getState) => {
    try {
      const editsucess = await fetch(
        'http://192.168.1.5:5000/api/todos/' + taskid + '/task/' + id,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: completed,
        },
      );
      dispatch({
        type: EDIT_COMPLETED,
        payload: editsucess,
      });
    } catch (error) {
      console.log(error);
    }
  };
export const deletechecklist = id => async (dispatch, getState) => {
  try {
    await fetch('http://192.168.1.5:5000/api/todos/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: DELETE_CHECKLIST,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deletetask = (checkid,id) => async (dispatch, getState) => {
  try {
    await fetch('http://192.168.1.5:5000/api/todos/' + checkid + '/task/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};
