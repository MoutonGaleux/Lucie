
/* -------------------------------------------- */
	/* 
		scripts pour le Diaporama
	*/
/* -------------------------------------------- */


	// Variables de paramétrage
	

		/* variables emporelles du diapo /!\ en milliseconde /!\ */
		
			var ntPhoto = 3000;
				var ndtPhoto = ntPhoto / 100;
				
			var ntFondu = ntPhoto * 0.5;	// en "%" de ntPhoto
				var ndtFondu = ntFondu / 100;
				
				
		/* variable pour l'ordre d'affichage des photos */
		
			var cMode = 'a';	// 'c' -> croissant ; 'd' -> décroissant ; 'a' -> aléatoire
			
			
			
			
	// variables du programme
			
			
		/* variables Timer */
		
			var Timer_Diapo;
			var Timer_Fondu;
			
			
		/* Variables de contrôle */
		
			var bDiapo_on = true;	// true : diapo en cours ; false : diapo en pause
			
			var bImg_FullScrean = false;	// true : photo en plein écran ; false : photo "miniature"
			var bImg_FullSize = false;	// true : photo en taille ; false : photo "miniature"

			
			
			
	/* classe CDiapo */
	
		function CDiapo()
		{
			
			
			/* Données membres (private) */
			
			
					// Récupération des Photos
					
				var m_pPhotos = document.getElementsByClassName("Photo_Area");
				
				
					// Gestion des Photos
				
				var m_nNbPhotos = m_pPhotos.length;
				
				var m_pPhoto_Old = null;
				var m_pPhoto_Prev = null;
				var m_pPhoto_Next = null;
				
				var m_nPhotoCounter = 1;
				
				var m_PhotoOpacity = 1;
				
				
			
				/* ---------- ---------- */
				
				
				
				
				/* fonctions membres (.h) */
				
				
					// Initialisation au chargement
				
				this.Init = Init;
				this.Tri = Tri;
					this.Tri_Croissant = Tri_Croissant;
					this.Tri_Decroissant = Tri_Decroissant;
						this.idNb = idNb;
					this.Tri_Aleatoire = Tri_Aleatoire;
						this.Randomize = Randomize;
				
				
					// Gestion des photos visibles
					
				this.Set_Photos = Set_Photos;
					this.Set_Photos_Visibles = Set_Photos_Visibles;
					this.Set_Photos_Diasplay = Set_Photos_Diasplay;
				
				
					// Fonctions Diapo
				
				this.Fondu = Fondu;
					this.Fondu_Play = Fondu_Play;
					this.Fondu_Pause = Fondu_Pause;
				
				
				/* ---------- ---------- */
				
				
				
				
				/* fonctions membres (.cpp) */
			
			
					/* Initialisation au chargement */
					
					
						function Init()
						{
							
								// trie l'ordre d'apparition des photos
							
							Tri();
							
							
								// Attribution des Photos
							
							m_pPhoto_Prev = m_pPhotos[0];
							m_pPhoto_Next = m_pPhotos[1];
							
								// Change le display des photos
							
							m_pPhoto_Prev.style.display = "block";
							m_pPhoto_Next.style.display = "block";
							
								// Attribution des ordres de placement (plus grand = plus devant)
							
							m_pPhoto_Prev.style.zIndex = "1";
							m_pPhoto_Next.style.zIndex = "0";
							
						}
						
						
						function Tri()
						{
							
								// trie l'ordre d'apparition des photos
							
							if(cMode === 'c')
							{
								Tri_Croissant();
							}
							else if(cMode === 'd')
							{
								Tri_Decroissant();
							}
							else if(cMode === 'a')
							{
								Tri_Aleatoire();
							}
							
						}
						
						
							function Tri_Croissant()
							{
								
									// récupération des "Photos"
								
								var pPhotos = new Array();
								
								for(var i=0; i<m_nNbPhotos; i++)
								{
									pPhotos[i] = m_pPhotos[i];
								}
								
								
									// tri croissant des "nombres"
								
								pPhotos.sort( function(a, b) {return idNb(a) > idNb(b)} );
								
								
								m_pPhotos = pPhotos;
								
							}
							
							
							function Tri_Decroissant()
							{
								
									// récupération des "Photos"
								
								var pPhotos = new Array();
								
								for(var i=0; i<m_nNbPhotos; i++)
								{
									pPhotos[i] = m_pPhotos[i];
								}
								
								
									// tri décroissant des "nombres"
								
								pPhotos.sort( function(a, b) {return idNb(a) < idNb(b)} );
								
								
								m_pPhotos = pPhotos;
								
							}
							
							
								function idNb(element)
								{
									
										// renvois un string de l'id de "element" amputé des 5 premiers caractères
									
									return element.id.slice(6);
									
								}
							
							
							function Tri_Aleatoire()
							{
								
									// récupération des "Photos"
								
								var pPhotos = new Array();
								
								
									//  copie de m_pPhotos dans pRand
								
								var pRand = new Array();
								
								for(var i=0; i<m_nNbPhotos; i++)
								{
									pRand[i] = m_pPhotos[i];
								}
								
								
									// tri aléatoire des "Photos"
								
								var nRand;
								
									// parcours de pPhoto (ordre normal
								for(var i=0; i<m_nNbPhotos; i++)
								{
										// choix random de l'index de pRand
									nRand = Randomize(pRand.length);
									
										// mise de la photo random dans pPhotos
									pPhotos[i] = pRand[nRand];
									
										// suppression de la photo random dans pRand
									pRand.splice(nRand, 1);
								}
								
								
								m_pPhotos = pPhotos;
								
								delete pRand;
								
							}
							
							
								function Randomize(nMax_exclu)
								{
									
									return Math.floor(Math.random() * nMax_exclu);
									
								}
						
						
					/* ---------- */
			
			
					/* Gestion des photos visibles */
						
						
						function Set_Photos()
						{
							
							Set_Photos_Visibles();
							
							Set_Photos_Diasplay();
							
						}
					
					
							function Set_Photos_Visibles()
							{
								
									// Compteur des photos
								
								m_nPhotoCounter += 1;
								
								if(m_nPhotoCounter == m_nNbPhotos)
								{
									m_nPhotoCounter = 0;
								}
								
								
									// Attribution des photos
								
								m_pPhoto_Old = m_pPhoto_Prev;
								m_pPhoto_Prev = m_pPhoto_Next;;
								m_pPhoto_Next = m_pPhotos[m_nPhotoCounter];
								
								
									// Attribution des ordres de placement (plus grand = plus devant)
								
								m_pPhoto_Old.style.zIndex = "-1";
								m_pPhoto_Prev.style.zIndex = "1";
								m_pPhoto_Next.style.zIndex = "0";
								
							}
							
							
							function Set_Photos_Diasplay()
							{
								
									// Change le display des photos
								
								m_pPhoto_Old.style.display = "none";
								m_pPhoto_Old.style.opacity = 1;
								
								m_pPhoto_Next.style.display = "block";
								
							}
						
						
					/* ---------- */
			
			
					/* Diapo */
					
					
						function Fondu()
						{
								
							if (m_PhotoOpacity <= 0)
							{
								clearInterval(Timer_Fondu);
								
								Set_Photos();
							}
							else
							{
								m_PhotoOpacity -= 0.01; 
								m_pPhoto_Prev.style.opacity = m_PhotoOpacity; 
							}
							
						}
						
						
							function Fondu_Play()
							{
								
								m_PhotoOpacity = 1;
								
								Timer_Fondu = setInterval(Fondu, ndtFondu);
								
							}
							
							
							function Fondu_Pause()
							{
								
								clearInterval(Timer_Fondu);
								
								m_pPhoto_Prev.style.opacity = 1;
								
							}
						
						
					/* ---------- */
				
				
				/* ---------- ---------- */
				
			
			
			
		}
		
		
	/* -------------------------------------------- */
	
	
	
	
	/* Main() */
	
	
		/* ".h" */
		
			
			// récupération de toutes le Photos
			
		var pImg = document.getElementsByClassName("Photo");
			
			
			// Fonctions du Diapo
		
		function Diapo_on()
		{
			
			var Diapo_Count = 100;
			
			Timer_Diapo = setInterval(Diapo.Fondu_Play, ntPhoto);
			
			if(Diapo_Count <= 0)
			{
				clearInterval(Timer_Diapo);
			}
			else
			{
				Diapo_Count -= 1;
			}
		}
		
		function Diapo_off()
		{
			clearInterval(Timer_Diapo);
			
			Diapo.Fondu_Pause();
		}
	
			

		// initialisation
		
			Diapo = new CDiapo();
			Diapo.Init();
			
			
		//	Lancement du Diapo
			
//			Diapo_on();
			
	
		// réception des messages DOM
			
			for (var i = 0; i < pImg.length; i++)
			{
					// Sourris arrive sur img
				pImg[i].addEventListener("mouseover", Diapo_off, true);
				
					// Sourris sort de img
				pImg[i].addEventListener("mouseout", Diapo_on, true);
				
					// click sur bouton brething
// 				pImg[i].addEventListener("click", Img_Full, true);
			}
			
			this.addEventListener("focus", Diapo_on);
			this.addEventListener("blur", Diapo_off);
			
			
	
	/* -------------------------------------------- */

		
	
	
/* -------------------------------------------- */
	/*
	*/
/* -------------------------------------------- */
	
		
		













		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		