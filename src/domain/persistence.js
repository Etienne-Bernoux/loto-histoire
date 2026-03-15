/**
 * Persistence — lecture/écriture localStorage pour progression et état ludique.
 * Accepte un adapter storage injectable (par défaut localStorage).
 */

const CLE_PROGRESSION = 'loto-histoire-progression';
const CLE_LUDIQUE = 'loto-histoire-ludique';

/** Crée un état de progression vide pour toutes les cartes */
export function etatProgressionVide(cartes) {
  const etatCartes = {};
  for (const carte of cartes) {
    etatCartes[carte.id] = {
      successConsecutifs: 0,
      totalReussites: 0,
      totalEchecs: 0,
      maitrisee: false,
      derniereInteraction: null,
      prochainPassage: null,
    };
  }
  return { cartes: etatCartes, version: 1 };
}

/** Crée un état ludique vide */
export function etatLudiqueVide() {
  return {
    etoiles: {},
    anecdotesDeverrouillees: [],
    streakActuel: 0,
    meilleurStreak: 0,
    recordChrono: { associer: null, restituer: null },
    defiDuJour: null,
    version: 1,
  };
}

/** Charge la progression depuis le storage */
export function chargerProgression(cartes, storage = localStorage) {
  const donnees = storage.getItem(CLE_PROGRESSION);
  if (!donnees) return etatProgressionVide(cartes);
  try {
    const etat = JSON.parse(donnees);
    // Ajouter les nouvelles cartes absentes
    for (const carte of cartes) {
      if (!etat.cartes[carte.id]) {
        etat.cartes[carte.id] = {
          successConsecutifs: 0,
          totalReussites: 0,
          totalEchecs: 0,
          maitrisee: false,
          derniereInteraction: null,
          prochainPassage: null,
        };
      }
    }
    return etat;
  } catch {
    return etatProgressionVide(cartes);
  }
}

/** Sauvegarde la progression dans le storage */
export function sauverProgression(progression, storage = localStorage) {
  storage.setItem(CLE_PROGRESSION, JSON.stringify(progression));
}

/** Charge l'état ludique depuis le storage */
export function chargerLudique(storage = localStorage) {
  const donnees = storage.getItem(CLE_LUDIQUE);
  if (!donnees) return etatLudiqueVide();
  try {
    return JSON.parse(donnees);
  } catch {
    return etatLudiqueVide();
  }
}

/** Sauvegarde l'état ludique dans le storage */
export function sauverLudique(ludique, storage = localStorage) {
  storage.setItem(CLE_LUDIQUE, JSON.stringify(ludique));
}
