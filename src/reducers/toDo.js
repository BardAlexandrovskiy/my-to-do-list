import {
  ADD_NEW_TASK,
  CHANGE_FILTER,
  DELETE_TASK,
  SET_SEARCH_VALUE,
  TOGGLE_TASK,
} from '../actions/toDo';

const initialState = JSON.parse(localStorage.getItem('my-to-do-list')).toDo || {
  list: [],
  filter: 'all',
  searchValue: '',
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
    case CHANGE_FILTER:
      return { ...state, filter: payload.filter };
    case SET_SEARCH_VALUE:
      return { ...state, searchValue: payload.value };
    default:
      return state;
  }
}
