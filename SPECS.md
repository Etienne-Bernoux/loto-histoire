# Loto d'Histoire — Spécifications

## Cible

- **Niveau** : CE1-CE2 (7-8 ans), école privée hors contrat, très bon niveau
- **Contexte** : à la maison, usage optionnel, seul ou avec un parent
- **Profil** : anonyme, progression stockée en localStorage

## Intention pédagogique

Rendre ludique la révision des dates de l'histoire de France. L'enfant doit connaître **par cœur** le lien date ↔ événement. Chaque carte propose un contenu de qualité : anecdote + paragraphe explicatif avec sources (non affichées à l'enfant).

## Contenu

### Cartes

- 27 événements historiques (extensible)
- Chaque carte contient :
  - **id** : identifiant unique
  - **date** : valeur numérique (ex: 1515, -52)
  - **dateTexte** : date affichée (ex: "1515", "52 av. J.-C.")
  - **titre** : nom de l'événement (ex: "Bataille de Marignan")
  - **description** : phrase descriptive complète
  - **Image avec date** : `images/avec_date/carte_{id}.png`
  - **Image sans date** : `images/sans_date/carte_{id}.png`
  - **Anecdote** : 1-2 phrases accrocheuses (débloquée après première réussite)
  - **Paragraphe explicatif** : 3-5 phrases de contexte pour enfants
  - **Source(s)** : herodote.net (stockées mais non affichées)

### Validation du contenu

1. Étienne valide en premier
2. L'enseignant dans un second temps

## Modes de jeu

Progression en 3 étapes. L'accès est **libre** (pas d'obligation de suivre l'ordre), mais la progression est encouragée.

### Étape 1 — Découvrir

**Objectif** : explorer les cartes, lire, s'imprégner.

- Grille de 27 cartes (date + titre sous chaque vignette)
- Vue détail : image, date, titre, description, anecdote (si débloquée), paragraphe
- Navigation précédent/suivant avec compteur
- Pas de mécanisme de jeu, pas de score

### Étape 2 — Associer

**Objectif** : construire le lien date ↔ événement.

Trois sous-modes au choix :

- **Quiz (QCM)** : deux types de questions alternés aléatoirement
  - Image (sans date) + description → choisir la bonne date parmi 4
  - Date affichée → choisir le bon événement parmi 4
- **Memory** : 6 paires (12 tuiles) — associer image avec date ↔ titre de l'événement

Paramètres :
- **Nombre de cartes par session** : réglable (défaut : 10 pour quiz, 6 paires pour memory)
- **Répétition espacée** : les cartes ratées reviennent plus souvent

### Étape 3 — Restituer

**Objectif** : restitution pure, sans aide.

Deux sous-modes au choix :

- **Saisie libre** : image (sans date) → taper la date au clavier. Saisie stricte (ex: "1515", "-52").
- **Frise chronologique** : remettre N cartes (images sans date) dans l'ordre chronologique par glisser-déposer.

Paramètres :
- **Nombre de cartes par session** : réglable (défaut : 6)
- **Répétition espacée** : les cartes ratées reviennent plus souvent

## Expérience ludique

### Personnage guide — Maestro

Un sage explorateur du temps, style "Il était une fois l'Homme" (SVG). Il accompagne l'enfant :
- Commente les réussites avec des répliques contextuelles
- Encourage après une erreur (jamais de ton négatif)
- Apparaît en bas à gauche avec une bulle de dialogue

### Feedback & récompenses

- **Streaks** : compteur de bonnes réponses consécutives (3 → "Bien joué !", 5 → "En feu !", 10 → "Imbattable !")
- **Étoiles par carte** : 0 à 3 étoiles basées sur les succès consécutifs
- **Déblocage de l'anecdote** : visible qu'après avoir réussi la carte une première fois

### Défi du jour

- 5 cartes tirées de façon déterministe (seed = date du jour)
- Renouvellement à minuit
- Affiché sur l'accueil avec un bouton "Jouer le défi"

### Mode chrono

- Timer optionnel pour se challenger soi-même
- Record personnel enregistré (localStorage)

### Accueil

Ordre des éléments :
1. Maestro + message contextuel (adapté à la progression)
2. Défi du jour (5 vignettes + bouton jouer)
3. Choix des 3 étapes (Découvrir, Associer, Restituer)
4. Stats rapides (série en cours, meilleure série, cartes maîtrisées)
5. Barre de progression (cartes maîtrisées + étoiles)

### Sons

- Son satisfaisant sur bonne réponse
- Encouragement sonore sur erreur
- Implémentation prévue ultérieurement (assets à sourcer)

## Répétition espacée

- Carte **maîtrisée** après 3 réussites consécutives
- Carte maîtrisée sort de la rotation fréquente mais **revient rarement** pour consolidation
- Intervalles de consolidation : 1 jour → 3 jours → 7 jours → 14 jours
- Échec en consolidation remet la carte en rotation active
- Priorité de sélection : échouées > jamais vues > consolidation > non maîtrisées
- Persisté en localStorage

## Stratégie de tests

### Tests unitaires (Vitest) — 116 tests
- Co-localisés (`*.spec.js` à côté du fichier testé)
- Couvrent toute la logique métier du domaine
- `npm test`

### Tests E2E BDD (Playwright + Cucumber) — 36 tests
- Features Gherkin en français (`# language: fr`)
- Step definitions liées via `playwright-bdd`
- 6 features couvrant tous les scénarios utilisateur :
  - `accueil.feature` (5 scénarios)
  - `decouvrir.feature` (5 scénarios)
  - `associer-quiz.feature` (7 scénarios)
  - `associer-memory.feature` (5 scénarios)
  - `restituer-saisie.feature` (7 scénarios)
  - `restituer-frise.feature` (7 scénarios)
- `npm run test:e2e`

## Contraintes techniques

- HTML / CSS / JavaScript vanilla (ES modules)
- Pas de bundler, pas de framework
- Déploiement GitHub Pages
- Responsive, mobile-first
- Architecture DDD : domaine pur (sans DOM) + couche UI séparée

## Points ouverts

- [ ] Assets sonores à sourcer
- [ ] Contenu à valider par l'enseignant
