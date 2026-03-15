/**
 * Domain - Logique du mode Frise chronologique
 * Gère le placement et la validation de l'ordre des événements
 */
import { melanger } from './melanger.js';

export function creerPartieFrise(cartes, nbCartes = 6) {
  const selection = melanger(cartes).slice(0, nbCartes);

  return {
    cartes: selection,
    cartesMelangees: melanger([...selection]),
    slots: new Array(nbCartes).fill(null),
  };
}

export function placerCarte(partie, carteId, slotIndex, toutesLesCartes) {
  const carte = toutesLesCartes.find(c => c.id === carteId);
  if (!carte) return { succes: false };

  const ancienne = partie.slots[slotIndex];
  partie.slots[slotIndex] = carte;

  return { succes: true, carteRetiree: ancienne };
}

export function retirerCarte(partie, slotIndex) {
  const carte = partie.slots[slotIndex];
  partie.slots[slotIndex] = null;
  return carte;
}

export function nbPlaces(partie) {
  return partie.slots.filter(s => s !== null).length;
}

export function estComplet(partie) {
  return nbPlaces(partie) === partie.cartes.length;
}

export function validerOrdre(partie) {
  const cartesTriees = [...partie.cartes].sort((a, b) => a.date - b.date);

  const resultats = partie.slots.map((carte, i) => ({
    slotIndex: i,
    carte,
    attendue: cartesTriees[i],
    correct: carte !== null && carte.id === cartesTriees[i].id,
  }));

  const score = resultats.filter(r => r.correct).length;
  const total = partie.cartes.length;

  return { resultats, score, total };
}
