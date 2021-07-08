import React, { useEffect, useMemo, useState } from 'react';
import { useObsState } from '../../../ducks/obs/selectors';
import { LampStatus } from '../../../types/kuvo_obs';
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
    switch (obsState.connectStatus) {
      case 'connecting':
        return '接続中';
      case 'failed':
        return '接続失敗';
      case 'success':
        return '接続済み';
      case 'idle':
      default:
        return '未接続';
    }
  }, [obsState.connectStatus]);
  const obsConnectMessage = useMemo(() => {
    switch (obsState.connectStatus) {
      case 'success':
        return 'OBSへの接続に成功しました';
      case 'failed':
        return 'OBSへの接続中にエラーが発生しました';
      case 'connecting':
      case 'idle':
      default:
        return "";
    }
  }, [obsState.connectStatus, obsState.isConnected]);
  useEffect(() => {
    switch (obsState.connectStatus) {
      case 'failed':
        setConnectStatus('danger')
        break;
      case 'success':
        setConnectStatus('fine');
        break;
      case 'connecting':
      case 'disconnected':
      case 'idle':
      default:
        setConnectStatus('initial');
    }
  }, [obsState.connectStatus])
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
          value=''
          onChangeText={setPort}
        />
      </div>
      <div>
        <TextForm
          label="OBSのパスワード"
          type={'password'}
          name="obs_ws_password"
          value=''
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
