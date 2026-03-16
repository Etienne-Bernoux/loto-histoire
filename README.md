# Loto d'Histoire

Jeu éducatif pour apprendre par cœur les grandes dates de l'histoire de France, destiné aux élèves de CE1-CE2.

## Le concept

Maestro, un sage explorateur du temps, accompagne l'enfant à travers 27 événements historiques. Trois étapes de jeu permettent une progression naturelle : **découvrir**, **associer**, puis **restituer** de mémoire.

Chaque carte propose une image, une anecdote et un paragraphe explicatif sourcé pour donner du sens aux dates.

## Modes de jeu

### Découvrir
Explorer librement les 27 cartes : image, date, titre, anecdote (débloquée après réussite). S'imprégner avant de jouer.

### Associer
Faire le lien date ↔ événement :
- **Quiz** : QCM à 4 choix (image → date ou date → événement)
- **Memory** : retrouver les 6 paires image ↔ titre

### Restituer
Restitution sans aide :
- **Saisie libre** : taper la date exacte au clavier
- **Frise chronologique** : remettre les cartes dans l'ordre par glisser-déposer

## Fonctionnalités

- **Répétition espacée** : les cartes ratées reviennent plus souvent, maîtrise après 3 succès consécutifs
- **Étoiles** : chaque carte gagne jusqu'à 3 étoiles
- **Streaks** : compteur de bonnes réponses consécutives avec encouragements
- **Défi du jour** : 5 cartes renouvelées à minuit
- **Maestro** : personnage guide avec répliques contextuelles
- **Barre de progression** : suivi visuel des cartes maîtrisées et étoiles

## Stack technique

- HTML / CSS / JavaScript vanilla (ES modules)
- Pas de framework, pas de bundler
- Déploiement GitHub Pages

## Lancer le projet

Ouvrir `index.html` dans un navigateur.

## Tests

```bash
npm install
npm test          # Tests unitaires Vitest (116 tests)
npm run test:e2e  # Tests E2E BDD Playwright + Cucumber (36 tests)
npm run test:all  # Tous les tests
```

### Stratégie de tests

- **Unitaires** (Vitest) : logique métier pure, co-localisés avec le code source
- **E2E BDD** (Playwright + Gherkin) : scénarios utilisateur en français via `playwright-bdd`
  - Features Gherkin dans `tests/e2e/features/`
  - Step definitions dans `tests/e2e/steps/`

## Licence

Usage éducatif.
