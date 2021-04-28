// Types
export const ADD_NEW_TASK = 'ADD_NEW_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const CHANGE_FILTER = 'CHANGE_FILTER';
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';

// Actions
export const addNewTaskAction = (value) => {
  return {
    type: ADD_NEW_TASK,
    payload: { value },
  };
};

export const toggleTaskAction = (id) => {
  return {
    type: TOGGLE_TASK,
    payload: { id },
  };
};

export const deleteTaskAction = (id) => {
  return {
    type: DELETE_TASK,
    payload: { id },
  };
};

export const changeFilter = (filter) => {
  return {
    type: CHANGE_FILTER,
    payload: { filter },
  };
};

export const setSearchValue = (value) => {
  return {
    type: SET_SEARCH_VALUE,
    payload: { value },
  };
};
