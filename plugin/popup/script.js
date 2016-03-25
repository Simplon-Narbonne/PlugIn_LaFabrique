/*
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

var tabStr = [];

function r_DestroyTags(chaine)
{
  if (chaine.indexOf('<') == -1 && chaine.indexOf('>') == -1) //condition d'arret
  {
    return chaine.trim();
  }

  a = chaine.indexOf('>');
  newStr = chaine.slice(a+1, chaine.length);
  b = newStr.indexOf('<');
  if(newStr[0] != '<')
  {
    tabStr.push(newStr.slice(0, b));
    if (tabStr[tabStr.length-1] == "")
    {
      strFinale = "";
      for (var k=0; k < (tabStr.length-2);k++)
      {
        strFinale += tabStr[k];
      }
      tabStr = [];
      return r_DestroyTags(strFinale);
    }
    else
    {
      return r_DestroyTags(newStr);
    }
  }
  else
  {
    return r_DestroyTags(newStr);
  }
}

function testOtherDomain(url)
{
  var xhr = new XMLHttpRequest;

  xhr.onload = function(){
    var texteRecup = xhr.responseXML;
    tags = texteRecup.getElementsByTagName("item");
    for (var i = 0; i < tags.length; i++)
    {
      title = tags[i].getElementsByTagName("title");
      link = tags[i].getElementsByTagName("link");
      description = tags[i].getElementsByTagName("description");
      /*comments = tags[i].getElementsByTagName("comments");
      category = tags[i].getElementsByTagName("category");
      pubDate = tags[i].getElementsByTagName("pubDate");
      if(navigator.userAgent.indexOf("Chrome") != -1 )
      {
        auteur = tags[i].getElementsByTagName("creator");
      }
      else if(navigator.userAgent.indexOf("Firefox") != -1 )
      {
        auteur = tags[i].getElementsByTagName("dc:creator");
      }
      guid = tags[i].getElementsByTagName("guid");*/
      tabItem = [link, title, description];
      getExistDiv = document.querySelector("#Contenu");
      var dynDiv = "div" + (i+1);
      createDivAuto = document.createElement(dynDiv);
      createDivArticle = document.createElement('div');
      createDivArticle.setAttribute("class", "article");
      for (var j = 0; j < tabItem.length; j++)
      {
        if (tabItem[j] == link)
        {
          var createLink = document.createElement("a");
          var dynLink = tabItem[j][0].childNodes[0].nodeValue;
          createLink.setAttribute("href", dynLink);
          createLink.setAttribute("class", "lien");
          createLink.setAttribute("target", "_blank");
          createLink.appendChild(createDivArticle);
          createDivAuto.appendChild(createLink);
          getExistDiv.appendChild(createDivAuto);
        }

        if (tabItem[j] == title)
        {
          var createTitle = document.createElement("h1");
          createTitle.setAttribute("class", "title");
          var createTextNode = document.createTextNode(tabItem[j][0].childNodes[0].nodeValue);
          createTitle.appendChild(createTextNode);
          createDivArticle.appendChild(createTitle);
        }

        if(tabItem[j] == description)
        {
          strDesc = r_DestroyTags(tabItem[j][0].childNodes[0].nodeValue);
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
  }
  xhr.open("GET", url);
  xhr.send();
}

testOtherDomain('http://51.255.196.206/greg/testXHR/rss.xml');

/*var buttonClick = document.querySelector('body button');
buttonClick.addEventListener("click", function(e){
  testOtherDomain('http://51.255.196.206/greg/testXHR/rss.xml');
}, false);
*/
