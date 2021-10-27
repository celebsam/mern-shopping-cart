export const userLoginReducer = (state = {}, action) => {
  if (action.type === "USER_LOGIN_REQUEST") {
    return { loading: true };
  } else if (action.type === "USER_LOGIN_SUCCESS") {
    return { loading: false, userInfo: action.payload };
  } else if (action.type === "USER_LOGIN_FAIL") {
    return { loading: false, error: action.payload };
  } else if (action.type === "USER_LOGOUT") {
    return {};
  } else {
    return state;
  }
};
export const userRegisterReducer = (state = {}, action) => {
  if (action.type === "USER_REGISTER_REQUEST") {
    return { loading: true };
  } else if (action.type === "USER_REGISTER_SUCCESS") {
    return { loading: false, userInfo: action.payload };
  } else if (action.type === "USER_REGISTER_FAIL") {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  if (action.type === "USER_DETAILS_REQUEST") {
    return { ...state, loading: true };
  } else if (action.type === "USER_DETAILS_SUCCESS") {
    return { loading: false, user: action.payload };
  } else if (action.type === "USER_DETAILS_FAIL") {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  if (action.type === "USER_UPDATE_PROFILE_REQUEST") {
    return { loading: true };
  } else if (action.type === "USER_UPDATE_PROFILE_SUCCESS") {
    return { loading: false, userInfo: action.payload, success: true };
  } else if (action.type === "USER_UPDATE_PROFILE_FAIL") {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  if (action.type === "USER_LIST_REQUEST") {
    return { loading: true };
  } else if (action.type === "USER_LIST_SUCCESS") {
    return { loading: false, users: action.payload };
  } else if (action.type === "USER_LIST_FAIL") {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};
