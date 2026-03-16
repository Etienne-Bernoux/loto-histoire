/**
 * Domaine — Personnage explorateur du temps
 * Répliques contextuelles pour accompagner l'enfant.
 */

const REPLIQUES_REUSSITE = [
  'Bravo, jeune explorateur !',
  'Tu connais bien ton histoire !',
  'Excellent ! Continue comme ça !',
  'Tu es un vrai historien !',
  'Magnifique ! L\'histoire n\'a plus de secrets pour toi !',
];

const REPLIQUES_ERREUR = [
  'Pas de panique, on apprend en se trompant !',
  'Presque ! Tu y arriveras la prochaine fois !',
  'Continue, tu progresses !',
  'L\'histoire est pleine de surprises, retiens bien !',
  'Ne t\'inquiète pas, les grands explorateurs aussi se trompent !',
];

const REPLIQUES_STREAK = {
  3: 'Trois d\'affilée, bien joué !',
  5: 'Cinq de suite ! Tu es en feu !',
  10: 'Dix ! Tu es imbattable, quel talent !',
};

const REPLIQUES_SPECIFIQUES = {
  1: { reussite: 'Vercingétorix serait fier de toi !' },
  5: { reussite: 'Charlemagne approuve !' },
  15: { reussite: 'Jeanne d\'Arc te salue !' },
  17: { reussite: 'François Iᵉʳ serait fier de toi !' },
  27: { reussite: 'Vive la Révolution... des connaissances !' },
};

/** Commentaire sur une réussite, contextualisé si possible */
export function commentaireReussite(carte) {
  const specifique = REPLIQUES_SPECIFIQUES[carte.id];
  if (specifique?.reussite) return specifique.reussite;
  return REPLIQUES_REUSSITE[Math.floor(Math.random() * REPLIQUES_REUSSITE.length)];
}

/** Commentaire encourageant sur une erreur */
export function commentaireErreur() {
  return REPLIQUES_ERREUR[Math.floor(Math.random() * REPLIQUES_ERREUR.length)];
}

/** Commentaire de streak si un palier est atteint */
export function commentaireStreak(count) {
  return REPLIQUES_STREAK[count] ?? null;
}
