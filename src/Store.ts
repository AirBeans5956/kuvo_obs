import { combineReducers, createStore } from 'redux';
import { IState } from './states/IState';
import taskReducer from './reducers/TaskReducer';

const combinedReducer = combineReducers<IState>({
  taskList: taskReducer,
});

export const store = createStore(combinedReducer);

export default store;
