/**
 * Domaine — Étape 3 : Restituer
 * Deux sous-modes : saisie libre (taper la date) et frise chronologique (réordonner).
 */
import { melanger } from './melanger.js';
import { selectionnerCartes } from './repetition.js';

// === SAISIE LIBRE ===

/** Crée une session de saisie libre */
export function creerSessionSaisie(toutesLesCartes, progression, nbCartes = 10) {
  const ids = selectionnerCartes(progression, toutesLesCartes, nbCartes);
  return {
    mode: 'saisie',
    cartesIds: ids,
    index: 0,
    resultats: [],
  };
}

/** Retourne la carte courante ou null si terminé */
export function carteCouranteSaisie(session, toutesLesCartes) {
  if (session.index >= session.cartesIds.length) return null;
  const id = session.cartesIds[session.index];
  const carte = toutesLesCartes.find(c => c.id === id);
  return {
    carte,
    numero: session.index + 1,
    total: session.cartesIds.length,
  };
}

/** Vérifie la saisie. Format strict : "1515", "-52" */
export function verifierSaisie(session, saisie, toutesLesCartes) {
  const id = session.cartesIds[session.index];
  const carte = toutesLesCartes.find(c => c.id === id);
  const saisieNormalisee = saisie.trim();
  const attendu = String(carte.date);
  const correct = saisieNormalisee === attendu;

  session.resultats.push({ carteId: id, saisie: saisieNormalisee, correct });
  session.index += 1;

  return {
    correct,
    dateAttendue: attendu,
    titreAttendu: carte.titre,
    carte,
    termine: session.index >= session.cartesIds.length,
  };
}

/** Score de la session saisie */
export function scoreSaisie(session) {
  const score = session.resultats.filter(r => r.correct).length;
  return { score, total: session.cartesIds.length };
}

// === FRISE CHRONOLOGIQUE ===

/** Crée une session frise */
export function creerSessionFrise(toutesLesCartes, progression, nbCartes = 6) {
  const ids = selectionnerCartes(progression, toutesLesCartes, nbCartes);
  const cartes = ids.map(id => toutesLesCartes.find(c => c.id === id));
  return {
    mode: 'frise',
    cartes,
    cartesMelangees: melanger([...cartes]),
    slots: new Array(cartes.length).fill(null),
  };
}

/** Place une carte dans un slot. Retourne la carte déplacée s'il y en avait une */
export function placerCarteFrise(session, carteId, slotIndex, toutesLesCartes) {
  if (slotIndex < 0 || slotIndex >= session.slots.length) {
    return { succes: false, carteRetiree: null };
  }

  const carte = toutesLesCartes.find(c => c.id === carteId);
  if (!carte) return { succes: false, carteRetiree: null };

  // Retirer la carte si elle est déjà dans un autre slot
  const ancienSlot = session.slots.indexOf(carte);
  if (ancienSlot >= 0) session.slots[ancienSlot] = null;

  const carteRetiree = session.slots[slotIndex];
  session.slots[slotIndex] = carte;

  return { succes: true, carteRetiree };
}

/** Retire une carte d'un slot */
export function retirerCarteFrise(session, slotIndex) {
  const carte = session.slots[slotIndex];
  if (carte) session.slots[slotIndex] = null;
  return carte;
}

/** Nombre de cartes placées */
export function nbPlacesFrise(session) {
  return session.slots.filter(s => s !== null).length;
}

/** Vérifie si tous les slots sont remplis */
export function estCompletFrise(session) {
  return session.slots.every(s => s !== null);
}

/** Valide l'ordre chronologique */
export function validerOrdreFrise(session) {
  const resultats = session.slots.map((carte, i) => {
    if (!carte) return { carteId: null, correct: false };
    // La carte correcte pour ce slot est celle triée par date
    const cartesTriees = [...session.cartes].sort((a, b) => a.date - b.date);
    return {
      carteId: carte.id,
      correct: carte.id === cartesTriees[i].id,
    };
  });

  const score = resultats.filter(r => r.correct).length;
  return { resultats, score, total: session.slots.length };
}
