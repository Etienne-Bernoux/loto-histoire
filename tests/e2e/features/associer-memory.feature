# language: fr
Fonctionnalité: Étape 2 — Associer (Memory)

  Scénario: Lancer le mode Memory
    Étant donné que je suis sur l'écran Associer
    Quand je clique sur "Memory"
    Alors je vois une grille de 12 tuiles retournées
    Et je vois le compteur "Coups : 0"
    Et je vois le compteur "Paires : 0 / 6"

  Scénario: Retourner une tuile
    Étant donné que le memory est en cours
    Quand je clique sur une tuile
    Alors la tuile se retourne avec une animation flip
    Et je vois soit une image soit un titre d'événement

  Scénario: Trouver une paire
    Étant donné que j'ai retourné une tuile image
    Quand je retourne la tuile titre correspondante
    Alors les deux tuiles restent visibles
    Et elles sont marquées comme trouvées (bordure verte)
    Et le compteur de paires s'incrémente
    Et Maestro me félicite

  Scénario: Échouer une paire
    Étant donné que j'ai retourné une tuile
    Quand je retourne une tuile qui ne correspond pas
    Alors les deux tuiles se retournent face cachée après un délai
    Et le compteur de coups s'incrémente

  Scénario: Impossible de cliquer pendant le retournement
    Étant donné que deux tuiles non-paires sont visibles
    Quand je clique sur une autre tuile pendant le délai
    Alors rien ne se passe
