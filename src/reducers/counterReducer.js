import { DECREMENT, INCREMENT, RESET } from "../actions/counterAction";

export const counterReducer = (state = { counter: 0 }, action) => {
  switch (action.type) {
    case INCREMENT:
      return { counter: (state.counter += 1) };
    case DECREMENT:
      if (state.counter > 0) {
        return { counter: state.counter - 1 };
      } else {
        return state;
      }
    case RESET:
      return { counter: (state.counter = 0) };
    default:
      return state;
  }
};

export const addCounter = () => {
  return (dispatch) => {
    dispatch({ type: INCREMENT });
  };
};
export const reduceCounter = () => {
  return (dispatch) => {
    dispatch({ type: DECREMENT });
  };
};
export const resetCounter = () => {
  return (dispatch) => {
    dispatch({ type: RESET });
  };
};
