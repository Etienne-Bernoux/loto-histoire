Feature: Mode Quiz
  En tant qu'enfant
  Je veux répondre à un quiz sur les dates
  Afin de tester mes connaissances sur les événements historiques

  Scenario: Lancer un quiz
    Given je suis sur la page d'accueil
    When je clique sur le mode "Quiz"
    Then je vois une illustration
    And je vois 4 propositions de réponse

  Scenario: Répondre correctement
    Given une question de quiz est affichée
    When je clique sur la bonne réponse
    Then un message de succès s'affiche
    And le score augmente

  Scenario: Répondre incorrectement
    Given une question de quiz est affichée
    When je clique sur une mauvaise réponse
    Then un message d'erreur s'affiche avec la bonne réponse
    And le score ne change pas
