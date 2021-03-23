const actions = {
  LOADING_VISIBLE: 'LOADING_VISIBLE',
  LOADING_CONTENT: 'LOADING_CONTENT',
  LOADING_STATUS: 'LOADING_STATUS',
  LOADING_PROPS: 'LOADING_PROPS',

  loadingVisible: (data) => {
    return {
      type: actions.LOADING_VISIBLE,
      data
    }
  },

  loadingContent: (data) => {
    return {
      type: actions.LOADING_CONTENT,
      data,
    }
  },

  loadingStatus: (data) => {
    return {
      type: actions.LOADING_STATUS,
      data,
    }
  },

  loadingProps: (data) => {
    return {
      type: actions.LOADING_PROPS,
      data,
    }
  }
};

export default actions;
