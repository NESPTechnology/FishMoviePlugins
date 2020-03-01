function loadSearchPage() {
    try {
        let mSearchPage = {"videoList": [], "haveNextPage": false, "nextPageUrl": ""};
        let videosItemElems = document.getElementsByClassName("index-area")[0].getElementsByTagName("li");
        for (let i = 0; i < videosItemElems.length; i++) {
            let videoItemContentEle = videosItemElems[i].getElementsByTagName("a")[0];
            let video = {"videoSourceName": "5nj策驰"};
            video.infoUrl = document.location.protocol + "//" + window.location.host + videoItemContentEle.attributes["href"].value;
            video.name = videoItemContentEle.attributes["title"].value;
            video.coverImageUrl = videoItemContentEle.getElementsByTagName("img")[0].attributes["data-original"].value;
            video.title = videoItemContentEle.getElementsByClassName("other")[0].getElementsByTagName("i")[0].textContent.trimStart();
            mSearchPage.videoList.push(video)
        }

        let searchPagesEle = document.getElementsByClassName("page")[0];
        let pages = searchPagesEle.getElementsByClassName("pagelink_a");
        mSearchPage.haveNextPage = false;
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].textContent === "下一页") {
                mSearchPage.haveNextPage = true;
                mSearchPage.nextPageUrl = document.location.protocol + "//" + window.location.host + pages[i].attributes["href"].value;
            }
        }

        console.log(JSON.stringify(mSearchPage));
        try {
            window.videoPluginEngine.sendSearchVideoPage(JSON.stringify(mSearchPage));
        } catch (e) {
        }
    } catch (e) {
        window.videoPluginEngine.sendError(e.toString());
    }
}

loadSearchPage();