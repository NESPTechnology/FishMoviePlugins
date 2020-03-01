function loadSearchPage() {
    try {
        let mSearchPage = {"videoList": [], "haveNextPage": false, "nextPageUrl": ""};
        let videosItemElems = document.getElementsByClassName("new_tab_img")[0].getElementsByTagName("li");
        for (let i = 0; i < videosItemElems.length; i++) {
            let videoItemContentEle = videosItemElems[i].getElementsByTagName("a")[0];
            let video = {"videoSourceName": "手机网"};
            let videoInfo = videosItemElems[i].getElementsByClassName("list_info")[0].textContent;
            video.infoUrl = document.location.protocol + "//" + window.location.host + videoItemContentEle.attributes["href"].value;
            video.name = videoItemContentEle.attributes["title"].value.trimStart().trimEnd();
            video.coverImageUrl = document.location.protocol + videoItemContentEle.getElementsByTagName("img")[0].attributes["data-original"].value;
            video.videoClass = videoInfo.split("分类：")[1].split("类型：")[0].trimStart().trimEnd();
            video.types = videoInfo.split("类型：")[1].split("演员：")[0].trimStart().trimEnd();
            video.stars = videoInfo.split("演员：")[1].split("状态：")[0].trimStart().trimEnd();
            video.status = videoInfo.split("状态：")[1].split("时间：")[0].trimStart().trimEnd();
            video.updateTime = videoInfo.split("时间：")[1].trimStart().trimEnd();
            mSearchPage.videoList.push(video);
        }
        let searchPagesEle = document.getElementsByClassName("ui-vpages")[0];
        let pages = null;
        mSearchPage.haveNextPage = false;
        mSearchPage.nextPageUrl = "";
        try {
            pages = searchPagesEle.getElementsByTagName("a");
            for (let i = 0; i < pages.length; i++) {
                let page = pages[i];
                if (page.textContent==="下一页"){
                    mSearchPage.haveNextPage = true;
                    mSearchPage.nextPageUrl = document.location.protocol + "//" + window.location.host + page.attributes["href"].value;
                }
            }

        } catch (e) {
            mSearchPage.haveNextPage = false;
            mSearchPage.nextPageUrl = "";
        }
        console.log(JSON.stringify(mSearchPage));
        window.videoPluginEngine.sendSearchVideoPage(JSON.stringify(mSearchPage));
    } catch (e) {
        window.videoPluginEngine.sendError(e.toString());
    }
}

loadSearchPage();