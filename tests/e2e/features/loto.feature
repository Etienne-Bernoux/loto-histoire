Feature: Mode Loto classique
  En tant qu'enfant
  Je veux jouer au loto des dates
  Afin d'apprendre à associer les dates aux événements historiques

  Scenario: Lancer une partie de loto
    Given je suis sur la page d'accueil
    When je clique sur le mode "Loto classique"
    Then je vois 9 cartes sur le plateau
    And je vois le bouton "Tirer une date"

  Scenario: Tirer une date et trouver la bonne illustration
    Given une partie de loto est en cours
    When je tire une date
    Then une date s'affiche avec sa description
    When je clique sur la bonne illustration
    Then la carte est marquée comme trouvée
    And le score augmente de 1

  Scenario: Se tromper d'illustration
    Given une partie de loto est en cours
    And une date a été tirée
    When je clique sur une mauvaise illustration
    Then la carte tremble brièvement
    And le score ne change pas
