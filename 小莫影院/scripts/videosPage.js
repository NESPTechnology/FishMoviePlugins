function loadVideoList() {
    try {
        let mVideoPage = {"videoClassGroups": [], "videoList": [], "haveNextPage": false, "nextPageUrl": ""};

        let selectList = document.getElementsByClassName("fed-casc-list")[0];
        let selectGroupsLi = selectList.getElementsByTagName("dl");
        for (let i = 0; selectGroupsLi.length > i; i++) {
            let mVideoClassGroup = {"videoClasses": []};
            let selects = selectGroupsLi[i].getElementsByTagName("a");
            for (let j = 0; j < selects.length; j++) {
                let mVideoClass = {
                    "pageUrl": document.location.protocol + "//" + window.location.host + selects[j].attributes["href"].value,
                    "name": selects[j].text
                };
                mVideoClassGroup.videoClasses.push(mVideoClass);
            }
            mVideoPage.videoClassGroups.push(mVideoClassGroup);
        }

        let videoItemEles = document.getElementsByClassName("fed-list-info")[0].getElementsByTagName("li");

        for (let i = 0; i < videoItemEles.length; i++) {

            let videoItemContentEle = videoItemEles[i].getElementsByClassName("fed-list-pics")[0];

            let video = {};
            video.infoUrl = document.location.protocol + "//" + window.location.host + videoItemContentEle.attributes["href"].value;
            video.name = videoItemEles[i].getElementsByClassName("fed-list-title")[0].textContent;
            try {
                video.score = videoItemContentEle.getElementsByClassName("fed-list-score")[0].textContent;
            } catch (e) {
            }
            try {
                video.title = videoItemContentEle.getElementsByClassName("fed-list-remarks")[0].textContent;
            } catch (e) {
            }
            video.coverImageUrl = document.location.protocol + "//" + window.location.host + videoItemContentEle.attributes["data-original"].value;
            mVideoPage.videoList.push(video);
        }
        let pagesEleAs = document.getElementsByClassName("fed-page-info")[0].getElementsByTagName("a");
        for (let i = 0; i < pagesEleAs.length; i++) {
            if (pagesEleAs[i].textContent.indexOf("/") !== -1) {
                mVideoPage.haveNextPage = pagesEleAs[i].textContent.split("/")[0] / pagesEleAs[i].textContent.split("/")[1] < 1
            }else if (pagesEleAs[i].textContent==="下页"){
                mVideoPage.nextPageUrl = document.location.protocol + "//" + window.location.host + pagesEleAs[i].attributes["href"].value;
            }
        }
        if (!mVideoPage.haveNextPage) {
            mVideoPage.nextPageUrl = "";
        }
        console.log(JSON.stringify(mVideoPage));
        window.videoPluginEngine.sendVideoPage(JSON.stringify(mVideoPage));
    } catch (e) {
        window.videoPluginEngine.sendError(e.toString());
    }
}
loadVideoList();