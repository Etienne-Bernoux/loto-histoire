# language: fr
Fonctionnalité: Écran d'accueil

  Scénario: Affichage de l'accueil au chargement
    Étant donné que j'ouvre l'application
    Alors je vois le titre "Loto d'Histoire"
    Et je vois Maestro avec un message d'accueil
    Et je vois le défi du jour avec 5 cartes
    Et je vois les 3 boutons d'étapes "Découvrir", "Associer", "Restituer"
    Et je vois la barre de progression

  Scénario: Navigation vers Découvrir
    Étant donné que je suis sur l'accueil
    Quand je clique sur "Découvrir"
    Alors je vois l'écran Découvrir avec la grille de cartes

  Scénario: Navigation vers Associer
    Étant donné que je suis sur l'accueil
    Quand je clique sur "Associer"
    Alors je vois le choix entre "Quiz" et "Memory"

  Scénario: Navigation vers Restituer
    Étant donné que je suis sur l'accueil
    Quand je clique sur "Restituer"
    Alors je vois le choix entre "Saisie libre" et "Frise chronologique"

  Scénario: Retour à l'accueil depuis une étape
    Étant donné que je suis sur l'écran Découvrir
    Quand je clique sur "Retour"
    Alors je vois l'écran d'accueil
