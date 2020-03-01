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
                let videoItemContentEle = videoLis[i].getElementsByTagName("a")[0];
                let video = {};
                video.infoUrl = window.location.protocol + "//" + window.location.host + videoItemContentEle.attributes["href"].value;
                video.name = videoItemContentEle.attributes["title"].value;
                try {
                    video.score = videoItemContentEle.getElementsByClassName("score")[0].textContent;
                } catch (e) {
                }
                try {
                    video.title = videoItemContentEle.getElementsByClassName("title")[0].textContent;
                } catch (e) {
                }
                try {
                    video.coverImageUrl = videoItemContentEle.getElementsByTagName("img")[0].attributes["src"].value;
                } catch (e) {
                }
                videos.push(video);
            }
            return videos;
        }

        let swiperItems = document.querySelector("#focus > ul").getElementsByTagName("a");
        for (let i = 0; i < swiperItems.length; i++) {
            let swiperItem = swiperItems[i];
            let img = swiperItem.getElementsByTagName("img")[0];
            let video = {"videoSourceName": "看看屋"};
            video.infoUrl = window.location.protocol + "//" + window.location.host + swiperItem.attributes["href"].value;
            video.coverImageUrl = img.attributes["src"].value;
            video.title = swiperItem.textContent.replace("[", "").replace("]","").trimStart().trimEnd();
            mMainVideoPage.slideVideos.push(video);
        }

        mMainVideoPage.newMovie = getVideos(document.getElementsByClassName("all_tab")[0].getElementsByTagName("ul")[0]);
        mMainVideoPage.newSoap = getVideos(document.getElementsByClassName("all_tab")[1].getElementsByTagName("ul")[0]);
        mMainVideoPage.newVariety = getVideos(document.getElementsByClassName("all_tab")[4].getElementsByTagName("ul")[0]);
        mMainVideoPage.newAnim = getVideos(document.getElementsByClassName("all_tab")[2].getElementsByTagName("ul")[0]);
        console.log(JSON.stringify(mMainVideoPage));
        window.videoPluginEngine.sendMainVideoPage(JSON.stringify(mMainVideoPage));
    } catch (e) {
        window.videoPluginEngine.sendError(e.toString());
    }
}

loadMainVideoPage();