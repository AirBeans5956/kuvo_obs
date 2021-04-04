import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { changeUserAction } from '../action/UserActions';
import IUser from '../states/IUser';

const initialUser: IUser = {
  count: 0,
  name: '',
};

const userReducer = reducerWithInitialState<IUser>(initialUser)
  .case(changeUserAction, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .build();

export default userReducer;
