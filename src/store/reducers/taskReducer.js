//Initialized the task to empty array
const initialState = {
  task: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    //Adding the task to list
    case "ADD_TASK_TO_LIST":
      return {
        ...state,
        task: { ...state.task, [action.payload.id]: action.payload },
      };
    //Updating the task into the list using unique id of task
    case "UPDATE_TASK_INTO_LIST":
      return {
        ...state,
        task: { ...state.task, [action.payload.id]: action.payload },
      };
    //deleting the task from list using unique id of task
    case "DELETE_TASK_FROM_LIST": {
      let myTask = { ...state.task };
      delete myTask[action.payload.id];
      return {
        ...state,
        task: { ...myTask },
      };
    }

    default:
      return state;
  }
  return state;
};

export default taskReducer;
