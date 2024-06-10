import {
  ADD_TODO,
  CHECK_TODO,
  CLEAR_TODO,
  DELETE_TODO,
  EDIT_TODO,
} from "../actions/todoAction";

export const todoReducers = (
  state = {
    data: [],
  },
  action
) => {
  switch (action.type) {
    case ADD_TODO:
      //   console.log(action, "action");
      //   break;
      return {
        ...state,
        data: [
          ...state.data,
          {
            id:
              state.data.length > 0
                ? state.data[state.data.length - 1].id + 1
                : 1,
            text: action.payload,
            completed: false,
          },
        ],
      };
    case DELETE_TODO:
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== action.id),
      };
    case CLEAR_TODO:
      return { ...state, data: [] };
    case CHECK_TODO:
      return {
        ...state,
        data: state.data.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case EDIT_TODO:
      console.log({
        ...state,
        data: state.data.map((todo) =>
          todo.id === action.id ? { ...todo, text: action.text } : todo
        ),
      });
      return {
        ...state,
        data: state.data.map((todo) =>
          todo.id === action.id ? { ...todo, text: action.text } : todo
        ),
      };
    default:
      return state;
  }
};

export const addTodoReducer = (todos) => {
  return async (dispatch) => {
    dispatch({ type: ADD_TODO, payload: todos });
  };
};
export const deleteTodoReducer = (payloadId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_TODO, id: payloadId });
  };
};

export const clearTodoReducer = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_TODO });
  };
};
export const toggleTodoReducer = (payloadId) => {
  return async (dispatch) => {
    dispatch({ type: CHECK_TODO, id: payloadId });
  };
};
export const editTodoReducer = (payloadId, textTodo) => {
  return async (dispatch) => {
    dispatch({ type: EDIT_TODO, id: payloadId, text: textTodo });
  };
};
