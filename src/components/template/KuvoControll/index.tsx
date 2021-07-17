import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useKuvoState } from '../../../ducks/kuvo/selectors';
import { setPlaylistId } from '../../../ducks/kuvo/slice';
import Button from '../../atoms/Button';
import { fetchKuvoDataThunk } from '../../../ducks/kuvo/operations';
import StatusLabel from '../../molecules/StatusLabel';
import { LampStatus } from '../../../types/kuvo_obs';
import TextForm from '../../molecules/Form/TextForm';
import CheckForm from '../../molecules/Form/CheckForm';

const KuvoControll: React.FC = () => {
  const kuvoState = useKuvoState();
  const dispatch = useDispatch();
  const [status, setStatus] = useState<LampStatus>('initial');
  const [timer, setTimer] = useState<NodeJS.Timeout|null>(null);
  const connectStatusString = useMemo(() => {
    return kuvoState.isConnected ? '取得済み' : '未取得';
  }, [kuvoState.isConnected]);
  useEffect(() => {
    switch (kuvoState.connectStatus) {
      case 'success':
        setStatus('fine');
        break;
      case 'failed':
        setStatus('danger');
        break;
      case 'connecting':
      case 'disconnected':
      case 'idle':
      default:
        setStatus('initial');
    }
  }, [kuvoState.connectStatus]);
  return (
    <div>
      <div>
        <StatusLabel status={status}>
          {connectStatusString}
        </StatusLabel>
      </div>
      <div>
        <TextForm
          label="KUVOプレイリストID"
          name="kuvo_playlist_id"
          type={'text'}
          value={''}
          onChangeText={(value => {
            let playlistId = Number.parseInt(value);
            dispatch(setPlaylistId(playlistId));
          })}
        />
      </div>
      <div>
        <Button
          label="更新"
          onClick={() => {
            dispatch(fetchKuvoDataThunk(kuvoState.playlistId));
          }}
        />
        <CheckForm
          name="kuvo_auto_refresh"
          labelText="自動更新"
          onChanged={(checked) => {
            console.log("swap auto refresh " + checked);
            if (checked) {
              let timeout = setInterval(() => {
                console.log("-- auto refresh --");
                dispatch(fetchKuvoDataThunk(kuvoState.playlistId));
              }, 5 * 1000);
              setTimer(timeout);
            } else {
              if (timer) {
                clearInterval(timer);
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default KuvoControll;
