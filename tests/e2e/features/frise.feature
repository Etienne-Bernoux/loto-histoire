Feature: Mode Frise chronologique
  En tant qu'enfant
  Je veux placer des événements dans l'ordre chronologique
  Afin d'apprendre à situer les événements dans le temps

  Scenario: Lancer une frise
    Given je suis sur la page d'accueil
    When je clique sur le mode "Frise chronologique"
    Then je vois 6 emplacements vides sur la frise
    And je vois 6 cartes à placer

  Scenario: Valider un ordre correct
    Given tous les événements sont placés dans le bon ordre
    When je clique sur "Valider l'ordre"
    Then toutes les cartes sont marquées en vert
    And l'écran de fin affiche "Parfait !"

  Scenario: Valider un ordre partiellement correct
    Given certains événements sont mal placés
    When je clique sur "Valider l'ordre"
    Then les cartes bien placées sont en vert
    And les cartes mal placées sont en rouge
