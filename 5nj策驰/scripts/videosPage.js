function loadVideoListPage() {
    try {
        let mVideoPage = {"videoClassGroups": [], "videoList": [], "haveNextPage": false, "nextPageUrl": ""};
        let selectList = document.getElementById("sj-gjsy");
        let selectGroupsLi = selectList.getElementsByClassName("clearfix");
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

        let videoItemEles = document.getElementsByClassName("index-area")[0].getElementsByTagName("li");

        for (let i = 0; i < videoItemEles.length; i++) {

            let videoItemContentEle = videoItemEles[i].getElementsByTagName("a")[0];

            let video = {};
            video.infoUrl = document.location.protocol + "//" + window.location.host + videoItemContentEle.attributes["href"].value;
            video.name = videoItemContentEle.attributes["title"].value;

            try {
                video.title = videoItemContentEle.getElementsByTagName("p")[0].getElementsByTagName("i")[0].textContent.trimStart();
            } catch (e) {
            }

            if (videoItemContentEle.getElementsByTagName("img")[0].attributes["data-original"].value.indexOf("?url=") !== -1) {
                video.coverImageUrl = videoItemContentEle.getElementsByTagName("img")[0].attributes["data-original"].value.split("?url=")[1]
            } else {
                video.coverImageUrl = videoItemContentEle.getElementsByTagName("img")[0].attributes["data-original"].value;
            }
            mVideoPage.videoList.push(video);
        }

        let pagesEle = document.getElementsByClassName("page")[0];
        let pages = pagesEle.getElementsByClassName("pagelink_a");

        mVideoPage.haveNextPage = false;
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].textContent === "下一页") {
                mVideoPage.haveNextPage = true;
                mVideoPage.nextPageUrl = document.location.protocol + "//" + window.location.host + pages[i].attributes["href"].value;
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