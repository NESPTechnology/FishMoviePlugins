function loadSearchPage() {
    try {
        let mSearchPage = {"videoList": [], "haveNextPage": false, "nextPageUrl": ""};
        let videosItemElems = document.getElementsByClassName("xing_vb")[0].getElementsByTagName("li");
        for (let i = 1; i < videosItemElems.length - 1; i++) {
            let videoItemContentEle = videosItemElems[i].getElementsByTagName("a")[0];
            let video = {"videoSourceName": "135资源网"};
            video.infoUrl = document.location.protocol + "//" + window.location.host + videoItemContentEle.attributes["href"].value;
            video.name = videoItemContentEle.text;
            video.types =videosItemElems[i].getElementsByClassName("xing_vb5")[0].textContent;
            video.videoClass = video.types;
            video.updateTime =videosItemElems[i].getElementsByClassName("xing_vb6")[0].textContent;
            mSearchPage.videoList.push(video)
        }

        let pages = null;

        try {
            pages = document.getElementsByClassName("pages")[0].textContent.split("当前:")[1].split("页")[0];
        } catch (e) {
        }

        mSearchPage.haveNextPage = false;
        mSearchPage.nextPageUrl = "";
        if (pages != null) {
            let fullPage = pages.split("/")[1];
            let currentPage = pages.split("/")[0];
            mSearchPage.haveNextPage = currentPage / fullPage < 1;
            if (mSearchPage.haveNextPage) {
                mSearchPage.nextPageUrl = document.location.protocol + "//" + window.location.host +document.getElementsByClassName("pages")[0].getElementsByClassName("pagelink_a")[0].attributes["href"].value;
            }
        }

        console.log(JSON.stringify(mSearchPage));
        window.videoPluginEngine.sendSearchVideoPage(JSON.stringify(mSearchPage));
    } catch (e) {
        window.videoPluginEngine.sendError(e.toString());
    }
}
loadSearchPage();