# language: fr
Fonctionnalité: Étape 1 — Découvrir

  Scénario: Affichage de la grille de cartes
    Étant donné que je lance l'étape Découvrir
    Alors je vois une grille de 27 cartes
    Et chaque carte affiche une date et un titre

  Scénario: Ouvrir le détail d'une carte
    Étant donné que je suis sur la grille Découvrir
    Quand je clique sur une carte
    Alors je vois l'image de la carte en grand
    Et je vois la date et le titre de l'événement
    Et je vois la description
    Et je vois le paragraphe explicatif
    Et le bouton "Retour" ramène à la grille

  Scénario: Navigation entre les cartes en vue détail
    Étant donné que je suis sur le détail d'une carte
    Quand je clique sur la flèche suivante
    Alors je vois la carte suivante
    Et le compteur affiche la position correcte

  Scénario: Anecdote verrouillée avant première réussite
    Étant donné que je n'ai jamais réussi la carte
    Quand je consulte son détail
    Alors l'anecdote affiche "Réussis cette carte pour débloquer l'anecdote !"

  Scénario: Un seul bouton retour en vue détail
    Étant donné que je suis sur le détail d'une carte
    Alors je vois un seul bouton "Retour"
    Et le bouton retour ramène à la grille, pas à l'accueil
