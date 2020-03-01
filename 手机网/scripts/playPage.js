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
        mVideoInfo.coverImageUrl = document.location.protocol + document.getElementsByClassName("vod-n-img")[0].getElementsByTagName("img")[0].attributes["data-original"].value;
        const videoInfoText = document.getElementsByClassName("vod-n-l")[0].textContent;
        mVideoInfo.name = videoInfoText.split("状态：")[0].trimStart().trimEnd();
        mVideoInfo.title = videoInfoText.split("状态：")[1].split("主演：")[0].trimStart().trimEnd();
        mVideoInfo.stars = videoInfoText.split("主演：")[1].split("类型：")[0].trimStart().trimEnd();
        mVideoInfo.types = videoInfoText.split("类型：")[1].split("导演：")[0].trimStart().trimEnd();
        mVideoInfo.director = videoInfoText.split("导演：")[1].split("地区：")[0].trimStart().trimEnd();
        mVideoInfo.area = videoInfoText.split("地区：")[1].split("更新：")[0].trimStart().trimEnd();
        mVideoInfo.updateTime = videoInfoText.split("更新：")[1].split("简介：")[0].trimStart().trimEnd();
        mVideoInfo.introduction = "";
        let playLineInfo = document.getElementsByClassName("vod-info-tab")[0];
        let playLineEpisodeInfoElements = playLineInfo.getElementsByClassName("play-box");
        for (let i = 0; i < playLineEpisodeInfoElements.length; i++) {
            let episodeItemEpisodeElements = playLineEpisodeInfoElements[i].getElementsByClassName("plau-ul-list")[0].getElementsByTagName("li");
            const mPlayLine = {"videoEpisodeList": []};
            for (let i = episodeItemEpisodeElements.length - 1; i > -1; i--) {
                const a = episodeItemEpisodeElements[i].getElementsByTagName("a")[0];
                const mVideoEpisode = {"name": "", "url": ""};
                mVideoEpisode.name = a.attributes["title"].value.trimStart().trimEnd();
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