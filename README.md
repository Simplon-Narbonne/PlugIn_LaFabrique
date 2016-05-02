# PlugIn_LaFabrique


[TOC]



##L'add-on se décline en deux versions.

++**fabrique.xpi**++ :
Cette version assure la persistence des données, c'est la version release.

++**fabrique_dev.xpi**++ :
Cette version efface les données dès que le navigateur est fermé. Elle permet d'étudier le comportement de l'add-on sans attendre des news sur le site de [la fabrique à innovations](http://lafabriqueainnovations.com) et n'est utile qu'à ceux qui veulent mettre les mains dans le camboui.

## Installation

*Tant que l'add-on n'est pas officiellement déployé, il faut autoriser Firefox à installer des extensions non-signées.*

Dans la barre d'adresse de firefox, entrez `about:config`

Dans la barre **search** ou **recherche**, entrez `xpinstall.signatures.required`

Double-cliquez sur le résultat pour changer la valeur `true` en `false`

Ensuite depuis la page d'accueil de firefox, faites ctrl+o et pointez vers le fichier .xpi que vous souhaitez installer.



## Annexes
> [voici le cahier des charges](https://github.com/Simplon-Narbonne/PlugIn_LaFabrique/blob/master/cahier-des-charges.md)
