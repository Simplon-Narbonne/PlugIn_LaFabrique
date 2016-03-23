//Ajoute un evenement sur le clic du lien (redirection vers onglet deja ouvert)

/*var element = document.querySelector('#scriptOnglet');

element.addEventListener('click', function() {

  chrome.tabs.query({'title': 'La Fabrique à Innovations | Donnez vie à vos idées !'}, tabs => {
    if (tabs.length === 0)
    {
      chrome.tabs.create({'url': 'http://lafabriqueainnovations.com/', 'active': true});
    }
    else
    {
      chrome.tabs.query({'title': 'La Fabrique à Innovations | Donnez vie à vos idées !', 'active': true}, active => {
        if (active.length === 0)
        {
          chrome.tabs.update(tabs[0].id, {'active': true});
        }
      });
    }
  });
}, false);
*/


  /*
  parcours la chaine et cherche le premier chevron ouvrant et prend son index (a)
  parcours la chaine et cherche le premier chevron fermant et prend son index (b)
  supprime de la chaine l'intervale entre l'index a et l'index b
  si il n'y a plus de chevrons ouvrant ET fermant, retourne la string
  sinon rapelle la fonction
  et l'insere avec inner html
  trim() trim pour virer les espaces
  */

var tabStr = [];
var strFinale = "";

function r_KillChevron(chaine)
{
  if (chaine.indexOf('<') == -1 || chaine.indexOf('>') == -1)
  {
    return chaine;
  }
  else
  {
    b = chaine.indexOf('>');
    newStr = chaine.slice(b+1, chaine.length).trim();
    a = newStr.indexOf('<');
    if(newStr[0] != '<')
    {
      tabStr.push(newStr.slice(0, a));
      //de l'index 0 a a-1 stocke la chaine dans tabStr.
      //quand cest fini, concatene le tableau et return la string
      if (tabStr[tabStr.length-1] == "")
      {
        strFinale = "";
        for (var k=0; k < (tabStr.length-2);k++)
        {
          strFinale += tabStr[k];
        }
        //console.log(tabStr);
        tabStr = [];
        r_KillChevron(strFinale);
      }
      //console.log(tabStr);
      //console.log(newStr);
      r_KillChevron(newStr);
    }
    else
    {
      r_KillChevron(newStr);
    }
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
      comments = tags[i].getElementsByTagName("comments");
      category = tags[i].getElementsByTagName("category");
      pubDate = tags[i].getElementsByTagName("pubDate");
      auteur = tags[i].getElementsByTagName("dc:creator");
      guid = tags[i].getElementsByTagName("guid");
      tabItem = [title, link, description, comments, category, pubDate, auteur, guid];
      getExistDiv = document.querySelector("#gxBaseContenu");
      createDiv = document.createElement("div"+i);
      for (var j = 0; j < tabItem.length; j++)
      {
        if(tabItem[j] == description)
        {
          //debugStr = tabItem[j][0].childNodes[0].nodeValue;
          //console.log(tabItem[j][0].childNodes[0].nodeValue);
          //console.log(r_KillChevron(tabItem[j][0].childNodes[0].nodeValue));
          strDesc = r_KillChevron(tabItem[j][0].childNodes[0].nodeValue);
          console.log(strDesc);
          target = document.querySelector('div'+i);
          //console.log(target);


          //target.innerHTML += strFinale; Marche, mais bricolage degueux
          target.innerHTML += strDesc; //UNDEFINED DE MERDEEEEE !

          //appel fonction recursive pour virer les chevrons et leur contenu, retourne une chaine de caractere a traiter (decode html)
        }
        var createPara = document.createElement("p");
        var createTextNode = document.createTextNode(tabItem[j][0].childNodes[0].nodeValue);
        createPara.appendChild(createTextNode);
        createDiv.appendChild(createPara);
        getExistDiv.appendChild(createDiv);
      }
    }
  }
  xhr.open("GET", url, "false");
  xhr.send();
}

//var url = 'http://51.255.196.206/greg/testXHR/rss.xml';
var buttonClick = document.querySelector('body button');
buttonClick.addEventListener("click", function(e){
  testOtherDomain('http://51.255.196.206/greg/testXHR/rss.xml');
}, false);
