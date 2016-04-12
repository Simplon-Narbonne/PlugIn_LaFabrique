function getXML(url)
{
    var xhr = new XMLHttpRequest;
    xhr.onload = function(){
        localStorage.setItem("pf_originXML", xhr.responseText);
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
         }, 1250);
    }
}

localStorage.clear(); //c'est pour debug, pas utile pour la prod en l'etat

if(!localStorage.getItem("pf_originXML"))
{
    getXML('http://51.255.196.206/greg/testXHR/rss.xml');
    //getXML('http://lafabriqueainnovations.com/rss.xml');
}
setInterval(function(){
    getXML('http://51.255.196.206/greg/testXHR/rss.xml');
    //getXML('http://lafabriqueainnovations.com/rss.xml');
}, 30000);

setBadgeNum();

/*
est-ce que le contexte du plugin permet le localStorage et si oui, est-ce que le contexte est partage entre chaque parties ?


script bg fait un xhr, choppe un xml et le stocke dans local storage
    est-ce qu'on fait un tri en bkg pour virer les images?
script popup choppe ce xml et le copie dans le localStorage
script popup parse la copie du xml et stocke le resultat dans un tableau localStorage
    *** ici bloc pour gerer les differents cas lors de la suppression onclick sur une div du popup
        si bkg xml et copie xml sont identiques, pas touche au parsing ***
adapter le badge en fonction du nombre d'item dans le xml.
    base sur quel xml? l'origine ou la copie modif par script popup ?

*/
