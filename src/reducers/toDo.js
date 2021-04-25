import { ADD_NEW_TASK, DELETE_TASK, TOGGLE_TASK } from '../actions/toDo';

const initialState = {
  list: [],
};

export function toDoReducer(state = initialState, action) {
  const { type, payload } = action;
  const { list } = state;

  switch (type) {
    case ADD_NEW_TASK:
      return {
        ...state,
        list: list.concat({
          value: payload.value,
          check: false,
          id: Date.now(),
        }),
      };
    case TOGGLE_TASK:
      return {
        ...state,
        list: list.map((item) => {
          if (item.id === payload.id) {
            return { ...item, check: !item.check };
          } else return item;
        }),
      };
    case DELETE_TASK:
      return { ...state, list: list.filter(({ id }) => id != payload.id) };
    default:
      return state;
  }
}
