import { combineReducers } from 'redux';
import proceduresReducer from './procedures.reducer';

const rootReducer = combineReducers({
	proceduresState: proceduresReducer
});

export default rootReducer;