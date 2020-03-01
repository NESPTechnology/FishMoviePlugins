function loadSearchPage() {
    try {
        let mSearchPage = {"videoList": [], "haveNextPage": false, "nextPageUrl": ""};
        let videosItemElems = document.querySelector("body > div.fed-main-info.fed-min-width > div > div").getElementsByTagName("dl");
        for (let i = 0; i < videosItemElems.length; i++) {
            let dt = videosItemElems[i].getElementsByTagName("dt")[0];
            let dd = videosItemElems[i].getElementsByTagName("dd")[0];
            let videoItemContentEleDtA = dt.getElementsByTagName("a")[0];
            let video = {"videoSourceName": "初心视频"};
            video.infoUrl = document.location.protocol + "//" + window.location.host + dt.getElementsByTagName("a")[0].attributes["href"].value;
            video.score = videoItemContentEleDtA.getElementsByClassName("fed-list-score")[0].textContent.trimStart().trimEnd();
            video.name = dd.getElementsByClassName("fed-part-eone")[0].getElementsByTagName("a")[0].textContent.trimStart().trimEnd();
            video.coverImageUrl = videoItemContentEleDtA.attributes["data-original"].value;
            video.title = videoItemContentEleDtA.getElementsByClassName("fed-list-remarks")[0].textContent.trimStart().trimEnd();
            let infos = dd.getElementsByClassName("fed-part-rows")[0].textContent;
            video.stars = infos.split("主演：")[1].split('导演：')[0].trimStart().trimEnd();
            video.Director = infos.split("导演：")[1].split('分类：')[0].trimStart().trimEnd();
            video.types = infos.split("分类：")[1].split('地区：')[0].trimStart().trimEnd();
            video.area = infos.split("地区：")[1].split('年份：')[0].trimStart().trimEnd();
            video.showTime = infos.split("年份：")[1].split('更新：')[0].trimStart().trimEnd();
            video.updateTime = infos.split("更新：")[1].split('简介：')[0].trimStart().trimEnd();
            mSearchPage.videoList.push(video)
        }

        let pagesEle = document.getElementsByClassName("fed-page-info")[0];
        mSearchPage.haveNextPage = false;
        if (pagesEle !== undefined) {
            let pages = pagesEle.getElementsByTagName("a");
            for (let i = 0; i < pages.length; i++) {
                if (pages[i].textContent.indexOf("/") !== -1) {
                    let fullNum = pages[i].textContent.split("/")[1];
                    let currentNum = pages[i].textContent.split("/")[0];
                    mSearchPage.haveNextPage = currentNum / fullNum < 1;
                }
            }

            if (mSearchPage.haveNextPage) {
                for (let i = 0; i < pages.length; i++) {
                    if (pages[i].textContent === "下页") {
                        mSearchPage.nextPageUrl = document.location.protocol + "//" + window.location.host + pages[i].attributes["href"].value;
                    }
                }
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