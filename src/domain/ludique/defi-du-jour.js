/**
 * Domaine — Défi du jour
 * 5 cartes tirées de façon déterministe à partir de la date du jour.
 */

/** Hash simple d'une chaîne pour générer un seed */
function hashDate(dateStr) {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/** Générateur pseudo-aléatoire déterministe (LCG) */
function creerRng(seed) {
  let etat = seed;
  return () => {
    etat = (etat * 1664525 + 1013904223) & 0xFFFFFFFF;
    return (etat >>> 0) / 0xFFFFFFFF;
  };
}

/**
 * Génère les 5 cartes du défi du jour.
 * Déterministe : même date = mêmes cartes.
 */
export function genererDefiDuJour(toutesLesCartes, dateStr) {
  const seed = hashDate(dateStr);
  const rng = creerRng(seed);

  // Mélange de Fisher-Yates avec RNG déterministe
  const indices = toutesLesCartes.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  return indices.slice(0, 5).map(i => toutesLesCartes[i].id);
}

/** Vérifie si le défi doit être renouvelé (minuit passé) */
export function estNouveauJour(defiActuel, aujourdhui) {
  if (!defiActuel) return true;
  return defiActuel.date !== aujourdhui;
}

/** Crée ou renouvelle le défi du jour dans l'état ludique */
export function majDefiDuJour(ludique, toutesLesCartes, aujourdhui) {
  if (!estNouveauJour(ludique.defiDuJour, aujourdhui)) {
    return ludique;
  }

  const carteIds = genererDefiDuJour(toutesLesCartes, aujourdhui);
  return {
    ...ludique,
    defiDuJour: {
      date: aujourdhui,
      carteIds,
      resultats: {},
    },
  };
}
