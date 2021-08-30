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

export const orderDetailsReducer = (
   state = { loading: true, orderItems: [], shippingAddress: {} },
   action
) => {
   if (action.type === "ORDER_DETAILS_REQUEST") {
      return { ...state, loading: true };
   } else if (action.type === "ORDER_DETAILS_SUCCESS") {
      return { loading: false, order: action.payload };
   } else if (action.type === "ORDER_DETAILS_FAIL") {
      return { loading: false, error: action.payload };
   } else {
      return state;
   }
};

export const orderPayReducer = (state = {}, action) => {
   if (action.type === "ORDER_PAY_REQUEST") {
      return { loading: true };
   } else if (action.type === "ORDER_PAY_SUCCESS") {
      return { loading: false, success: true };
   } else if (action.type === "ORDER_PAY_FAIL") {
      return { loading: false, error: action.payload };
   } else if (action.type === "ORDER_PAY_RESET") {
      return {};
   } else {
      return state;
   }
};
