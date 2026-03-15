/**
 * Domaine — Chronomètre optionnel
 * Timer de session avec record personnel.
 */

/** Démarre le chrono, retourne le timestamp de départ */
export function demarrerChrono() {
  return Date.now();
}

/** Arrête le chrono, retourne le temps écoulé en secondes */
export function arreterChrono(debut) {
  return Math.round((Date.now() - debut) / 1000);
}

/** Vérifie si le temps est un nouveau record */
export function estRecord(elapsed, recordActuel) {
  if (recordActuel === null) return true;
  return elapsed < recordActuel;
}

/** Met à jour le record dans l'état ludique */
export function majRecord(ludique, mode, elapsed) {
  if (!estRecord(elapsed, ludique.recordChrono[mode])) return ludique;
  return {
    ...ludique,
    recordChrono: {
      ...ludique.recordChrono,
      [mode]: elapsed,
    },
  };
}

/** Formate un temps en secondes en MM:SS */
export function formaterTemps(secondes) {
  const min = Math.floor(secondes / 60);
  const sec = secondes % 60;
  return `${min}:${String(sec).padStart(2, '0')}`;
}
