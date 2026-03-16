# language: fr
Fonctionnalité: Étape 2 — Associer (Quiz)

  Scénario: Lancer le mode Quiz
    Étant donné que je suis sur l'écran Associer
    Quand je clique sur "Quiz"
    Alors je vois une question avec 4 propositions
    Et je vois le compteur "Question 1 / 10"

  Scénario: Répondre correctement
    Étant donné que je suis sur une question du quiz
    Quand je clique sur la bonne réponse
    Alors le bouton correct est vert
    Et je vois le message "Bravo ! Bonne réponse !"
    Et le personnage Maestro apparaît avec un commentaire
    Et le bouton "Question suivante" apparaît

  Scénario: Répondre incorrectement
    Étant donné que je suis sur une question du quiz
    Quand je clique sur une mauvaise réponse
    Alors le bouton choisi est rouge
    Et le bon bouton est vert
    Et je vois la bonne réponse avec la date et le titre
    Et le personnage Maestro encourage

  Scénario: Passer à la question suivante
    Étant donné que j'ai répondu à une question
    Quand je clique sur "Question suivante"
    Alors je vois une nouvelle question
    Et le compteur s'incrémente

  Scénario: Fin du quiz
    Étant donné que j'ai répondu à toutes les questions
    Alors je vois l'écran de fin avec mon score

  Scénario: Mode image vers date
    Étant donné que la question est en mode image→date
    Alors je vois l'image sans date
    Et je vois la description de l'événement
    Et les 4 propositions sont des dates

  Scénario: Mode date vers événement
    Étant donné que la question est en mode date→événement
    Alors je vois la date en grand
    Et les 4 propositions sont des descriptions d'événements
