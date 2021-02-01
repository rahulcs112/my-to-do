//Initialized the count to 1
const initialState = {
  count: 1,
};

//Increase the counter on each successful submission of task
//It will return a count with +1 value that will work as unique id in task
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREASE_COUNT":
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
  return state;
};

export default counterReducer;
