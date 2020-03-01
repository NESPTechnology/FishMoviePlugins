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
        mVideoInfo.coverImageUrl = document.getElementsByClassName("introduction-l")[0].getElementsByTagName("img")[0].attributes["src"].value;
        const videoInfoText = document.getElementsByClassName("introduction-ul")[0].textContent;
        mVideoInfo.name = document.getElementsByClassName("introduction-l")[0].getElementsByTagName("img")[0].attributes["alt"].value.trimStart().trimEnd();
        mVideoInfo.director = videoInfoText.split("导演：")[1].split("主演：")[0].trimStart().trimEnd();
        mVideoInfo.stars = videoInfoText.split("主演：")[1].split("类型：")[0].trimStart().trimEnd();
        mVideoInfo.types = videoInfoText.split("类型：")[1].split("地区：")[0].trimStart().trimEnd();
        mVideoInfo.area = videoInfoText.split("地区：")[1].split("年份：")[0].trimStart().trimEnd();
        mVideoInfo.showTime = videoInfoText.split("年份：")[1].trimStart().trimEnd();
        mVideoInfo.introduction = document.getElementsByClassName("ec")[0].textContent.trimStart().trimEnd();

        let playLineEpisodeInfoElements = document.getElementsByClassName("videourl");
        for (let i = 0; i < playLineEpisodeInfoElements.length; i++) {
            let episodeItemEpisodeElements = playLineEpisodeInfoElements[i].getElementsByTagName("ul")[0].getElementsByTagName("li");
            const mPlayLine = {"name": "", "videoEpisodeList": []};
            for (let i = 0; i < episodeItemEpisodeElements.length; i++) {
                const a1 = episodeItemEpisodeElements[i].getElementsByTagName("a")[0];
                const mVideoEpisode = {"name": "", "url": ""};
                mVideoEpisode.name = a1.textContent;
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