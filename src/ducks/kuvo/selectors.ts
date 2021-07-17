import { useSelector } from 'react-redux';
import { IKuvoState } from './types';

export const useKuvoState = ():IKuvoState => {
  return useSelector((state: {kuvo: IKuvoState}) => state.kuvo);
}
