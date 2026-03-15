# Loto d'Histoire

## Description
Jeu de loto éducatif basé sur des illustrations historiques. Les enfants apprennent les grandes dates de l'histoire de France en jouant (date → événement, événement → date, ordre chronologique).

## Stack technique
- HTML / CSS / JavaScript vanilla (ES modules)
- Style classique (typographie serif, couleurs chaudes, textures parchemin)
- Déploiement : GitHub Pages (branche `main`, dossier racine)
- Tests unitaires : Vitest
- Tests E2E : Playwright
- Pas de bundler

## Architecture DDD
```
src/
  domain/           # Logique métier pure (testable sans DOM)
    cartes.js       # Value objects des événements historiques
    melanger.js     # Mélange aléatoire (Fisher-Yates)
    loto.js         # Règles du mode Loto
    quiz.js         # Règles du mode Quiz
    frise.js        # Règles du mode Frise chronologique
    scoring.js      # Calcul des résultats
    *.spec.js       # Tests unitaires co-localisés
  ui/
    app.js          # Couche de présentation (DOM)
tests/
  e2e/
    features/       # Scénarios Gherkin (BDD)
    *.spec.js       # Tests Playwright
```

## Commandes
- `npm test` : tests unitaires Vitest
- `npm run test:e2e` : tests E2E Playwright
- `npm run test:all` : tous les tests

## Conventions
- Langue du code et des commentaires : français
- Commits en français, format conventionnel
- Pas de framework JS, tout en vanilla ES modules
- Design responsive, mobile-first
- Tests co-localisés avec le code source (.spec.js)
- Le domaine ne dépend jamais du DOM
