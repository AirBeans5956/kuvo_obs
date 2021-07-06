import Puppeteer, { Browser } from 'puppeteer';
import { KuvoTrack } from '../../types/kuvo_obs';

let browser: Browser | null = null;

const launchBrowser = async (): Promise<Browser | null> => {
  if (browser !== null) {
    return browser;
  }

  return await Puppeteer.launch()
    .then((br) => { browser = br; return browser; })
    .catch((err) => { console.log(err); return null; });
}

const fetchTrackData = async (playlistId: number): Promise<KuvoTrack | null> => {
  const br = await launchBrowser();
  if (br === null) {
    return null;
  }

  const page = await br.newPage();
  await page.goto(`https://kuvo.com/playlist/${playlistId}`);

  let title = '???';
  let artist = '???';

  let titleNode = await page.$('.row.on .title').catch(() => null);
  let artistNode = await page.$('.row.on .artist').catch(() => null);

  if (titleNode !== null) {
    title = await titleNode.evaluate(node => node.innerHTML)
      .catch(() => '???');
  } else {
    let tmpNodes = await page.$$('.row.off .title').catch(() => null);
    if (tmpNodes !== null && tmpNodes.length > 0) {
      titleNode = tmpNodes[tmpNodes.length - 1];
      title = await titleNode.evaluate(node => node.innerHTML)
        .catch(() => '???');
    }
  }

  if (artistNode !== null) {
    artist = await artistNode.evaluate(node => node.innerHTML)
      .catch(() => '???');
  } else {
    let tmpNodes = await page.$$('.row.off .artist').catch(() => null);
    if (tmpNodes !== null && tmpNodes.length > 0) {
      artistNode = tmpNodes[tmpNodes.length - 1];
      artist = await artistNode.evaluate(node => node.innerHTML)
        .catch(() => '???');
    }
  }

  await page.close();

  return {title: title, artist: artist};
}

export {
  fetchTrackData,
}
