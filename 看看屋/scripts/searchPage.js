function loadSearchPage() {
    try {
        let mSearchPage = {"videoList": [], "haveNextPage": false, "nextPageUrl": ""};
        let videosItemElems = document.getElementsByClassName("new_tab_img")[0].getElementsByTagName("li");
        for (let i = 0; i < videosItemElems.length; i++) {
            let videoItemContentEle = videosItemElems[i].getElementsByTagName("a")[0];
            let video = {"videoSourceName": "看看屋"};
            let videoInfo = videosItemElems[i].getElementsByClassName("list_info")[0].textContent;
            video.infoUrl = document.location.protocol + "//" + window.location.host + videoItemContentEle.attributes["href"].value;
            video.name = videoItemContentEle.attributes["title"].value.trimEnd().trimStart();
            video.coverImageUrl = videoItemContentEle.getElementsByTagName("img")[0].attributes["src"].value;
            video.videoClass = videoInfo.split("分类：")[1].split("类型：")[0].trimEnd().trimStart();
            video.types = videoInfo.split("类型：")[1].split("演员：")[0].trimEnd().trimStart();
            video.stars = videoInfo.split("演员：")[1].split("状态：")[0].trimEnd().trimStart();
            video.status = videoInfo.split("状态：")[1].split("时间：")[0].trimEnd().trimStart();
            video.updateTime = videoInfo.split("时间：")[1].trimEnd().trimStart();
            mSearchPage.videoList.push(video)
        }
        let searchPagesEle = document.getElementsByClassName("ui-vpages")[0];

        let pages = null;

        try {
            pages = searchPagesEle.getElementsByTagName("strong")[0].innerText.trim().split(/\s+/)[1];
        } catch (e) {
        }

        mSearchPage.haveNextPage = false;
        mSearchPage.nextPageUrl = "";
        if (pages != null) {
            let fullPage = pages.trim().split("/")[1];
            let currentPage = pages.trim().split("/")[0];
            mSearchPage.haveNextPage = currentPage / fullPage < 1;
            if (mSearchPage.haveNextPage) {
                mSearchPage.nextPageUrl = document.location.protocol + "//" + window.location.host + searchPagesEle.getElementsByClassName("pagegbk")[0].attributes["href"].value;
            }
        }
        console.log(JSON.stringify(mSearchPage));
        window.videoPluginEngine.sendSearchVideoPage(JSON.stringify(mSearchPage));
    } catch (e) {
        window.videoPluginEngine.sendError(e.toString());
    }
}
loadSearchPage();