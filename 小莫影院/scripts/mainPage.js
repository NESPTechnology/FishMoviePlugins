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
            let videoLis = ele.getElementsByTagName("li");
            let videos = [];
            for (let i = 0; i < videoLis.length; i++) {
                let li = videoLis[i];
                let videoItemContentEleAPic = li.getElementsByClassName("fed-list-pics")[0];
                let video = {};
                video.infoUrl = window.location.protocol + "//" + window.location.host + videoItemContentEleAPic.attributes["href"].value;
                video.name = li.getElementsByClassName("fed-list-title")[0].textContent;
                try {
                    video.score = videoItemContentEleAPic.getElementsByClassName("fed-list-score")[0].textContent;
                } catch (e) {
                }
                try {
                    video.title = videoItemContentEleAPic.getElementsByClassName("fed-list-remarks")[0].textContent;
                } catch (e) {
                }
                try {
                    video.coverImageUrl = window.location.protocol + "//" + window.location.host + videoItemContentEleAPic.attributes["data-original"].value;
                } catch (e) {
                }
                videos.push(video);
            }
            return videos;
        }

        let swiperItems = document.querySelector("body > div.fed-main-info.fed-min-width > div > div.fed-swip-container.fed-part-rows.swiper-container-horizontal.swiper-container-android > ul").getElementsByTagName("a");
        for (let i = 0; i < swiperItems.length; i++) {
            let swiperItem = swiperItems[i];
            let video = {"videoSourceName": "小莫影院"};
            video.infoUrl = window.location.protocol + "//" + window.location.host + swiperItem.attributes["href"].value;
            try {
                video.coverImageUrl = window.location.protocol + "//" + window.location.host + swiperItem.attributes["style"].value.split("url(\"")[1].split("\")")[0];
            } catch (e) {
                video.coverImageUrl = window.location.protocol + "//" + window.location.host + swiperItem.attributes["data-background"].value;
            }
            video.title = swiperItem.getElementsByClassName("fed-swip-head")[0].textContent + " " + swiperItem.getElementsByClassName("fed-font-xii")[0].textContent;
            mMainVideoPage.slideVideos.push(video);
        }
        mMainVideoPage.newPlay = getVideos(document.querySelector("body > div.fed-main-info.fed-min-width > div > div:nth-child(5) > ul"));
        mMainVideoPage.newMovie = getVideos(document.querySelector("body > div.fed-main-info.fed-min-width > div > div:nth-child(6) > div.fed-col-sx12.fed-col-md7 > ul"));
        mMainVideoPage.newSoap = getVideos(document.querySelector("body > div.fed-main-info.fed-min-width > div > div:nth-child(7) > div.fed-col-sx12.fed-col-md7 > ul"));
        mMainVideoPage.newVariety = getVideos(document.querySelector("body > div.fed-main-info.fed-min-width > div > div:nth-child(9) > div:nth-child(2) > ul"));
        mMainVideoPage.newAnim = getVideos(document.querySelector("body > div.fed-main-info.fed-min-width > div > div:nth-child(8) > div.fed-col-sx12.fed-col-md7 > ul"));
        console.log(JSON.stringify(mMainVideoPage));
        window.videoPluginEngine.sendMainVideoPage(JSON.stringify(mMainVideoPage));
    } catch (e) {
        window.videoPluginEngine.sendError(e.toString());
    }
}
loadMainVideoPage();