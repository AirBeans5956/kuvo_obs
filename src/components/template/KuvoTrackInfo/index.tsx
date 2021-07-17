import React, { useMemo } from 'react';
import { useKuvoState } from '../../../ducks/kuvo/selectors';
import Typography from '../../atoms/Typography';

const KuvoTrackInfo: React.FC = () => {
  const kuvoState = useKuvoState();
  const trackTitle = useMemo(() => {
    return kuvoState.trackData !== null
      ? kuvoState.trackData.title : "";
  }, [kuvoState.trackData])
  const artistName = useMemo(() => {
    return kuvoState.trackData !== null
      ? kuvoState.trackData.artist : "";
  }, [kuvoState.trackData])
  return (
    <div>
      <div>
        <Typography>トラック名</Typography>
        <div>{trackTitle}</div>
      </div>
      <div>
        <Typography>アーティスト名</Typography>
        <div>{artistName}</div>
      </div>
    </div>
  );
};

export default KuvoTrackInfo;
