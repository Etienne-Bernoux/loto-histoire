/**
 * Domaine — Étape 2 : Associer
 * QCM date ↔ événement avec deux sous-modes alternés aléatoirement.
 */
import { melanger } from './melanger.js';
import { selectionnerCartes } from './repetition.js';

/**
 * Crée une session Associer.
 * Les cartes sont sélectionnées par le moteur de répétition espacée.
 */
export function creerSessionAssocier(toutesLesCartes, progression, nbCartes = 10) {
  const ids = selectionnerCartes(progression, toutesLesCartes, nbCartes);
  return {
    cartesIds: ids,
    index: 0,
    resultats: [],
  };
}

/**
 * Génère la question courante avec 4 choix.
 * Retourne null si la session est terminée.
 */
export function genererQuestion(session, toutesLesCartes) {
  if (session.index >= session.cartesIds.length) return null;

  const carteId = session.cartesIds[session.index];
  const carte = toutesLesCartes.find(c => c.id === carteId);
  const sousMode = Math.random() > 0.5 ? 'image-vers-date' : 'date-vers-evenement';

  const choix = sousMode === 'image-vers-date'
    ? genererChoixDates(carte, toutesLesCartes)
    : genererChoixEvenements(carte, toutesLesCartes);

  return {
    carte,
    sousMode,
    choix,
    numero: session.index + 1,
    total: session.cartesIds.length,
  };
}

/**
 * Enregistre la réponse et avance l'index.
 * Retourne { correct, bonneReponse, termine }.
 */
export function repondreAssocier(session, choixId, toutesLesCartes) {
  const carteId = session.cartesIds[session.index];
  const carte = toutesLesCartes.find(c => c.id === carteId);
  const correct = choixId === carteId;

  session.resultats.push({ carteId, choixId, correct });
  session.index += 1;

  return {
    correct,
    bonneReponse: carte,
    termine: session.index >= session.cartesIds.length,
  };
}

/** Score actuel de la session */
export function scoreAssocier(session) {
  const score = session.resultats.filter(r => r.correct).length;
  return { score, total: session.cartesIds.length };
}

/** Génère 4 choix de dates (1 correcte + 3 fausses) */
function genererChoixDates(carteCorrecte, toutesLesCartes) {
  const autres = toutesLesCartes.filter(c => c.id !== carteCorrecte.id);
  const fausses = melanger(autres).slice(0, 3);
  return melanger([
    { id: carteCorrecte.id, label: carteCorrecte.titre },
    ...fausses.map(c => ({ id: c.id, label: c.titre })),
  ]);
}

/** Génère 4 choix d'événements (1 correct + 3 faux) */
function genererChoixEvenements(carteCorrecte, toutesLesCartes) {
  const autres = toutesLesCartes.filter(c => c.id !== carteCorrecte.id);
  const fausses = melanger(autres).slice(0, 3);
  return melanger([
    { id: carteCorrecte.id, label: carteCorrecte.description },
    ...fausses.map(c => ({ id: c.id, label: c.description })),
  ]);
}
