import React, { useMemo, useState } from 'react';
import StatusLamp from '../../atoms/StatusLamp';
import { useObsState } from '../../../ducks/obs/selectors';
import { LampStatus } from '../../../types/kuvo_obs';
import TextBox from '../../atoms/TextBox';
import Button from '../../atoms/Button';
import { useDispatch } from 'react-redux';
import { connectObsThunk, disconnectObsThunk } from '../../../ducks/obs/operations';
import StatusLabel from '../../molecules/StatusLabel';
import TextForm from '../../molecules/Form/TextForm';


const ObsControll: React.FC = () => {
  const obsState = useObsState();
  const dispatch = useDispatch();
  const [port, setPort] = useState('');
  const [password, setPassword] = useState('');
  const [connectStatus, setConnectStatus] = useState<LampStatus>('initial');
  const connectStatusString = useMemo(() => {
    switch (connectStatus) {
      case 'fine':
        return '接続済み';
      case 'danger':
        return '接続失敗';
      case 'warning':
      default:
        return '未接続';
    }
  }, [connectStatus]);
  const obsConnectMessage = useMemo(() => {
    if (obsState.isConnected === false) {
      return connectStatus === 'fine'
        ? 'OBSから切断しました'
        : '';
    }
    switch (connectStatus) {
      case 'fine':
        return 'OBSへの接続に成功しました';
      case 'warning':
      case 'danger':
        return 'OBSへの接続中にエラーが発生しました';
      case 'initial':
      default:
        return "";
    }
  }, [connectStatus, obsState.isConnected]);
  return (
    <div>
      <div>
        <StatusLabel status={connectStatus}>
          {connectStatusString}
        </StatusLabel>
      </div>
      <div>
        <TextForm
          label="OBSのポート"
          type={'text'}
          name="obs_ws_port"
          value={port}
          onChangeText={setPort}
        />
      </div>
      <div>
        <TextForm
          label="OBSのパスワード"
          type={'password'}
          name="obs_ws_password"
          value={password}
          onChangeText={setPassword}
        />
      </div>
      <div>
        <Button
          label="OBSに接続"
          onClick={() => {
            dispatch(connectObsThunk({port: Number.parseInt(port), password: password}));
          }}
        />
        <Button
          label="切断"
          onClick={() => { dispatch(disconnectObsThunk()); }}
        />
      </div>
      <div>
        {obsConnectMessage}
      </div>
    </div>
  );
};

export default ObsControll;
