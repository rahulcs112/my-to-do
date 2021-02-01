export const set_counter_increment = (payload) => {
  return {
    type: "INCREASE_COUNT",
    payload,
  };
};
export const set_add_task = (payload) => {
  return {
    type: "ADD_TASK_TO_LIST",
    payload,
  };
};
export const set_delete_task = (payload) => {
  return {
    type: "DELETE_TASK_FROM_LIST",
    payload,
  };
};
export const update_task = (payload) => {
  return {
    type: "UPDATE_TASK_INTO_LIST",
    payload,
  };
};
