import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserAction } from '../action/UserActions';
import { IState } from '../states/IState';
import IUser from '../states/IUser';
import CountButton from './CountButton';
import TextBox from './atoms/TextBox';
import TextForm from './molecules/Form/TextForm';

const UserForm: React.FC<IUser> = props => {
  const count = 0;
  const dispatch = useDispatch();
  const onNameChange = useCallback((value: string) => {
    dispatch(changeUserAction({ name: value }));
  },[]);
  const onCountClick = useCallback(() => {
    dispatch(changeUserAction({ count: count + 1 }));
  }, [count]);
  return (
    <div>
      <p>
        <TextForm
          value={''}
          type={'text'}
          label=""
          name='hoge'
          onChangeText={onNameChange}
        />
      </p>
      <p>
        <CountButton count={count} label="訪問" onClick={onCountClick} />
      </p>
    </div>
  );
};

export default UserForm;
