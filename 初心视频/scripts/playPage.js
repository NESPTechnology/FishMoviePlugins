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
        mVideoInfo.coverImageUrl = document.getElementsByClassName("fed-deta-images")[0].getElementsByTagName("a")[0].attributes["data-original"].value;
        mVideoInfo.status = mVideoInfo.score = mVideoInfo.title = document.getElementsByClassName("fed-deta-images")[0].getElementsByTagName("a")[0].getElementsByClassName("fed-list-score")[0].textContent;

        const videoInfoText = document.getElementsByClassName("fed-deta-content")[0].textContent;

        mVideoInfo.name = videoInfoText.split("主演：")[0].trimEnd().trimStart();
        mVideoInfo.director = videoInfoText.split("导演：")[1].split("分类：")[0].trimEnd().trimStart();
        mVideoInfo.stars = videoInfoText.split("主演：")[1].split("导演：")[0].trimEnd().trimStart();
        mVideoInfo.types = videoInfoText.split("分类：")[1].split("地区：")[0].trimEnd().trimStart();
        mVideoInfo.area = videoInfoText.split("地区：")[1].split("年份：")[0].trimEnd().trimStart();
        mVideoInfo.showTime = videoInfoText.split("年份：")[1].split("更新：")[0].trimEnd().trimStart();
        mVideoInfo.updateTime = videoInfoText.split("更新：")[1].split("简介：")[0].trimEnd().trimStart();
        mVideoInfo.introduction = "  " + document.getElementsByClassName("fed-tabs-boxs")[0].getElementsByClassName("fed-tabs-item")[1].textContent.trimStart().trimEnd();

        let playLineEpisodeInfoElements = document.getElementsByClassName("fed-drop-boxs")[1].getElementsByClassName("fed-play-item");
        for (let i = 0; i < playLineEpisodeInfoElements.length; i++) {
            let episodeItemEpisodeElements = playLineEpisodeInfoElements[i].getElementsByClassName("fed-part-rows")[1].getElementsByTagName("li");
            const mPlayLine = {"videoEpisodeList": []};
            for (let i = 0; i < episodeItemEpisodeElements.length; i++) {
                const a1 = episodeItemEpisodeElements[i].getElementsByTagName("a")[0];
                const mVideoEpisode = {"name": "", "url": ""};
                mVideoEpisode.name = a1.text;
                mVideoEpisode.url = document.location.protocol + "//" + window.location.host + a1.attributes["href"].value;
                mPlayLine.videoEpisodeList.push(mVideoEpisode);
            }
            mVideoInfo.playLineList.push(mPlayLine);
        }
        console.log(JSON.stringify(mVideoInfo));
        try {
            window.videoPluginEngine.sendVideoInfo(JSON.stringify(mVideoInfo));
        } catch (e) {
        }
    } catch (e) {
        window.videoPluginEngine.sendError(e.toString());
    }
}

loadInfoPage();