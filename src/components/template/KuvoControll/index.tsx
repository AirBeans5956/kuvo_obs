import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useKuvoState } from '../../../ducks/kuvo/selectors';
import Button from '../../atoms/Button';
import { fetchKuvoDataThunk } from '../../../ducks/kuvo/operations';
import StatusLabel from '../../molecules/StatusLabel';
import { LampStatus } from '../../../types/kuvo_obs';
import TextForm from '../../molecules/Form/TextForm';
import CheckForm from '../../molecules/Form/CheckForm';

const KuvoControll: React.FC = () => {
  const kuvoState = useKuvoState();
  const dispatch = useDispatch();
  const [playlistId, setPlaylistId] = useState('');
  const [status, setStatus] = useState<LampStatus>('initial');
  const connectStatusString = useMemo(() => {
    switch (status) {
      case 'initial':
        return '未取得'
      case 'danger':
        return '失敗'
      case 'fine':
        return '成功';
      case 'warning':
      default:
        return '不明';
    }
  }, [status]);
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
          value={playlistId}
          onChangeText={setPlaylistId}
        />
      </div>
      <div>
        <Button
          label="更新"
          onClick={() => {
            dispatch(fetchKuvoDataThunk(Number.parseInt(playlistId)));
          }}
        />
        <CheckForm
          name="kuvo_auto_refresh"
          labelText="自動更新"
          onChanged={(checked) => {console.log("auto refresh: " + checked)}} />
      </div>
    </div>
  );
};

export default KuvoControll;
