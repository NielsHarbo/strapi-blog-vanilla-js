/*

   _____ _                         _    _____ __  __  _____ 
  / ____| |                       (_)  / ____|  \/  |/ ____|
 | (___ | |_ _ __ __ _ _ __  _ __  _  | |    | \  / | (___  
  \___ \| __| '__/ _` | '_ \| '_ \| | | |    | |\/| |\___ \ 
  ____) | |_| | | (_| | |_) | |_) | | | |____| |  | |____) |
 |_____/ \__|_|  \__,_| .__/| .__/|_|  \_____|_|  |_|_____/ 
                      | |   | |                             
                      |_|   |_|                             

*/

window.addEventListener("load", function () {
    const strAPI = "http://localhost:1337";
    let page = "Kategoris";
    let pageId = null;
    let url = window.location.href;
    url = new URL(url);
    if (url.searchParams.get("id")) {
        page = url.searchParams.get("page");
    }
    if (url.searchParams.get("id")) {
        pageId = url.searchParams.get("id");
    }
    const root = document.getElementById("root");

    apiCall(page, function (result) {

        result.forEach(function (cElement) {

            if (page == "Kategoris" && pageId == null) {
                //console.log(cElement);
                root.appendChild(linkItem(
                    "div",
                    "./?page=" + page + "&id=" + cElement.id,
                    cElement.kategorinavn,
                )
                );
            } else if (page == "Kategoris" && cElement.id == pageId) {
                cElement.artikels.forEach(function (aElement) {
                    //console.log(aElement)
                    root.appendChild(linkItem(
                        "div",
                        "./?page=artikels" + "&id=" + aElement.id,
                        aElement.overskrift,
                    )
                    );
                });

            }
            else if (page == "artikels" && cElement.id == pageId) {
                console.log(cElement)
                root.appendChild(
                    articleItem(cElement)
                );
            }
        })
    });

    //FETCH

    function apiCall(q, callBack) {
        fetch(strAPI + "/" + q)
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                callBack(result);
            })
    }

    //FUNKTIONER TIL AT GENERERE HTML


    function linkItem(wrapper, href, text) {
        wrapperElement = document.createElement(wrapper);
        let link = document.createElement("a");
        link.setAttribute("href", href);
        link.appendChild(document.createTextNode(text));
        wrapperElement.appendChild(link);
        return wrapperElement;
    }

    function articleItem(entry) {
        let postContainer = document.createElement("article");
        let postHeading = document.createElement("h2");
        postHeading.appendChild(document.createTextNode(entry.overskrift));
        postContainer.appendChild(postHeading);
        let postBody = document.createElement("div");
        postBody.innerHTML = entry.indhold;
        postContainer.appendChild(postBody);
        if (entry.billede != null) {
            let img = document.createElement("img");
            img.setAttribute("src", strAPI + entry.billede.url);
            postContainer.appendChild(img);
        }
        return postContainer;

    }
})