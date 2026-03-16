# Loto d'Histoire

## Description
Jeu éducatif pour apprendre par cœur les grandes dates de l'histoire de France (CE1-CE2). Progression en 3 étapes : Découvrir → Associer → Restituer, avec répétition espacée et éléments ludiques.

## Stack technique
- HTML / CSS / JavaScript vanilla (ES modules)
- Style classique (typographie serif, couleurs chaudes, textures parchemin)
- Déploiement : GitHub Pages (branche `main`, dossier racine)
- Tests unitaires : Vitest (116 tests)
- Tests E2E : Playwright + playwright-bdd (Gherkin/Cucumber) (36 tests)
- Pas de bundler

## Architecture DDD
```
src/
  domain/
    cartes/
      cartes.js           # Données des 27 événements historiques
    jeu/
      associer.js         # Logique QCM (image→date, date→événement)
      memory.js           # Logique memory (paires image↔titre)
      restituer.js        # Logique saisie libre + frise chronologique
    progression/
      repetition.js       # Répétition espacée (sélection + enregistrement)
      persistence.js      # Lecture/écriture localStorage
      etoiles.js          # Étoiles par carte (0-3)
      streaks.js          # Séries de bonnes réponses
    ludique/
      personnage.js       # Répliques du personnage Maestro
      defi-du-jour.js     # 5 cartes quotidiennes déterministes
      chrono.js           # Timer optionnel + record
    melanger.js           # Fisher-Yates shuffle
    **/*.spec.js          # Tests unitaires co-localisés
  ui/
    app.js                # Shell de navigation
    decouvrir.js          # UI étape 1
    associer.js           # UI étape 2 (choix quiz/memory)
    memory.js             # UI memory (flip 3D)
    restituer.js          # UI étape 3 (saisie + frise)
    progression.js        # Barre de progression accueil
    personnage-ui.js      # Affichage Maestro + bulle
tests/
  e2e/
    features/             # Scénarios Gherkin en français (BDD)
    steps/                # Step definitions Playwright
```

## Stratégie de tests

### Tests unitaires (Vitest)
- Co-localisés avec le code source (`*.spec.js` à côté du fichier testé)
- Couvrent la logique métier pure (domaine)
- Pas de DOM, pas de dépendances externes
- `npm test` pour lancer

### Tests E2E (Playwright + Cucumber/Gherkin)
- **Features** en Gherkin français (`# language: fr`) dans `tests/e2e/features/`
- **Step definitions** dans `tests/e2e/steps/` — un fichier par feature
- Branchement via `playwright-bdd` : les features génèrent des tests Playwright
- Génération : `npx bddgen` (automatique au lancement)
- 6 features : accueil, découvrir, associer-quiz, associer-memory, restituer-saisie, restituer-frise
- `npm run test:e2e` pour lancer

### Convention BDD
- Les features sont rédigées en français avec `# language: fr`
- Les steps n'incluent PAS le `que` (Gherkin le gère via `Étant donné que`)
- Les `qu'` (contractions) sont aussi retirés des step patterns
- Un step partagé entre features est défini dans un seul fichier steps

## Commandes
- `npm test` : tests unitaires Vitest
- `npm run test:e2e` : tests E2E Playwright/BDD
- `npm run test:all` : tous les tests

## Conventions
- Langue du code et des commentaires : français
- Commits en français, format conventionnel
- Pas de framework JS, tout en vanilla ES modules
- Design responsive, mobile-first
- Tests co-localisés avec le code source (.spec.js)
- Le domaine ne dépend jamais du DOM
- Images nommées `carte_{id sur 2 chiffres}.png` (id = id de la carte)
- Champs cartes : `id`, `date`, `dateTexte`, `titre`, `description`, `anecdote`, `paragraphe`, `sources`
- Les sources (URLs herodote.net) sont stockées dans les données mais jamais affichées à l'enfant
