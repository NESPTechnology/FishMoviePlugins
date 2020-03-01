function loadMainVideoPage() {
    try {
        let mMainVideoPage = {
            "slideVideos": [],
            "newPlay": [],
            "newMovie": [],
            "newSoap": [],
            "newVariety": [],
            "newAnim": []
        };

        function getVideos(ele) {
            let videoLis = ele.getElementsByClassName("fed-list-info")[0].getElementsByTagName("li");
            let videos = [];
            for (let i = 0; i < videoLis.length; i++) {
                let videoItemContentEle = videoLis[i].getElementsByTagName("a")[0];
                let video = {};
                video.infoUrl = window.location.protocol + "//" + window.location.host + videoItemContentEle.attributes["href"].value;
                video.title = videoItemContentEle.getElementsByClassName("fed-list-remarks")[0].textContent;
                video.score = videoItemContentEle.getElementsByClassName("fed-list-score")[0].textContent;
                try {
                    video.name = videoLis[i].getElementsByClassName("fed-list-title")[0].textContent;
                } catch (e) {
                }
                try {
                    video.coverImageUrl = videoItemContentEle.attributes["data-original"].value;
                } catch (e) {
                }
                videos.push(video);
            }
            return videos;
        }

        let swiperItems = document.getElementsByClassName("fed-swip-container")[0].getElementsByTagName("ul")[0].getElementsByTagName("li");
        for (let i = 0; i < swiperItems.length; i++) {
            let swiperItem = swiperItems[i];
            let swiperItemA = swiperItem.getElementsByTagName("a")[0];
            let video = {"videoSourceName": "初心视频"};
            video.infoUrl = window.location.protocol + "//" + window.location.host + swiperItemA.attributes["href"].value;
            video.coverImageUrl = swiperItemA.attributes["style"].value.toString().split("url(\"")[1].toString().split("\");")[0];
            video.title = swiperItemA.getElementsByClassName("fed-part-eone")[0].textContent.trimStart().trimEnd().replace("\n"," ").replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
            mMainVideoPage.slideVideos.push(video);
        }

        mMainVideoPage.newPlay = getVideos(document.querySelector("body > div.fed-main-info.fed-min-width > div > div:nth-child(2)"));
        mMainVideoPage.newMovie = getVideos(document.querySelector("body > div.fed-main-info.fed-min-width > div > div:nth-child(4)"));
        mMainVideoPage.newSoap = getVideos(document.querySelector("body > div.fed-main-info.fed-min-width > div > div:nth-child(5)"));
        mMainVideoPage.newVariety = getVideos(document.querySelector("body > div.fed-main-info.fed-min-width > div > div:nth-child(6)"));
        mMainVideoPage.newAnim = getVideos(document.querySelector("body > div.fed-main-info.fed-min-width > div > div:nth-child(7)"));
        console.log(JSON.stringify(mMainVideoPage));
        try {
            window.videoPluginEngine.sendMainVideoPage(JSON.stringify(mMainVideoPage));
        } catch (e) {
        }
    } catch (e) {
        window.videoPluginEngine.sendError(e.toString());
    }
}

loadMainVideoPage();


