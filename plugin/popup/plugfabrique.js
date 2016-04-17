function parseXML()
{
    var json_tabArticles = JSON.parse(localStorage.getItem("articles"));
    for(var i = 0; i < json_tabArticles.length; i++)
    {
        getExistDiv = document.querySelector("#Contenu");
        var dynDiv = "div" + (i+1);
        createDivAuto = document.createElement(dynDiv);
        createDivArticle = document.createElement('div');
        createDivArticle.setAttribute("class", "article");

        if(json_tabArticles[i].show == false)
        {
            getExistDiv.appendChild(createDivAuto);
            continue;
        }
        else
        {
            var createLink = document.createElement("a");
            var dynLink = json_tabArticles[i].link;
            createLink.setAttribute("href", dynLink);
            createLink.setAttribute("class", "lien");
            createLink.setAttribute("target", "_blank");
            createLink.appendChild(createDivArticle);
            createDivAuto.appendChild(createLink);
            getExistDiv.appendChild(createDivAuto);

            var createTitle = document.createElement("h1");
            createTitle.setAttribute("class", "titre");
            var createTextNode = document.createTextNode(json_tabArticles[i].title);
            createTitle.appendChild(createTextNode);
            createDivArticle.appendChild(createTitle);

            strDesc = json_tabArticles[i].description;
            var createPara = document.createElement("p");
            createPara.setAttribute("class", "paragraphe");
            var setAtt_id = "innerP"+(i+1);
            createPara.setAttribute("id", setAtt_id);
            createDivArticle.appendChild(createPara);
            var queSel_id = "#innerP"+(i+1);
            var target = document.querySelector(queSel_id);
            target.innerHTML += strDesc;
        }
    }
}

parseXML();

var hideDiv1 = document.querySelector("div1");
var hideDiv2 = document.querySelector("div2");
var hideDiv3 = document.querySelector("div3");

function hideDiv(divID)
{
    var json_tabArticles = JSON.parse(localStorage.getItem("articles"));
    json_tabArticles[divID].show = false;
    json_tabArticles = JSON.stringify(json_tabArticles);
    localStorage.setItem("articles", json_tabArticles);
    browser.runtime.getBackgroundPage(
        function(bkg)
        {
            bkg.inBkg_setBadgeNum();
        }
    );
    window.location.reload();
}

hideDiv1.addEventListener("click", function(e){
    hideDiv(0);
}, false);

hideDiv2.addEventListener("click", function(e){
    hideDiv(1);
}, false);

hideDiv3.addEventListener("click", function(e){
    hideDiv(2);
}, false);


/*
    au clic :
    met show a false
    rappelle le setBadge depuis le background
    actualise la page
*/


/*browser.runtime.getBackgroundPage(
    function(bkg)
    {
        parseXML(bkg.mavar);
    }
);
*/
