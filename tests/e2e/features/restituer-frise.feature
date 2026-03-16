# language: fr
Fonctionnalité: Étape 3 — Restituer (Frise chronologique)

  Scénario: Lancer le mode Frise
    Étant donné que je suis sur l'écran Restituer
    Quand je clique sur "Frise chronologique"
    Alors je vois la consigne "Place les événements dans l'ordre chronologique"
    Et je vois 6 slots numérotés vides
    Et je vois 6 cartes en réserve
    Et je vois le compteur "0 / 6 placés"

  Scénario: Placer une carte dans un slot (drag & drop)
    Étant donné que la frise est en cours
    Quand je glisse une carte sur un slot
    Alors la carte apparaît dans le slot
    Et la carte disparaît de la réserve
    Et le compteur de cartes placées s'incrémente

  Scénario: Placer une carte dans un slot occupé
    Étant donné qu'un slot contient déjà une carte
    Quand je glisse une nouvelle carte sur ce slot
    Alors la nouvelle carte remplace l'ancienne
    Et l'ancienne carte retourne en réserve

  Scénario: Retirer une carte d'un slot
    Étant donné qu'une carte est placée dans un slot
    Quand je clique sur la carte dans le slot
    Alors la carte retourne en réserve
    Et le slot redevient vide

  Scénario: Valider un ordre correct
    Étant donné que toutes les cartes sont placées dans le bon ordre
    Quand je clique sur "Valider l'ordre"
    Alors toutes les cartes passent en vert
    Et je vois l'écran de fin avec un score parfait

  Scénario: Valider un ordre incorrect
    Étant donné que les cartes sont placées dans le mauvais ordre
    Quand je clique sur "Valider l'ordre"
    Alors les cartes bien placées sont en vert
    Et les cartes mal placées sont en rouge

  Scénario: Bouton valider caché si la frise est incomplète
    Étant donné que la frise n'est pas complète
    Alors le bouton "Valider l'ordre" est caché

