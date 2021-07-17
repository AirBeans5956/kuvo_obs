import OBS from 'obs-websocket-js';
import { KuvoTrack } from '../../types/kuvo_obs';

// --- Constrains ---
const ArtistCx = 565.0;
const TitleCx =  545.0;
const ScrollSpeed = 100.0;
const TitleScrollTrue = {
  "sourceName": "TITLE",
  "filterName": "scroll",
  "filterSettings": {"cx": TitleCx, "limit_cx": true, "limit_cy": false, "speed_x": ScrollSpeed}
};
const TitleScrollFalse = {
  "sourceName": "TITLE",
  "filterName": "scroll",
  "filterSettings": {"cx": TitleCx, "limit_cx": false, "limit_cy": false, "speed_x": 0.0}
};
const ArtistScrollTrue = {
  "sourceName": "ARTIST",
  "filterName": "scroll",
  "filterSettings": {"cx": ArtistCx, "limit_cx": true, "limit_cy": false, "speed_x": ScrollSpeed}
};
const ArtistScrollFalse = {
  "sourceName": "ARTIST",
  "filterName": "scroll",
  "filterSettings": {"cx": ArtistCx, "limit_cx": false, "limit_cy": false, "speed_x": 0.0}
};

let obs: OBS | null = null;


const connectObs = async (port: number, password: string): Promise<boolean> => {
  if (obs === null) {
    obs = new OBS();
  }

  console.log('Connecting...');
  return await obs.connect({
    address: `localhost:${port}`,
    password: password
  })
    .then(() => { return true; })
    .catch((err) => { console.log(err); return false; });
}

const disconnectObs = async (): Promise<boolean> => {
  if (obs === null) {
    return false;
  }
  console.log('Disconnecting...');

  await obs.disconnect()
  return true;
}

const showTrackData = async (track: KuvoTrack | null): Promise<void> => {
  if (obs === null || track === null) { return; }

  let {title, artist} = track;
  let titleFilter, artistFilter;
  if (title.length > 12) {
    title = title + '    ';
    titleFilter = TitleScrollTrue;
  } else {
    titleFilter = TitleScrollFalse;
  }

  if (artist.length > 18) {
    artist = artist + '     ';
    artistFilter = ArtistScrollTrue;
  } else {
    artistFilter = ArtistScrollFalse;
  }

  await obs.send('SetTextFreetype2Properties', {"source": 'TITLE', "text": title}).catch((err) => {console.log(err)});
  await obs.send('SetTextFreetype2Properties', {"source": 'ARTIST', "text": artist}).catch((err) => {console.log(err)});
  await obs.send('SetSourceFilterSettings', titleFilter).catch((err) => {console.log(err)});
  await obs.send('SetSourceFilterSettings', artistFilter).catch((err) => {console.log(err)});
}

export {
  connectObs,
  disconnectObs,
  showTrackData
}
