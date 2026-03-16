/**
 * Domaine — Memory
 * Jeu de paires : associer image+date ↔ titre de l'événement.
 * 6 paires = 12 cartes retournées.
 */
import { melanger } from '../melanger.js';
import { selectionnerCartes } from '../progression/repetition.js';

/**
 * Crée une session Memory.
 * Génère 12 tuiles mélangées (6 paires : image + titre).
 */
export function creerSessionMemory(toutesLesCartes, progression, nbPaires = 6) {
  const ids = selectionnerCartes(progression, toutesLesCartes, nbPaires);
  const cartes = ids.map(id => toutesLesCartes.find(c => c.id === id));

  const tuiles = [];
  for (const carte of cartes) {
    tuiles.push({ id: tuiles.length, carteId: carte.id, type: 'image', contenu: carte.image });
    tuiles.push({ id: tuiles.length, carteId: carte.id, type: 'titre', contenu: carte.titre });
  }

  return {
    tuiles: melanger(tuiles),
    retournees: [],       // indices des tuiles retournées (max 2)
    trouvees: new Set(),  // carteIds trouvés
    coups: 0,
    nbPaires,
  };
}

/**
 * Retourne une tuile. Retourne l'état du coup.
 * - { action: 'premiere' } → première tuile retournée
 * - { action: 'paire', carteId } → paire trouvée
 * - { action: 'echec' } → pas de paire, les deux se retournent
 * - { action: 'ignore' } → tuile déjà retournée ou trouvée
 */
export function retournerTuile(session, tuileIndex) {
  const tuile = session.tuiles[tuileIndex];
  if (!tuile) return { action: 'ignore' };

  // Déjà trouvée
  if (session.trouvees.has(tuile.carteId) && session.retournees.length === 0) {
    return { action: 'ignore' };
  }

  // Déjà retournée
  if (session.retournees.includes(tuileIndex)) {
    return { action: 'ignore' };
  }

  session.retournees.push(tuileIndex);

  // Première tuile
  if (session.retournees.length === 1) {
    return { action: 'premiere' };
  }

  // Deuxième tuile
  session.coups += 1;
  const [idx1, idx2] = session.retournees;
  const tuile1 = session.tuiles[idx1];
  const tuile2 = session.tuiles[idx2];

  if (tuile1.carteId === tuile2.carteId && tuile1.type !== tuile2.type) {
    // Paire trouvée
    session.trouvees.add(tuile1.carteId);
    session.retournees = [];
    return { action: 'paire', carteId: tuile1.carteId };
  }

  // Pas de paire
  return { action: 'echec' };
}

/** Réinitialise les tuiles retournées après un échec */
export function cacherTuiles(session) {
  session.retournees = [];
}

/** Vérifie si la partie est terminée */
export function estTermineMemory(session) {
  return session.trouvees.size >= session.nbPaires;
}

/** Score : nombre de coups (moins = mieux) */
export function scoreMemory(session) {
  return {
    coups: session.coups,
    paires: session.trouvees.size,
    total: session.nbPaires,
  };
}
