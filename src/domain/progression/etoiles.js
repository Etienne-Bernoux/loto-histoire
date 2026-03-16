/**
 * Domaine — Étoiles par carte (0 à 3)
 * Basé sur le nombre de succès consécutifs dans la progression.
 */

/** Calcule le nombre d'étoiles pour une carte */
export function calculerEtoiles(etatCarte) {
  return Math.min(3, etatCarte.successConsecutifs);
}

/** Calcule le total d'étoiles sur toutes les cartes */
export function totalEtoiles(progression) {
  let total = 0;
  for (const id in progression.cartes) {
    total += calculerEtoiles(progression.cartes[id]);
  }
  return total;
}

/** Nombre maximum d'étoiles possibles */
export function maxEtoiles(progression) {
  return Object.keys(progression.cartes).length * 3;
}
