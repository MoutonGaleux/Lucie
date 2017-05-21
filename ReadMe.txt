
/* ***** ***** ***** ***** ***** ***** */
/*                                     */
/*              ReadMe                 */
/*                                     */
/*       "Dessines ton immeuble"       */
/*                                     */
/*         Copyright MiG 2016          */
/*       (alias Benoit Nocaudie)       */
/*                                     */
/*       Licence Créative Common       */
/*              CC-BY-SA               */
/*                                     */
/* ***** ***** ***** ***** ***** ***** */





	Une page web est constitué
	
- d'un fichier html, qui contient les données (texte et url des "média") et leur organisation. (.html)

- d'un ou plusieurs fichier de style, qui gère les règles d'affichage (.css)

- d'un ou plusieurs fichier de script, qui gère les guirlandes clignotantes (.js)

- de différents fichiers de ressources (photos, musiques, vidéos...), qui sont "appelés" par le .html (ou les .js si on veut "camoufler" le truc)

Chacuns des fichiers (.html, .css, .js, et ressources) sont publiques
(un OS hônnete les télécharge tous dans le cadre d'un enregistrement de la page pour une lecture hors connexion),
et sont accessibles facilement via le navigateur (en gros : click droit -> "Afficher code source")





	Les différents fichiers sources (.html, .css, .js) sont de simples fichiers textes, interprétés par le navigateur
	
Pour les modifier, il suffit donc de les ouvrir dans un éditeur de texte classique (basiquement le NotePad de windaub).

Pour lancer une page web, il suffit de lancer le .html, et le navigateur va lui-même lancer les différents fichiers "ressources" listés dans le .html

Les commentaires (non interprétés par le navigateur) sont écrits

	- .html : 
		<!-- Commentaire -->
		<!-- Commentaire
		sur plusieures lignes -->
		
	- .css :
		/* Commentaire */
		
	- .js :
		// Commentaire
		/* Commentaire */
		/* Commentaire
		sur plusieures lignes */








	/* ***** ***** ***** ***** */
	/*                         */
	/*       index.html        */
	/*                         */
	/* ***** ***** ***** ***** */



	Structure :


- Le bandeau supérieur
( situé entre les balises <header> et </header> )

	contient :

		"rien pour l'instant"

	
- le corps de la page
( situé entre les balises <section class="Diapo"> et </section> )

	contient :

		les photos et leur "légende"
		( situés dans les sous-balises <article class="Photo_Area" id="Photo_xx"> et </article> )
		
			Les photos à proprement parlé
			( situés entre les sous-balises <div class="Photo_Cadre"> et </div> )
				la balise <img src="" class="Photo" id="Photo_xx_img" alt="" />
				- src correspond à l'url complet de la photo (relativement à l'emplacement de index.html)
				- alt est un texte à afficher si la photo est introuvable ou ne peut s'afficher
				
			La "légende"
			( situé entre les sous-balises <p class="Photo_Légende" > et </p> )
				la balise <br> est un saut de ligne

	
- Le bandeau inférieur
( situé entre les balises <footer> et </footer> )

	contient :

		"rien pour l'instant", mais en gros, les infos de contact, les partenaires...




	/* ***** ***** ***** ***** */
	/*                         */
	/*        index.css        */
	/*                         */
	/* ***** ***** ***** ***** */


Il s'agit de la feuille de style générale (couleur, taille, position... des différents éléments des pages)




	Structure :


- Chaque élément a ses propres règles :

		élément
		{
			règle 1;
			règle 2;
		}
		
	élément est soit
		- une balise (sans les <>)
		- une class (avec . devant le nom)
		- une id (avec # devant le nom)
	
	(on peut associer les règles à plusieurs éléments en mettant une virgule et un espace entre eux)
	
		élément_1, élément_2, élément_3
		{
			règle 1;
			règle 2;
		}
		
		
	margine : 0px auto;
		- marge de 0 pixel en haut et en bas, et est automatiquement centré (par rapport à sa balise parent)
		
	background-color : rgb("r","g","b");
		- couleur de fond en RGB ("r"/"g"/"b" : valeur de rouge/vert/bleu entre 0 (inexxistant) et 255 (saturé) )
		
	color : rgb("r","g","b");
		- couleur du texte en RGB
		
	border-radius : 20px 20px;
		- arondi les angles du cadre d'un rayon de courbure de 20 pixel (voir les références pour des options avancées)
		
	display : none; (ou "block")
		- ne pas afficher l'élément (ou l'afficher en tant que "bloque")




	/* ***** ***** ***** ***** ***** */
	/*                               */
	/*        Diapo_nojs.css         */
	/*                               */
	/* ***** ***** ***** ***** ***** */


Il s'agit de la feuille de style gérant les animations dans le cas où le javascript est désactivé
(à ne pas négligé, car vu les saloperies que les sites se permettent via les scripts, pas mal de gens les désactivent)




	Structure :


- Fonctions du diapo (passe d'une transparence nulle à une transparence totale entre le début et la fin de l'annimation)
			
	syntaxe "standard" de l'animation nommée Fondu
	
		@keyframes Fondu
		{
			0%	{filter : opacity(100%)}
			100%	{filter : opacity(0%)}
		}
	
	syntaxe pour les navigateurs qui nécessites des "plugin"
	
		@-webkit-keyframes Fondu 
		{
			0%	{-webkit-filter : opacity(100%);}
			100%	{-webkit-filter : opacity(0%);}
		}
	
	
- Géstion de l'animation pour chaque photos

	#Photo_01
	{
		
		z-index : -2;
		display : block;
		
		animation : Fondu 5s linear 15s forwards;
		
		/* Chrome, Safari, Opera */
		-webkit-animation : Fondu 5s linear 15s forwards;
	}
	
		animation : Fondu 5s linéar 15s forwards;
		
			- Lance l'animation nommée Fondu pendant 5 seconde après avoir attendu 15 secondes
				(avec une transformation temporelle linéaire, et conserve l'état final de l'animation)
				
		z-index : -2;
		
			- détermine le plan d'affichage
				(le premier plan est l'indexe le plus grand, l'arrière plan le plus petit)
				
				
- Gestion du lien hypertexte de fin de Diapo (à la fin)

		@keyframes Lien_Up
		{
			100%	{z-index : 1;}
		}
		/* Chrome, Safari, Opera */ 
		@-webkit-keyframes Lien_Up 
		{
			100%	{z-index : 1;}
		}		
	
	#Photo_FinCss
	{
		z-index : -11;
		display : block;
		
		
		animation : Lien_Up 1s linear 104s forwards;
		
		/* Chrome, Safari, Opera */
		-webkit-animation : Lien_Up 1s linear 104s forwards;
	}
	
	
		- Lance la fonction Lien_Up après 104 secondes, qui fait passer la photo de fin au premier plan en 1 seconde
			(ce qui le rend cliquable)


		
		
		


	/* ***** ***** ***** ***** */
	/*                         */
	/*        Diapo.js         */
	/*                         */
	/* ***** ***** ***** ***** */


Il s'agit de la feuille de scripte gérant le diapo




	Structure :


- Les variables de paramétrage du diapo :
	( c'est avec elles que tu peux jouer ;) )


	/* variables emporelles du diapo /!\ en milliseconde /!\ */
	
		var ntPhoto = 3000;
			var ndtPhoto = ntPhoto / 100;
			
		var ntFondu = ntPhoto * 0.3;	// en "%" de ntPhoto
			var ndtFondu = ntFondu / 100;
			
			
	/* variable pour l'ordre d'affichage des photos */
	
		var cMode = 'a';	// 'c' -> croissant ; 'd' -> décroissant ; 'a' -> aléatoire
		
		
- La classe CDiapo (ses variables et ses fonctions) :

	function CDiapo()
	{
		...
		...
	}

	
- Le programme (ses variables, ses fonctions, et ses "messages") :

	les quelques lignes après 
	
	/* -------------------------------------------- */
	
	
	
	
	/* Main() */
	
	
		/* ".h" */






		




	/* ***** ***** ***** ***** */
	/*                         */
	/*        Enjoy ;)         */
	/*                         */
	/* ***** ***** ***** ***** */	
			
			
			
			
			
			

Pour des infos plus complètes (tutos et références) : 
	http://www.w3schools.com/
(le site de la W3C, organisme chargé des standards du web)

