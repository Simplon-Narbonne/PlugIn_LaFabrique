# 1 - ajouter le badge sur l'icone (badge = nombre d'article dans la liste)
## 2 - sur clic, efface la div parente du lien et son contenu
### 3 - sauvegarder les infos des articles deja vus dans le local storage
#### 4 - empecher l'affichage des articles deja vus/cliqués
##### 5 - refaire le back end :
#####       - xhr running on background
#####       - check periodique avec setInterval
###### 6 - trouver le moyen de ne pas saturer le serveur avec les requetes xhr (sorte de cache)


/*

stocke 2 xml dans le localStorage --


 A ------  A
\/        \/
(si localStorage=>items == vide, toutes les divs ont etees cliquees, donc on fait une div par defaut dans html)

je dois pas parser et afficher directement le xml mais extraire les donnees dans le localStorage, comme ca je peux detruire les donnees du localStorage plutot que de reparser le xml avec des conditions de tares.

peut-etre mettre les donnees dans un tableau associatif da localStorage:

item =>
    date => article 1
    date => article 2

    et comparaison des dates pour voir si l'article existe deja
    attribution de l'ID une fois qu'on est sur que l'article n'existe pas deja

dans l'article, rajoute un compteur

ou utiliser du json



au demarrage:

appel du xhr pour recup pf_originXML si pf_originXML n'existe pas dans le localStorage, sinon recup newestXML
appel du setInterval pour recup newestXML
    si pf_originXML == newestXML
        ne fais rien

    sinon
        on remplace le xml plus ancien par le nouveau
        on parse le nouveau.
        on compare les articles par date dans le [tabAssociatif]-> item du localStorage
        si un <item> est deja present dans le localStorage on skip
        sinon on l'ajoute au localStorage
        {{ voir comment trier ou afficher les items par la date ou leur numero unique }}
        si nb_article > 3, 4, 5 ou plus
            virer article plus anciens, par date ou par ID le plus petit (donc plus ancien)



-----------------
on pourrait avoir un seul xml dans le localStorage et le decouper en stockant les <items> dans le localStorage eux aussi. les articles persisteraient jusqu'au clic ou jusqu'a ce qu'ils soient degages par de nouveaux articles dont le nombre reste a definir. mais du coup si tous les articles sont cliques, impossible de savoir s'il doit tout reafficher... mauvaise piste.

_______________________________________________________________________________
|__  Refaire le badge pour qu'il compte le nombre d'item dans localStorage  __|


--------------------------------------------------------------------------------

*/
