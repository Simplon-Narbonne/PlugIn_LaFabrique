function parseXML()
{
    var json_tabArticles = JSON.parse(localStorage.getItem("articles"));
    for(var i = 0; i < json_tabArticles.length; i++)
    {
        if(json_tabArticles[i].show == false)
        {
            continue;
        }
        else
        {
            getExistDiv = document.querySelector("#Contenu");
            var dynDiv = "div" + (i+1);
            createDivAuto = document.createElement(dynDiv);
            createDivArticle = document.createElement('div');
            createDivArticle.setAttribute("class", "article");

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

            strDesc = r_DestroyTags(json_tabArticles[i].description);
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
/*if(localStorage.getItem("pf_originXML")) //pf = plugin fabrique
{
    browser.runtime.getBackgroundPage(
        function(bkg)
        {
            var xmlReady = bkg.inBkg_prepareXML(localStorage.getItem("pf_originXML"));
            parseXML(xmlReady);
        }
    );
}
else
{
    console.log("pf_originXML n'existe pas dans le localStorage");
}*/

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
