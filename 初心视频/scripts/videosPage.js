function loadVideoListPage() {
    try {
        let mVideoPage = {"videoClassGroups": [], "videoList": [], "haveNextPage": false, "nextPageUrl": ""};
        var selectList = document.getElementsByClassName("fed-casc-info")[0];
        if (selectList===undefined||selectList===null){
            selectList = document.getElementsByClassName("fed-scre-list")[0]
        }

        let selectGroupsLi = selectList.getElementsByTagName("dl");
        for (let i = 0; selectGroupsLi.length > i; i++) {
            let mVideoClassGroup = {"videoClasses": []};
            let selects = selectGroupsLi[i].getElementsByTagName("a");
            for (let j = 0; j < selects.length; j++) {
                let mVideoClass = {
                    "pageUrl": document.location.protocol + "//" + window.location.host + selects[j].attributes["href"].value,
                    "name": selects[j].text.trimStart().trimEnd()
                };
                mVideoClassGroup.videoClasses.push(mVideoClass);
            }
            mVideoPage.videoClassGroups.push(mVideoClassGroup);
        }

        let videoItemEles = document.getElementsByClassName("fed-list-info")[0].getElementsByTagName("li");

        for (let i = 0; i < videoItemEles.length; i++) {

            let videoItemContentEle = videoItemEles[i].getElementsByTagName("a")[0];

            let video = {};
            video.infoUrl = document.location.protocol + "//" + window.location.host + videoItemContentEle.attributes["href"].value;
            video.name = videoItemEles[i].getElementsByClassName("fed-list-title")[0].textContent;
            video.score = videoItemContentEle.getElementsByClassName("fed-list-score")[0].textContent;
            video.title = videoItemContentEle.getElementsByClassName("fed-list-remarks")[0].textContent;

            video.coverImageUrl = videoItemContentEle.attributes["data-original"].value;

            mVideoPage.videoList.push(video);
        }
        let pagesEle = document.getElementsByClassName("fed-page-info")[0];
        let pages = pagesEle.getElementsByTagName("a");

        mVideoPage.haveNextPage = false;
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].textContent.indexOf("/") !== -1) {
                let fullNum = pages[i].textContent.split("/")[1];
                let currentNum = pages[i].textContent.split("/")[0];
                mVideoPage.haveNextPage = currentNum / fullNum < 1;
            }
        }

        if (mVideoPage.haveNextPage) {
            for (let i = 0; i < pages.length; i++) {
                if (pages[i].textContent === "下页") {
                    mVideoPage.nextPageUrl = document.location.protocol + "//" + window.location.host + pages[i].attributes["href"].value;
                }
            }
        }
        console.log(JSON.stringify(mVideoPage));
        try {
            window.videoPluginEngine.sendVideoPage(JSON.stringify(mVideoPage));
        } catch (e) {
        }
    } catch (e) {
        window.videoPluginEngine.sendError(e.toString());
    }
}

loadVideoListPage();