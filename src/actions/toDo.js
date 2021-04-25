// Types
export const ADD_NEW_TASK = 'ADD_NEW_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

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
