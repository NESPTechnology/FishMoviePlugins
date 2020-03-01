function loadSearchPage() {
    try {
        let mSearchPage = {"videoList": [], "haveNextPage": false, "nextPageUrl": ""};
        let videosItemElems = document.querySelector("body > div.fed-main-info.fed-min-width > div > div").getElementsByTagName("dl");
        for (let i = 0; i < videosItemElems.length; i++) {
            let videoItemAPic = videosItemElems[i].getElementsByClassName("fed-list-pics")[0];
            let video = {"videoSourceName": "小莫影院"};
            let videoInfo = videosItemElems[i].getElementsByTagName("dd")[0].textContent;
            video.infoUrl = document.location.protocol + "//" + window.location.host + videoItemAPic.attributes["href"].value;
            video.name = videosItemElems[i].getElementsByTagName("dd")[0].getElementsByTagName("h1")[0].textContent.trimEnd().trimStart();
            video.coverImageUrl = document.location.protocol + "//" + window.location.host + videoItemAPic.attributes["data-original"].value;
            video.videoClass = videoInfo.split("分类：")[1].split("地区：")[0].trimEnd().trimStart();
            video.area = videoInfo.split("地区：")[1].split("年份：")[0].trimEnd().trimStart();
            video.showTime = videoInfo.split("年份：")[1].split("更新：")[0].trimEnd().trimStart();
            video.stars = videoInfo.split("主演：")[1].split("导演：")[0].trimEnd().trimStart();
            video.Director = videoInfo.split("导演：")[1].split("分类：")[0].trimEnd().trimStart();
            video.title = videoItemAPic.getElementsByClassName("fed-list-remarks")[0].textContent.trimEnd().trimStart();
            video.status = videoItemAPic.getElementsByClassName("fed-list-remarks")[0].textContent.trimEnd().trimStart();
            video.updateTime = videoInfo.split("更新：")[1].split("简介：")[0].trimEnd().trimStart();
            mSearchPage.videoList.push(video)
        }

        let pagesEleAs = document.getElementsByClassName("fed-page-info")[0].getElementsByTagName("a");
        for (let i = 0; i < pagesEleAs.length; i++) {
            if (pagesEleAs[i].textContent.indexOf("/") !== -1) {
                mSearchPage.haveNextPage = pagesEleAs[i].textContent.split("/")[0] / pagesEleAs[i].textContent.split("/")[1] < 1
            }else if (pagesEleAs[i].textContent==="下页"){
                mSearchPage.nextPageUrl = document.location.protocol + "//" + window.location.host + pagesEleAs[i].attributes["href"].value;
            }
        }
        if (!mSearchPage.haveNextPage) {
            mSearchPage.nextPageUrl = "";
        }

        console.log(JSON.stringify(mSearchPage));
        window.videoPluginEngine.sendSearchVideoPage(JSON.stringify(mSearchPage));
    } catch (e) {
        window.videoPluginEngine.sendError(e.toString());
    }
}
loadSearchPage();