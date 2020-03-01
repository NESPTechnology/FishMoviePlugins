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
        mVideoInfo.coverImageUrl = document.getElementsByClassName("vodImg")[0].getElementsByTagName("img")[0].attributes["src"].value;
        const videoInfoTextEle = document.getElementsByClassName("vodInfo")[0];
        const videoInfoTextHEle = videoInfoTextEle.getElementsByClassName("vodh")[0];
        mVideoInfo.name = videoInfoTextHEle.getElementsByTagName("h2")[0].textContent.trimStart().trimEnd();
        mVideoInfo.title = mVideoInfo.status = videoInfoTextHEle.getElementsByTagName("span")[0].textContent.trimStart().trimEnd();
        mVideoInfo.score = videoInfoTextHEle.getElementsByTagName("label")[0].textContent.trimStart().trimEnd();
        let videoInfoText = videoInfoTextEle.getElementsByClassName("vodinfobox")[0].textContent;
        mVideoInfo.director = videoInfoText.split("导演：")[1].split("主演：")[0].trimStart().trimEnd();
        mVideoInfo.stars = videoInfoText.split("主演：")[1].split("类型：")[0].trimStart().trimEnd();
        mVideoInfo.types = videoInfoText.split("类型：")[1].split("地区：")[0].trimStart().trimEnd();
        mVideoInfo.area = videoInfoText.split("地区：")[1].split("语言：")[0].trimStart().trimEnd();
        mVideoInfo.language = videoInfoText.split("语言：")[1].split("上映：")[0].trimStart().trimEnd();
        mVideoInfo.showTime = videoInfoText.split("上映：")[1].split("片长：")[0].trimStart().trimEnd();
        mVideoInfo.updateTime = videoInfoText.split("更新：")[1].split("总播放量：")[0].trimStart().trimEnd();
        mVideoInfo.introduction = document.getElementsByClassName("jjText")[0].textContent.trimStart().trimEnd();

        function getPlayLine(id) {
            let episodeItemEpisodeElements = document.getElementById(id).getElementsByTagName("ul")[0].getElementsByTagName("li");
            const mPlayLine = {"videoEpisodeList": []};
            for (let i = 0; i < episodeItemEpisodeElements.length; i++) {
                const mVideoEpisode = {"name": "", "url": ""};
                let text = episodeItemEpisodeElements[i].textContent;
                mVideoEpisode.name = text.split("$")[0].trimEnd().trimStart();
                mVideoEpisode.url = text.split("$")[1].trimEnd().trimStart();
                mPlayLine.videoEpisodeList.push(mVideoEpisode);
            }
            return mPlayLine;
        }

        mVideoInfo.playLineList.push(getPlayLine("play_1"));
        mVideoInfo.playLineList.push(getPlayLine("play_2"));
        console.log(JSON.stringify(mVideoInfo));
        window.videoPluginEngine.sendVideoInfo(JSON.stringify(mVideoInfo));
    } catch (e) {
        window.videoPluginEngine.sendError(e.toString());
    }
}

loadInfoPage();