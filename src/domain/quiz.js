/**
 * Domain - Logique du mode Quiz
 * Génère des questions et vérifie les réponses
 */
import { melanger } from './melanger.js';

export function creerPartieQuiz(cartes, nbQuestions = 10) {
  const questions = melanger(cartes).slice(0, nbQuestions);

  return {
    questions,
    index: 0,
    score: 0,
  };
}

export function questionActuelle(partie, toutesLesCartes) {
  if (partie.index >= partie.questions.length) return null;

  const carte = partie.questions[partie.index];
  const autresCartes = toutesLesCartes.filter(c => c.id !== carte.id);
  const faux = melanger(autresCartes).slice(0, 3);
  const choix = melanger([carte, ...faux]);

  return { carte, choix, numero: partie.index + 1, total: partie.questions.length };
}

export function repondreQuiz(partie, idChoisi) {
  const bonneReponse = partie.questions[partie.index];
  const correct = idChoisi === bonneReponse.id;

  if (correct) partie.score++;
  partie.index++;

  const termine = partie.index >= partie.questions.length;

  return { correct, bonneReponse, termine };
}

export function scoreQuiz(partie) {
  return { score: partie.score, total: partie.questions.length };
}
