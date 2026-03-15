# Loto d'Histoire — Spécifications

## Cible

- **Niveau** : CE1-CE2 (7-8 ans), école privée hors contrat, très bon niveau
- **Contexte** : à la maison, usage optionnel, seul ou avec un parent
- **Profil** : anonyme, progression stockée en localStorage

## Intention pédagogique

Rendre ludique la révision des dates de l'histoire de France. L'enfant doit connaître **par cœur** le lien date ↔ événement. Chaque carte propose un contenu de qualité : anecdote + paragraphe explicatif avec sources.

## Contenu

### Cartes

- 27 événements historiques (extensible)
- Chaque carte contient :
  - **Date** (ex: 1515, -52)
  - **Titre** (ex: "Bataille de Marignan")
  - **Image avec date** (fournie)
  - **Image sans date** (à fournir)
  - **Anecdote** : 1-2 phrases accrocheuses
  - **Paragraphe explicatif** : 3-5 phrases de contexte
  - **Source(s)** : site spécialisé (Herodote.net, etc.) ou Wikipédia en dernier recours. Rien d'inventé.

### Validation du contenu

1. Étienne valide en premier
2. L'enseignant dans un second temps

## Modes de jeu

Progression en 3 étapes. L'accès est **libre** (pas d'obligation de suivre l'ordre), mais la progression est encouragée.

### Étape 1 — Découvrir

**Objectif** : explorer les cartes, lire, s'imprégner.

- Navigation libre dans les cartes
- Pour chaque carte : image (avec date), titre, anecdote, paragraphe explicatif
- Pas de mécanisme de jeu, pas de score
- L'enfant peut parcourir à son rythme

### Étape 2 — Associer

**Objectif** : construire le lien date ↔ événement.

Deux sous-modes, alternés aléatoirement :

- **Image → Date** : on montre l'image (sans date) + description → choisir la bonne date parmi 4 propositions
- **Date → Événement** : on montre la date → choisir le bon événement parmi 4 propositions

Paramètres :
- **Nombre de cartes par session** : réglable par l'enfant/parent
- **Répétition espacée** : les cartes ratées reviennent plus souvent

### Étape 3 — Restituer

**Objectif** : restitution pure, sans aide.

Deux sous-modes :

- **Saisie libre** : on montre l'image (sans date) → l'enfant tape la date au clavier. Saisie stricte (ex: "1515", "-52").
- **Frise chronologique** : remettre N cartes (images sans date) dans l'ordre chronologique par glisser-déposer.

Paramètres :
- **Nombre de cartes par session** : réglable
- **Répétition espacée** : les cartes ratées reviennent plus souvent

## Expérience ludique

### Personnage guide

Un explorateur du temps, style "Il était une fois l'Homme". Il accompagne l'enfant tout au long de l'expérience :
- Commente les réussites et les erreurs avec des répliques contextuelles (ex: "François Ier serait fier de toi !")
- Encourage après une erreur (jamais de ton négatif)
- Apparaît visuellement à côté des interactions

### Feedback & récompenses

- **Streaks** : compteur de bonnes réponses consécutives avec messages évolutifs (3 → "Bien joué !", 5 → "En feu !", 10 → "Imbattable !")
- **Étoiles par carte** : chaque carte gagne des étoiles (0 à 3) au fil des réussites. L'enfant voit sa collection se remplir.
- **Déblocage de l'anecdote** : l'anecdote n'est visible qu'après avoir réussi la carte une première fois → effet récompense

### Défi du jour

- 5 cartes tirées aléatoirement chaque jour
- Renouvellement à minuit
- Challenge rapide et quotidien pour ancrer l'habitude

### Mode chrono

- Timer optionnel pour se challenger soi-même
- Record personnel enregistré (localStorage)
- Pas de pression : l'enfant active ou non le chrono

### Progression visuelle

- Une frise qui se remplit au fur et à mesure que les cartes sont maîtrisées
- L'enfant voit l'histoire se construire visuellement
- Les étoiles de chaque carte sont visibles sur la frise

### Sons

- Son satisfaisant sur bonne réponse
- Encouragement sonore sur erreur
- Implémentation prévue ultérieurement (assets à sourcer)

## Répétition espacée

- Une carte est considérée **maîtrisée** après 3 réussites consécutives
- Une carte maîtrisée sort de la rotation fréquente mais **revient rarement** pour consolidation
- Les cartes ratées reviennent en priorité
- La progression est persistée en localStorage

## Contraintes techniques

- HTML / CSS / JavaScript vanilla (ES modules)
- Pas de bundler, pas de framework
- Déploiement GitHub Pages
- Responsive, mobile-first
- Architecture DDD : domaine pur (sans DOM) + couche UI séparée
- Tests unitaires Vitest, tests E2E Playwright

## Points ouverts

- [ ] Liste définitive des 27 dates/événements à valider
- [ ] Images sans date à fournir pour toutes les cartes
- [ ] Contenu (anecdotes + paragraphes) à rechercher et valider par Étienne
- [ ] Design du personnage explorateur du temps
- [ ] Assets sonores à sourcer
