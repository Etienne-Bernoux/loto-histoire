# language: fr
Fonctionnalité: Étape 3 — Restituer (Saisie libre)

  Scénario: Lancer le mode Saisie libre
    Étant donné que je suis sur l'écran Restituer
    Quand je clique sur "Saisie libre"
    Alors je vois une image sans date
    Et je vois la description de l'événement
    Et je vois un champ de saisie avec le placeholder "ex: 1515"
    Et je vois le bouton "Valider"

  Scénario: Saisir la bonne date
    Étant donné que je suis sur une question de saisie
    Quand je tape la bonne date et valide
    Alors le champ passe en vert
    Et je vois "Bravo !"
    Et Maestro me félicite
    Et le bouton "Suivant" apparaît

  Scénario: Saisir une mauvaise date
    Étant donné que je suis sur une question de saisie
    Quand je tape une mauvaise date et valide
    Alors le champ passe en rouge
    Et je vois la bonne réponse avec la date attendue
    Et Maestro m'encourage

  Scénario: Valider avec la touche Entrée
    Étant donné que je suis sur une question de saisie
    Quand je tape une date et appuie sur Entrée
    Alors la réponse est validée

  Scénario: Saisie stricte des dates négatives
    Étant donné que la carte attendue est "52 av. J.-C."
    Quand je tape "-52" et valide
    Alors la réponse est correcte

  Scénario: Saisie vide ignorée
    Étant donné que je suis sur une question de saisie
    Quand je clique sur "Valider" sans rien taper
    Alors rien ne se passe

  Scénario: Fin de la saisie libre
    Étant donné que j'ai répondu à toutes les questions
    Alors je vois l'écran de fin avec mon score
