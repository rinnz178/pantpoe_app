const subscription_reducers = (state, action) => {
  if (action.type === "SET_LOADING") {
    return { ...state, isloading: true };
  }

  if (action.type === "UNSET_LOADING") {
    return { ...state, isloading: false };
  }

  if (action.type === "DATA_LOADED") {
    return { ...state, subscriptions: action.payload };
  }

  if (action.type === "NEWDATA_LOADED") {
    return {
      ...state,
      subscriptions: [...state.subscriptions, action.payload],
      tierError: [],
    };
  }

  if (action.type === "DATA_LOADED_CATEGORY") {
    console.log(action.payload);
    return {
      ...state,
      categories: action.payload,
    };
  }

  if (action.type === "FAILED") {
    console.log(action.payload);
    return {
      ...state,
      tierError: action.payload,
    };
  }

  //

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default subscription_reducers;
