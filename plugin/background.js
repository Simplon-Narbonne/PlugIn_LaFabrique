/* explications pour r_DestroyTags()
  ***a besoin d'un tableau global vide (tabStr) et d'une string en parametre (chaine)***
  si (chaine) n'a aucun chevron, retourne (chaine) amputé des espaces en debut et fin de string [.trim()].
  cherche le premier chevron fermant dans (chaine) et prend son index (a).
  supprime de (chaine) l'intervale entre l'index 0 et (b+1), affecte le resultat a (newStr).
  cherche le premier chevron ouvrant dans (newStr) et prend son index (b).
  si le premier caractere de (newStr) n'est pas un chevron ouvrant,,
    ajoute dans (tabStr) la string dans l'intervale entre l'index 0 et (b).
    si le dernier index de (tabStr) est une string vide,,
      declare et affecte une string vide a (strFinale).
      |parcours (tabStr) avec une boucle et concatene a chaque tour dans (strFinale), sauf 2 derniers index.|
      vide (tabStr) pour les prochains appels de fonction.
      rappelle (r_DestroyTags) et retourne sa valeur
*/

var tabStr = []; //necessaire pour r_DestroyTags
function r_DestroyTags(chaine)
{
    if (chaine.indexOf('<') == -1 && chaine.indexOf('>') == -1) {
        return chaine.trim();
    }
    a = chaine.indexOf('>');
    newStr = chaine.slice(a+1, chaine.length);
    b = newStr.indexOf('<');
    if(newStr[0] != '<') {
        tabStr.push(newStr.slice(0, b));
        if (tabStr[tabStr.length-1] == "") {
            strFinale = "";
            for (var k=0; k < (tabStr.length-2);k++) {
                strFinale += tabStr[k];
            }
            tabStr = []; //remet tabStr a 0 avant de renvoyer le resultat final
            return r_DestroyTags(strFinale);
        } else {
            return r_DestroyTags(newStr);
        }
    } else {
        return r_DestroyTags(newStr);
    }
}

function inBkg_setBadgeNum()
{
    if(localStorage.getItem("articles"))
    {
        var count = 0;
        var json_tabArticles = JSON.parse(localStorage.getItem("articles"));
        for(var i = 0; i < json_tabArticles.length; i++)
        {
            if(json_tabArticles[i].show == true)
            {
                count += 1;
            }
        }
        browser.browserAction.setBadgeText({text: count.toString()});
    }
    else
    {
        setTimeout(function(){
            inBkg_setBadgeNum();
        }, 250);
    }
}

function inBkg_comparaisonArticles(in_tab2d) //
{
    //console.log("inBkg_comparaisonArticles :");
    var json_tabArticles = JSON.parse(localStorage.getItem("articles"));
    //console.log(json_tabArticles);
    //ici algo qui teste chaque article de in_tab2d avec chaque article de localStorage

    for(var i = in_tab2d.length - 1; i >= 0 ; i--) //fait partir le compteur a l'envers pour choisir l'article le moins recent/le plus proche du dernier article en memoire en premier.
    {
        var found = false;
        for (var j = 0; j < json_tabArticles.length && !found; j++)
        {
            if (in_tab2d[i]["title"] == json_tabArticles[j]["title"]) //compare sur les titres
            {
                found = true;
            }
        }
        if (found == false) //donc l'article est nouveau
        {
            //console.log(json_tabArticles);
            json_tabArticles.unshift(in_tab2d[i]);
            //console.log(json_tabArticles);
            json_tabArticles.pop();
            //console.log(json_tabArticles);
            //je push l'article en premiere position dans json_tabArticles
            //je sors le dernier article (plus ancien) du json_tabArticles
        }
        else
        {
            found = false;
            //je remet found a false et je fais rien d'autre
        }
    }
    json_tabArticles = JSON.stringify(json_tabArticles);
    //console.log(json_tabArticles);
    localStorage.setItem("articles", json_tabArticles);
    //console.log(localStorage.articles);
    //sorti des boucles je stringify json_tabArticles et je le stock dans localStorage
}

function inBkg_prepareXML(ls_XML)
{
    if (typeof ls_XML == "string")
    {
        //console.log("inBkg_prepareXML : ok je renvoi le xmlReady");
        var parser = new DOMParser();
        var doc = parser.parseFromString(ls_XML, "text/xml");
        return doc;
    }
    else
    {
        //console.log("Erreur de type: string attendu, " + typeof ls_XML+" reçu.");
    }
}

function inBkg_decoupeXML(ls_XML) //appele de deux manieres, soit avec origin depuis getxml
{                                  // soit avec newest depuis comparaisonxml
    if(!typeof ls_XML == "string")
    {
        //console.log("Erreur de type dans inBkg_decoupeXML. Fermeture.");
    }
    else
    {
        //console.log("inBkg_decoupeXML appelle inBkg_prepareXML pour avoir xmlReady");
        var xmlReady = inBkg_prepareXML(ls_XML);
        var tabArticles = [];
        var tags = xmlReady.getElementsByTagName("item");
        for (var i = 0; i < tags.length; i++)
        {
            var title = tags[i].getElementsByTagName("title");
            title = title[0].childNodes[0].nodeValue;
            var link = tags[i].getElementsByTagName("link");
            link = link[0].childNodes[0].nodeValue;
            var description = tags[i].getElementsByTagName("description");
            description = r_DestroyTags(description[0].childNodes[0].nodeValue);
            tabArticles[i] = {
                "title": title,
                "link": link,
                "description": description,
                "show": true //bool a modifier pour cacher l'article au clic + reload
            };
        }
        if(localStorage.getItem("articles"))
        {
            //console.log("inBkg_decoupeXML apres les boucles : articles existe dans LS, appel de inBkg_comparaisonArticles avec tabArticles");
            inBkg_comparaisonArticles(tabArticles);
        }
        else
        {
            //console.log("inBkg_decoupeXML apres les boucles : article existe pas, on stringify tab article et on stock dans LS");
            var json_tabArticles = JSON.stringify(tabArticles);
            //console.log(json_tabArticles);
            localStorage.setItem("articles", json_tabArticles);
        }
        inBkg_setBadgeNum();
    }
}

function inLS_comparaisonXML()
{
    if(localStorage.getItem("pf_originXML") === localStorage.getItem("pf_newestXML"))
    {
        //console.log("ORIGIN");
        //console.log(localStorage.getItem("pf_originXML"));
        //console.log("NEWEST");
        //console.log(localStorage.getItem("pf_newestXML"));
        //ne fais rien
        //console.log("inLS_comparaisonXML() pf_originXML et pf_newestXML sont identiques. Fermeture.");
        clearInterval(debugI);
    }
    else
    {
        //clearInterval(debugI); //debug : eviter de flood avec setinterval
        //console.log("normalement, setInterval est stop ici");
        //console.log("inLS_comparaisonXML passe dans le else et appelle inBkg_decoupeXML avec pf_newestXML");
        inBkg_decoupeXML(localStorage.getItem("pf_newestXML"));
        localStorage.setItem("pf_originXML", localStorage.getItem("pf_newestXML"));
    }
}

function inBkg_getXML(url)
{
    var xhr = new XMLHttpRequest;
    xhr.onload = function(){
        if(!localStorage.getItem("pf_originXML"))
        {
            //console.log("inBkg_getXML premier passage, appelle inBkg_decoupeXML");
            localStorage.setItem("pf_originXML", xhr.responseText);
            inBkg_decoupeXML(localStorage.getItem("pf_originXML"));
            //decoupeXML(localStorage.getItem("pf_originXML"));
            //decoupera le xml meme s'il n'y a que pf_originXML
        }
        else
        {
            //console.log("inBkg_getXML passages suivants, appelle inLS_comparaisonXML");
            //console.log("newest = ");
            //console.log(xhr.responseText);
            localStorage.setItem("pf_newestXML", xhr.responseText);
            inLS_comparaisonXML();
        }
    };
    xhr.open("GET", url+"?nocache="+ Math.random()+ Math.random() + Math.random()); //oblige a afficher un xhr qui n'est pas en cache
    xhr.send();
}

localStorage.clear(); //c'est pour debug, evite d'avoir a se soucier des elements deja presents dans localStorage

if(!localStorage.getItem("pf_originXML"))
{
    //console.log("lancement initial");
    inBkg_getXML('http://51.255.196.206/greg/testXHR/rss2.xml');
    //inBkg_getXML('http://lafabriqueainnovations.com/rss.xml');
}
else
{
    //console.log("Warning error: Primary level");
}

var debugI = setInterval(function(){
    //console.log("appel du rss2");
    inBkg_getXML('http://51.255.196.206/greg/testXHR/rss.xml');
    //inBkg_getXML('http://lafabriqueainnovations.com/rss.xml');
}, 10000);
