import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {TodoReducer,TodoDetailsReducer,TodoDetailsSaveReducer,EditCompletedSaveReducer,DeleteTaskReducer} from './reducers';

const rootReducer = combineReducers({
  Todo: TodoReducer,
  TodoDetails : TodoDetailsReducer,
  TodoDetailsSave : TodoDetailsSaveReducer,
  EditCompleted : EditCompletedSaveReducer,
  DeleteTask : DeleteTaskReducer
});

const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store;
