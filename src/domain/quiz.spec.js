import { describe, it, expect } from 'vitest';
import { creerPartieQuiz, questionActuelle, repondreQuiz, scoreQuiz } from './quiz.js';
import { CARTES_HISTOIRE } from './cartes.js';

describe('Mode Quiz', () => {
  describe('creerPartieQuiz', () => {
    it('crée une partie avec le bon nombre de questions', () => {
      const partie = creerPartieQuiz(CARTES_HISTOIRE, 10);
      expect(partie.questions).toHaveLength(10);
      expect(partie.index).toBe(0);
      expect(partie.score).toBe(0);
    });
  });

  describe('questionActuelle', () => {
    it('retourne une question avec 4 choix', () => {
      const partie = creerPartieQuiz(CARTES_HISTOIRE, 5);
      const q = questionActuelle(partie, CARTES_HISTOIRE);
      expect(q).not.toBeNull();
      expect(q.choix).toHaveLength(4);
      expect(q.numero).toBe(1);
    });

    it('inclut la bonne réponse dans les choix', () => {
      const partie = creerPartieQuiz(CARTES_HISTOIRE, 5);
      const q = questionActuelle(partie, CARTES_HISTOIRE);
      const ids = q.choix.map(c => c.id);
      expect(ids).toContain(q.carte.id);
    });

    it('retourne null quand toutes les questions sont épuisées', () => {
      const partie = creerPartieQuiz(CARTES_HISTOIRE, 1);
      repondreQuiz(partie, partie.questions[0].id);
      expect(questionActuelle(partie, CARTES_HISTOIRE)).toBeNull();
    });
  });

  describe('repondreQuiz', () => {
    it('incrémente le score pour une bonne réponse', () => {
      const partie = creerPartieQuiz(CARTES_HISTOIRE, 3);
      const bonneReponseId = partie.questions[0].id;
      const resultat = repondreQuiz(partie, bonneReponseId);
      expect(resultat.correct).toBe(true);
      expect(partie.score).toBe(1);
    });

    it('ne change pas le score pour une mauvaise réponse', () => {
      const partie = creerPartieQuiz(CARTES_HISTOIRE, 3);
      const mauvaisId = CARTES_HISTOIRE.find(c => c.id !== partie.questions[0].id).id;
      const resultat = repondreQuiz(partie, mauvaisId);
      expect(resultat.correct).toBe(false);
      expect(partie.score).toBe(0);
    });

    it('retourne la bonne réponse', () => {
      const partie = creerPartieQuiz(CARTES_HISTOIRE, 3);
      const expected = partie.questions[0];
      const resultat = repondreQuiz(partie, 999);
      expect(resultat.bonneReponse.id).toBe(expected.id);
    });

    it('détecte la fin du quiz', () => {
      const partie = creerPartieQuiz(CARTES_HISTOIRE, 1);
      const resultat = repondreQuiz(partie, partie.questions[0].id);
      expect(resultat.termine).toBe(true);
    });
  });

  describe('scoreQuiz', () => {
    it('retourne le score et le total', () => {
      const partie = creerPartieQuiz(CARTES_HISTOIRE, 5);
      repondreQuiz(partie, partie.questions[0].id); // bonne
      repondreQuiz(partie, 999); // mauvaise
      const s = scoreQuiz(partie);
      expect(s.score).toBe(1);
      expect(s.total).toBe(5);
    });
  });
});
