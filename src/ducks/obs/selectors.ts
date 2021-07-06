import { useSelector } from 'react-redux';
import { IObsState } from './types';

export const useObsState = () => {
  return useSelector((state: {obs: IObsState}) => state.obs);
}
