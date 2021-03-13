require('json5/lib/register');
const OBS = require('obs-websocket-js');
const readline = require('readline');
const puppeteer = require('puppeteer');

// 定数値たち
const config = require('./config.json5');
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

// 使うやつ
let browser;
let obs;
let isReady = false;
let listId = config.listId;
let timer = null;
let willExit = false;

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

(async () => {
    obs = new OBS();
    await obs.connect({address: `localhost:${config.port}`, password: config.password})
        .then(() => {console.log('OBS CONNECTED!!'); isReady = true;})
        .catch((error) => {console.log(error)});

    browser = await puppeteer.launch()
        .then((browser) => {isReady = isReady && true; return browser;})
        .catch((error) => {console.log(error); isReady = false;})
    ;

    if (isReady) {
        enableAuto();
        printCommand();
        while (willExit !== true) {
            const command = await waitKeypress();
            switch (command) {
                case 'r' :
                    await refreshTrackData();
                    break;
                case 'q':
                    willExit = true;
                    console.log('exit.');
                    break;
                case 'a':
                    enableAuto();
                    break;
                case 'd':
                    disableAuto();
                    break;
                case 'h':
                    printCommand();
                    break;
                default:
                    console.log(`${command} is not implements.`);
                    break;
            }
        }
    }

    console.log('closing...');
    await browser.close();
    await obs.disconnect();
    process.exit();
})();

async function refreshTrackData() {
    process.stdout.write('Refreshing...');
    const data = await fetchTrackData();
    await showTrackData(data.title, data.artist);
    console.log('Complete!!');
}

async function fetchTrackData() {
    const page = await browser.newPage();
    await page.goto(`https://kuvo.com/playlist/${listId}`);

    let titleNode = await page.$('.row.on .title').catch(() => null);
    let artistNode = await page.$('.row.on .artist').catch(() => null);

    if (titleNode === null) {
        let tmpNodes = await page.$$('.row.off .title').catch(() => null);
        if (tmpNodes === null || tmpNodes.length === 0) {
            page.close();
            return {title: '???', artist: '???'};
        }
        titleNode = tmpNodes[tmpNodes.length - 1];
        tmpNodes = await page.$$('.row.off .artist').catch(() => null);
        artistNode = tmpNodes[tmpNodes.length - 1];
    }

    const title = await titleNode.evaluate(node => node.innerHTML).catch(() => '???');
    const artist = await artistNode.evaluate(node => node.innerHTML).catch(() => '???');

    page.close();

    return {title: title, artist: artist};
}

async function showTrackData(title, artist) {
    if (!isReady) {
        console.log('OBS websocket client is not ready.');
        return;
    }
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

async function waitKeypress() {
    return await new Promise(res => process.stdin.once("keypress", res));
}

function enableAuto() {
    if (timer !== null) {
        console.log('[Error]Auto refresh is active.');
        return;
    }
    timer = setInterval(refreshTrackData, 10000);
    console.log('Auto refresh is enabled.');
}

function disableAuto() {
    if (timer === null) {
        console.log('[Error]Auto refresh is not active.');
        return;
    }
    clearInterval(timer);
    timer = null;
    console.log('Auto refresh is disabled.');
}

function printCommand() {
    console.log('[COMMAND LIST]');
    console.log("'q': exit this app.");
    console.log("'r': refresh manually.");
    console.log("'a': enable auto refresh.");
    console.log("'d': disable auto refresh.");
    console.log("'h': print this command list.");
}
