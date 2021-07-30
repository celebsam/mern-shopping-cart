export const orderCreateReducer = (state = {}, action) => {
   if (action.type === "ORDER_CREATE_REQUEST") {
      return { loading: true };
   } else if (action.type === "ORDER_CREATE_SUCCESS") {
      return { loading: false, success: true, order: action.payload };
   } else if (action.type === "ORDER_CREATE_FAIL") {
      return { loading: false, error: action.payload };
   } else {
      return state;
   }
};
