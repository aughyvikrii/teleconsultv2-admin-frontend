import actions from './actions';

const { loadingVisible, loadingContent, loadingStatus, loadingProps } = actions;

const showLoading = () => {
  return async dispatch => {
    dispatch(loadingVisible(true));
  }
}

const closeLoading = () => {
  return async dispatch => {
    dispatch(loadingVisible(false));
  }
}

const loadingError = () => {
  return async dispatch => {
    dispatch(loadingStatus('error'));
  }
}

const loadingSuccess = () => {
  return async dispatch => {
    dispatch(loadingStatus('ok'));
  }
}

const loadingStart = () => {
  return async dispatch => {
    dispatch(loadingVisible(true));
    dispatch(loadingStatus('loading'));
  }
}

const maskCloseAble = (canClose) => {
  return async dispatch => {
    if(canClose) {
      dispatch(loadingProps({ maskClosable: true, }));
    } else {
      dispatch(loadingProps({ maskClosable: false, }));
    }
  }
}

export {
  loadingVisible,
  loadingContent,
  loadingStatus,
  showLoading,
  closeLoading,
  loadingError,
  loadingSuccess,
  loadingStart,
  loadingProps
};
