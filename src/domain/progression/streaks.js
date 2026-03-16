/**
 * Domaine — Streaks (séries de bonnes réponses)
 */

const MESSAGES = [
  { seuil: 10, message: 'Imbattable !' },
  { seuil: 5, message: 'En feu !' },
  { seuil: 3, message: 'Bien joué !' },
];

/** Incrémente le streak après une bonne réponse. Retourne le nouvel état ludique. */
export function incrementerStreak(ludique) {
  const streakActuel = ludique.streakActuel + 1;
  const meilleurStreak = Math.max(streakActuel, ludique.meilleurStreak);
  return { ...ludique, streakActuel, meilleurStreak };
}

/** Réinitialise le streak après une mauvaise réponse. */
export function resetStreak(ludique) {
  return { ...ludique, streakActuel: 0 };
}

/** Retourne le message de streak si un seuil est atteint, null sinon. */
export function messageStreak(count) {
  const palier = MESSAGES.find(m => count >= m.seuil);
  return palier ? palier.message : null;
}
