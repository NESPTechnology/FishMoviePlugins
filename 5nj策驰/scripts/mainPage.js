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
            let videoLis = ele.getElementsByClassName("qcontainer1");
            if (videoLis.length === 0) {
                videoLis = ele.getElementsByClassName("qcontainer");
            }
            let videos = [];
            for (let i = 0; i < videoLis.length; i++) {
                let videoItemContentEle = videoLis[i].getElementsByTagName("li")[0].getElementsByTagName("a")[0];
                let video = {};
                video.infoUrl = window.location.protocol + "//" + window.location.host + videoItemContentEle.attributes["href"].value;
                video.name = videoItemContentEle.attributes["title"].value;
                try {
                    video.title = videoItemContentEle.getElementsByClassName("other")[0].getElementsByTagName("i")[0].textContent.trimStart().trimEnd();
                } catch (e) {
                }
                try {
                    if (videoItemContentEle.getElementsByTagName("img")[0].attributes["data-original"].value.toString().indexOf("?url=") !== -1) {
                        video.coverImageUrl = videoItemContentEle.getElementsByTagName("img")[0].attributes["data-original"].value.toString().split("?url=")[1].toString().split("\")")[0];
                    } else if (videoItemContentEle.getElementsByTagName("img")[0].attributes["data-original"].value.toString().indexOf("url(\"") !== -1) {
                        video.coverImageUrl = videoItemContentEle.getElementsByTagName("img")[0].attributes["data-original"].value.toString().split("url(\"")[1].toString().split("\")")[0];
                    } else if (videoItemContentEle.getElementsByTagName("img")[0].attributes["data-original"].value.toString().indexOf("url(") !== -1) {
                        video.coverImageUrl = videoItemContentEle.getElementsByTagName("img")[0].attributes["data-original"].value.toString().split("url(")[1].toString().split("\")")[0];
                    }
                } catch (e) {
                }
                videos.push(video);
            }
            return videos;
        }

        let swiperItems = document.getElementsByClassName("banner")[0].getElementsByTagName("ul")[0].getElementsByTagName("li");
        for (let i = 0; i < swiperItems.length; i++) {
            let swiperItem = swiperItems[i];
            let swiperItemA = swiperItem.getElementsByTagName("a")[0];
            let video = {"videoSourceName": "5nj策驰"};
            video.infoUrl = window.location.protocol + "//" + window.location.host + swiperItemA.attributes["href"].value;
            if (swiperItem.attributes["style"].value.toString().indexOf("?url=") !== -1) {
                video.coverImageUrl = swiperItem.attributes["style"].value.toString().split("?url=")[1].toString().split("\")")[0];
            } else if (swiperItem.attributes["style"].value.toString().indexOf("url(\"") !== -1) {
                video.coverImageUrl = swiperItem.attributes["style"].value.toString().split("url(\"")[1].toString().split("\")")[0];
            } else if (swiperItem.attributes["style"].value.toString().indexOf("url(") !== -1) {
                video.coverImageUrl = swiperItem.attributes["style"].value.toString().split("url(")[1].toString().split("\")")[0];
            }
            video.title = swiperItemA.attributes["title"].value;
            mMainVideoPage.slideVideos.push(video);
        }

        mMainVideoPage.newPlay = getVideos(document.querySelector("body > div.main > div.index-tj.clearfix > div.index-tj-l > ul"));
        mMainVideoPage.newSoap = getVideos(document.querySelector("body > div.main > div:nth-child(2) > ul"));
        mMainVideoPage.newMovie = getVideos(document.querySelector("body > div.main > div:nth-child(5) > ul"));
        mMainVideoPage.newVariety = getVideos(document.querySelector("body > div.main > div:nth-child(6) > ul"));
        mMainVideoPage.newAnim = getVideos(document.querySelector("body > div.main > div:nth-child(7) > ul"));
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