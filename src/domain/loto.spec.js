import { describe, it, expect } from 'vitest';
import { creerPartieLoto, tirerDate, verifierReponse, scoreActuel } from './loto.js';
import { CARTES_HISTOIRE } from './cartes.js';

describe('Mode Loto', () => {
  describe('creerPartieLoto', () => {
    it('crée une partie avec le bon nombre de cartes sur le plateau', () => {
      const partie = creerPartieLoto(CARTES_HISTOIRE, 9);
      expect(partie.cartesPlateau).toHaveLength(9);
    });

    it('initialise les cartes à tirer avec les mêmes cartes que le plateau', () => {
      const partie = creerPartieLoto(CARTES_HISTOIRE, 6);
      const idsPlateau = partie.cartesPlateau.map(c => c.id).sort();
      const idsTirer = partie.cartesATirer.map(c => c.id).sort();
      expect(idsTirer).toEqual(idsPlateau);
    });

    it('commence sans carte tirée', () => {
      const partie = creerPartieLoto(CARTES_HISTOIRE, 9);
      expect(partie.carteTiree).toBeNull();
      expect(partie.attenteReponse).toBe(false);
    });

    it('commence avec 0 trouvées', () => {
      const partie = creerPartieLoto(CARTES_HISTOIRE, 9);
      expect(partie.trouvees.size).toBe(0);
    });
  });

  describe('tirerDate', () => {
    it('retourne une carte et passe en attente de réponse', () => {
      const partie = creerPartieLoto(CARTES_HISTOIRE, 3);
      const carte = tirerDate(partie);
      expect(carte).not.toBeNull();
      expect(partie.attenteReponse).toBe(true);
      expect(partie.carteTiree).toBe(carte);
    });

    it('retourne null quand il n\'y a plus de cartes', () => {
      const partie = creerPartieLoto(CARTES_HISTOIRE, 1);
      tirerDate(partie);
      partie.attenteReponse = false; // simuler réponse
      partie.cartesATirer = [];
      expect(tirerDate(partie)).toBeNull();
    });
  });

  describe('verifierReponse', () => {
    it('retourne correct pour la bonne carte', () => {
      const partie = creerPartieLoto(CARTES_HISTOIRE, 3);
      const carte = tirerDate(partie);
      const resultat = verifierReponse(partie, carte.id);
      expect(resultat.valide).toBe(true);
      expect(resultat.correct).toBe(true);
    });

    it('retourne incorrect pour une mauvaise carte', () => {
      const partie = creerPartieLoto(CARTES_HISTOIRE, 9);
      const carte = tirerDate(partie);
      const mauvaisId = partie.cartesPlateau.find(c => c.id !== carte.id).id;
      const resultat = verifierReponse(partie, mauvaisId);
      expect(resultat.valide).toBe(true);
      expect(resultat.correct).toBe(false);
    });

    it('refuse si aucun tirage en cours', () => {
      const partie = creerPartieLoto(CARTES_HISTOIRE, 3);
      const resultat = verifierReponse(partie, 1);
      expect(resultat.valide).toBe(false);
      expect(resultat.raison).toBe('pas_de_tirage');
    });

    it('détecte la fin de partie', () => {
      const partie = creerPartieLoto(CARTES_HISTOIRE, 1);
      const carte = tirerDate(partie);
      const resultat = verifierReponse(partie, carte.id);
      expect(resultat.termine).toBe(true);
    });
  });

  describe('scoreActuel', () => {
    it('retourne le score correct après des réponses', () => {
      const partie = creerPartieLoto(CARTES_HISTOIRE, 3);
      const carte = tirerDate(partie);
      verifierReponse(partie, carte.id);
      const score = scoreActuel(partie);
      expect(score.trouvees).toBe(1);
      expect(score.total).toBe(3);
    });
  });
});
