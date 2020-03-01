function loadInfoPage() {
    try {
        const mVideoInfo = {
            "name": "",
            "title": "",
            "status": "",
            "coverImageUrl": "",
            "playLineList": [],
            "videoClass": "",
            "types": "",
            "score": "",
            "infoUrl": "",
            "stars": "",
            "director": "",
            "updateTime": "",
            "showTime": "",
            "introduction": "",
            "area": "",
            "language": "",
            "headerTime": 0,
            "tailTime": 0,
            "videoType": -1,
        };
        let infoEle = document.getElementsByClassName("fed-deta-info")[0];
        let infoPic = infoEle.getElementsByClassName("fed-list-pics")[0];
        mVideoInfo.coverImageUrl = document.location.protocol + "//" + window.location.host + infoPic.attributes["data-original"].value;
        const videoInfoText = infoEle.getElementsByClassName("fed-deta-content")[0].textContent.trimStart().trimEnd();
        mVideoInfo.title = infoPic.getElementsByClassName("fed-list-remarks")[0].textContent;
        mVideoInfo.name = videoInfoText.split("主演：")[0].trimStart().trimEnd();
        mVideoInfo.stars = videoInfoText.split("主演：")[1].split("导演：")[0].trimStart().trimEnd();
        mVideoInfo.types = videoInfoText.split("分类：")[1].split("地区：")[0].trimStart().trimEnd();
        mVideoInfo.videoClass = videoInfoText.split("分类：")[1].split("地区：")[0].trimStart().trimEnd();
        mVideoInfo.director = videoInfoText.split("导演：")[1].split("分类：")[0].trimStart().trimEnd();
        mVideoInfo.showTime = videoInfoText.split("年份：")[1].split("更新：")[0].trimStart().trimEnd();
        mVideoInfo.area = videoInfoText.split("地区：")[1].split("年份：")[0].trimStart().trimEnd();
        mVideoInfo.updateTime = videoInfoText.split("更新：")[1].split("简介：")[0].trimStart().trimEnd();
        mVideoInfo.introduction = document.getElementsByClassName("fed-tabs-boxs")[0].getElementsByClassName("fed-text-muted")[0].textContent.trimStart().trimEnd();
        let playLineInfo = document.getElementsByClassName("fed-drop-info")[0];

        let playLineEpisodeInfoElements = playLineInfo.getElementsByClassName("fed-play-item");
        for (let i = 0; i < playLineEpisodeInfoElements.length; i++) {
            let episodeItemEpisodeElements = playLineEpisodeInfoElements[i].getElementsByClassName("fed-part-rows")[1].getElementsByTagName("li");
            const mPlayLine = {"videoEpisodeList": []};
            for (let j = 0; j < episodeItemEpisodeElements.length; j++) {
                const a = episodeItemEpisodeElements[j].getElementsByTagName("a")[0];
                const mVideoEpisode = {"name": "", "url": ""};
                mVideoEpisode.name = a.textContent.trim();
                mVideoEpisode.url = document.location.protocol + "//" + window.location.host + a.attributes["href"].value;
                mPlayLine.videoEpisodeList.push(mVideoEpisode);
            }
            mVideoInfo.playLineList.push(mPlayLine);
        }
        console.log(JSON.stringify(mVideoInfo));
        window.videoPluginEngine.sendVideoInfo(JSON.stringify(mVideoInfo));
    } catch (e) {
        window.videoPluginEngine.sendError(e.toString());
    }
}

loadInfoPage();