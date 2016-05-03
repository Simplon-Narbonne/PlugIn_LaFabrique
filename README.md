# PlugIn_LaFabrique

##L'add-on se décline en deux versions.

**fabrique.xpi** :
Cette version assure la persistence des données, c'est la version prod.

**fabrique_dev.xpi** :
Cette version n'est utile qu'à ceux qui veulent comprendre le comportement de l'add-on, sans attendre de news sur le site de [la fabrique à innovations](http://lafabriqueainnovations.com).
Les données sont effacées à chaque lancement du navigateur et les requêtes xhr se font toutes les 10 secondes.

## Installation

*Tant que l'add-on n'est pas officiellement déployé, il faut autoriser Firefox à installer des extensions non-signées.*

Dans la barre d'adresse de firefox, entrez `about:config`

Dans la barre **search** ou **recherche**, entrez `xpinstall.signatures.required`

Double-cliquez sur le résultat pour changer la valeur `true` en `false`

Ensuite depuis la page d'accueil de firefox, faites ctrl+o et pointez vers le fichier .xpi que vous souhaitez installer.
