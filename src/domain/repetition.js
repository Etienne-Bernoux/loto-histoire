/**
 * Répétition espacée — sélection de cartes et enregistrement des résultats.
 *
 * Priorité de sélection :
 *   1. Cartes échouées récemment
 *   2. Cartes jamais vues
 *   3. Cartes dues pour consolidation
 *   4. Cartes non maîtrisées aléatoires
 *
 * Intervalles de consolidation (après maîtrise) :
 *   1 jour → 3 jours → 7 jours → 14 jours
 */

import { melanger } from './melanger.js';

const SEUIL_MAITRISE = 3;
const INTERVALLES_JOURS = [1, 3, 7, 14];
const MS_PAR_JOUR = 24 * 60 * 60 * 1000;

/** Vérifie si une carte est maîtrisée */
export function estMaitrisee(etatCarte) {
  return etatCarte.successConsecutifs >= SEUIL_MAITRISE;
}

/** Vérifie si une carte maîtrisée est due pour consolidation */
export function estDuePourConsolidation(etatCarte, maintenant = new Date()) {
  if (!etatCarte.maitrisee || !etatCarte.prochainPassage) return false;
  return new Date(etatCarte.prochainPassage) <= maintenant;
}

/** Calcule la prochaine date de passage après consolidation réussie */
export function calculerProchainPassage(etatCarte, maintenant = new Date()) {
  // Nombre de consolidations réussies = total réussites - seuil de maîtrise
  const consolidationsReussies = Math.max(
    0,
    etatCarte.totalReussites - SEUIL_MAITRISE
  );
  const indexIntervalle = Math.min(
    consolidationsReussies,
    INTERVALLES_JOURS.length - 1
  );
  const jours = INTERVALLES_JOURS[indexIntervalle];
  return new Date(maintenant.getTime() + jours * MS_PAR_JOUR).toISOString();
}

/**
 * Sélectionne les cartes pour une session de jeu.
 * Retourne un tableau d'IDs de cartes, ordonnés par priorité.
 */
export function selectionnerCartes(progression, toutesLesCartes, nbCartes) {
  const echouees = [];
  const jamaisVues = [];
  const duesConsolidation = [];
  const nonMaitrisees = [];
  const maintenant = new Date();

  for (const carte of toutesLesCartes) {
    const etat = progression.cartes[carte.id];
    if (!etat) {
      jamaisVues.push(carte.id);
      continue;
    }

    if (etat.totalEchecs > 0 && !etat.maitrisee && etat.successConsecutifs === 0) {
      echouees.push(carte.id);
    } else if (etat.totalReussites === 0 && etat.totalEchecs === 0) {
      jamaisVues.push(carte.id);
    } else if (estDuePourConsolidation(etat, maintenant)) {
      duesConsolidation.push(carte.id);
    } else if (!etat.maitrisee) {
      nonMaitrisees.push(carte.id);
    }
  }

  const selection = [
    ...melanger(echouees),
    ...melanger(jamaisVues),
    ...melanger(duesConsolidation),
    ...melanger(nonMaitrisees),
  ];

  return selection.slice(0, nbCartes);
}

/**
 * Enregistre le résultat d'une réponse. Retourne un nouvel état de progression (immutable).
 */
export function enregistrerResultat(progression, carteId, reussite, maintenant = new Date()) {
  const etatCarte = { ...progression.cartes[carteId] };

  if (reussite) {
    etatCarte.successConsecutifs += 1;
    etatCarte.totalReussites += 1;
  } else {
    etatCarte.successConsecutifs = 0;
    etatCarte.totalEchecs += 1;
    etatCarte.maitrisee = false;
    etatCarte.prochainPassage = null;
  }

  etatCarte.derniereInteraction = maintenant.toISOString();

  // Vérifier si la carte devient maîtrisée
  if (!etatCarte.maitrisee && estMaitrisee(etatCarte)) {
    etatCarte.maitrisee = true;
    etatCarte.prochainPassage = calculerProchainPassage(etatCarte, maintenant);
  }

  // Consolidation réussie → repousser le prochain passage
  if (etatCarte.maitrisee && reussite && etatCarte.totalReussites > SEUIL_MAITRISE) {
    etatCarte.prochainPassage = calculerProchainPassage(etatCarte, maintenant);
  }

  return {
    ...progression,
    cartes: {
      ...progression.cartes,
      [carteId]: etatCarte,
    },
  };
}
