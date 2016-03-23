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
