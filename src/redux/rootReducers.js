import { combineReducers } from 'redux';
import authReducer from './authentication/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import LoadingReducer from './loadingmodal/reducers';

const rootReducers = combineReducers({
  auth: authReducer,
  loadingModal: LoadingReducer,
  ChangeLayoutMode,
});

export default rootReducers;
