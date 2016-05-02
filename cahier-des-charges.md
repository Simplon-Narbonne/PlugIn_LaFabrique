#Cahier des charges :
>http://www.manager-go.com/gestion-de-projet/dossiers-methodes/elaborer-un-cdc  
>http://www.lafabriquedunet.fr/blog/exemple-cahier-des-charges-site-internet/


##Presentation :

La fabrique a innovation est un site internet sur lequel :
- Les visiteurs peuvent s'inscrire
- Les utilisateurs (inscrits et connectés) publient des idees d'objets novateurs.
- Sont présenté ces idées sous forme de projets
- Les autres membres vont voter pendant 30 jours.
- Ils peuvent aider à améliorer l'idée.
- Ils contribuent au développement du projet : apparence, nom, prix du produit...
- Il y a une boutique pour acheter les produits ainsi conçuts...
- Les idees sont discutees et notees par les membres de la communaute
- et les plus prometteuses debutent un processus de creation auquel
- chaque membre peut participer.
- Les idees sont discutees et notees par les membres de la communaute
- et les plus prometteuses debutent un processus de creation auquel
- chaque membre peut participer.

La finalite est d'obtenir l'industrialisation puis la commercialisation
du produit a l'issue de laquelle les participants a la conception obtiennent
des royalties sur chaque vente realisee.

**Les utilisateurs doivent etre connectes**

On va travailler pour faire une **extension firefox** pour *la fabrique à innovation*

>*infos ici :*  
>https://developer.mozilla.org/en-US/Add-ons  
>https://wiki.mozilla.org/WebExtensions


###1) problematique

**Les membres doivent etre connectes au site pour voir les nouvelles idees.**

**externaliser les nouveautes en dehors du site,**
- d'abord par un plugin cross-navigateur,
- puis dans l'absolu par une application smartphone capable d'envoyer les notifications a heures fixe

###2) reponse apportee

un module multi-browser style downloadHelper affiche une icone dans la barre de menu et lorsqu'une nouvelle idee est postee sur le site, affiche un compteur du nombre de nouveautes depuis la derniere visite dans le coin inferieur droit de l'icone.

Quand l'utilisateur clique, ca l'envoi sur la page recapitulative des nouveautes.

####v1 : doit gerer les nouvelles idees.

####futur: gerer les commentaires, les projets et toutes les autres formes d'ajout sur le site de la fabrique.
