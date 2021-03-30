import actions from './actions';

const { LOADING_VISIBLE, LOADING_CONTENT, LOADING_STATUS, LOADING_PROPS } = actions;

const initState = {
  visible: null,
  content: null,
  status: null,
  customProps: {},
};

/**
 *
 * @todo impure state mutation/explaination
 */
const LoadingReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case LOADING_VISIBLE:
      return {
        ...state,
        visible: data
      };
    case LOADING_CONTENT:
      return {
        ...state,
        content: data,
      };
    case LOADING_STATUS:
      return {
        ...state,
        status: data,
      };
    
    case LOADING_PROPS:
      return {
        ...state,
        customProps: {
          ...state.customProps,
          ...data
        },
      };
    default:
      return state;
  }
};
export default LoadingReducer;
