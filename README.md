# Loto d'Histoire

Jeu éducatif pour apprendre par cœur les grandes dates de l'histoire de France, destiné aux élèves de CE1-CE2.

## Le concept

Un explorateur du temps accompagne l'enfant à travers 27 événements historiques. Trois étapes de jeu permettent une progression naturelle : **découvrir**, **associer**, puis **restituer** de mémoire.

Chaque carte propose une image, une anecdote et un paragraphe explicatif sourcé pour donner du sens aux dates.

## Modes de jeu

### Découvrir
Explorer librement les cartes : image, date, titre, anecdote. S'imprégner avant de jouer.

### Associer
Faire le lien date ↔ événement via des QCM à 4 choix :
- Image → quelle date ?
- Date → quel événement ?

### Restituer
Restitution sans aide :
- Taper la date exacte au clavier
- Remettre des cartes dans l'ordre chronologique sur une frise

## Fonctionnalités

- **Répétition espacée** : les cartes ratées reviennent plus souvent
- **Étoiles** : chaque carte gagne jusqu'à 3 étoiles
- **Streaks** : compteur de bonnes réponses consécutives
- **Défi du jour** : 5 cartes aléatoires renouvelées à minuit
- **Mode chrono** : timer optionnel avec record personnel
- **Frise de progression** : l'histoire se construit visuellement au fil de l'apprentissage

## Stack technique

- HTML / CSS / JavaScript vanilla (ES modules)
- Pas de framework, pas de bundler
- Déploiement GitHub Pages

## Lancer le projet

Ouvrir `index.html` dans un navigateur.

## Tests

```bash
npm install
npm test          # Tests unitaires (Vitest)
npm run test:e2e  # Tests E2E (Playwright)
npm run test:all  # Tous les tests
```

## Licence

Usage éducatif.
