function prepareXML(ls_XML)
{
    if (typeof ls_XML == "string")
    {
        var parser = new DOMParser();
        var doc = parser.parseFromString(ls_XML, "text/xml");
        return doc;
    }
    else
    {
        console.log("Erreur de type: string attendu, " + typeof ls_XML+" reçu.");
    }
}

function decoupeXML()
{

}

function inLS_comparaisonXML()
{
    if(localStorage.getItem("pf_originXML") == localStorage.getItem("pf_newestXML"))
    {
        //ne fais rien
        console.log("inLS_comparaisonXML() = ils sont identiques");
    }
    else
    {
        console.log("inLS_comparaisonXML() = ils sont differents");
        console.log(localStorage.getItem("pf_originXML"));
        console.log(localStorage.getItem("pf_newestXML"));


        //decoupeXML(localStorage.getItem("pf_newestXML"));
        //fais des trucs

        localStorage.pf_originXML = localStorage.getItem("pf_newestXML");
    }
}

function getXML(url)
{
    var xhr = new XMLHttpRequest;
    xhr.onload = function(){
        if(!localStorage.getItem("pf_originXML"))
        {
            localStorage.setItem("pf_originXML", xhr.responseText);
            //decoupeXML(localStorage.getItem("pf_originXML"));
            //decoupera le xml meme s'il n'y a que pf_originXML
        }
        else
        {
            localStorage.setItem("pf_newestXML", xhr.responseText);
            inLS_comparaisonXML()
            clearInterval();
        }
    };
    xhr.open("GET", url);
    xhr.send();
}

function setBadgeNum()
{
    if(localStorage.getItem("pf_originXML"))
    {
        var ls_getXML = localStorage.getItem("pf_originXML");
        var parser = new DOMParser();
        var doc = parser.parseFromString(ls_getXML, "text/xml");
        var itemCount = doc.getElementsByTagName("item").length;
        browser.browserAction.setBadgeText({text: itemCount.toString()});
    }
    else
    {
         setTimeout(function(){
            setBadgeNum();
         }, 250);
    }
}

localStorage.clear(); //c'est pour debug, evite d'avoir a se soucier des elements deja presents dans localStorage

if(!localStorage.getItem("pf_originXML"))
{
    getXML('http://51.255.196.206/greg/testXHR/rss.xml');
    //getXML('http://lafabriqueainnovations.com/rss.xml');
}
else
{
    console.log("Warning error: Primary level");
}

setInterval(function(){
    getXML('http://51.255.196.206/greg/testXHR/rss.xml');
    //getXML('http://lafabriqueainnovations.com/rss.xml');
}, 10000);

setBadgeNum();
