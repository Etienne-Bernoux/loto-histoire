import { describe, it, expect } from 'vitest';
import { creerPartieFrise, placerCarte, retirerCarte, nbPlaces, estComplet, validerOrdre } from './frise.js';
import { CARTES_HISTOIRE } from './cartes.js';

describe('Mode Frise', () => {
  describe('creerPartieFrise', () => {
    it('crée une partie avec le bon nombre de cartes', () => {
      const partie = creerPartieFrise(CARTES_HISTOIRE, 6);
      expect(partie.cartes).toHaveLength(6);
      expect(partie.slots).toHaveLength(6);
      expect(partie.slots.every(s => s === null)).toBe(true);
    });
  });

  describe('placerCarte', () => {
    it('place une carte dans un slot vide', () => {
      const partie = creerPartieFrise(CARTES_HISTOIRE, 3);
      const carte = partie.cartes[0];
      const resultat = placerCarte(partie, carte.id, 0, CARTES_HISTOIRE);
      expect(resultat.succes).toBe(true);
      expect(partie.slots[0].id).toBe(carte.id);
    });

    it('retourne la carte précédente si le slot est occupé', () => {
      const partie = creerPartieFrise(CARTES_HISTOIRE, 3);
      placerCarte(partie, partie.cartes[0].id, 0, CARTES_HISTOIRE);
      const resultat = placerCarte(partie, partie.cartes[1].id, 0, CARTES_HISTOIRE);
      expect(resultat.carteRetiree.id).toBe(partie.cartes[0].id);
    });

    it('échoue pour un id de carte invalide', () => {
      const partie = creerPartieFrise(CARTES_HISTOIRE, 3);
      const resultat = placerCarte(partie, 999, 0, CARTES_HISTOIRE);
      expect(resultat.succes).toBe(false);
    });
  });

  describe('retirerCarte', () => {
    it('retire une carte et la retourne', () => {
      const partie = creerPartieFrise(CARTES_HISTOIRE, 3);
      const carte = partie.cartes[0];
      placerCarte(partie, carte.id, 1, CARTES_HISTOIRE);
      const retiree = retirerCarte(partie, 1);
      expect(retiree.id).toBe(carte.id);
      expect(partie.slots[1]).toBeNull();
    });
  });

  describe('nbPlaces / estComplet', () => {
    it('compte les cartes placées', () => {
      const partie = creerPartieFrise(CARTES_HISTOIRE, 3);
      expect(nbPlaces(partie)).toBe(0);
      expect(estComplet(partie)).toBe(false);

      placerCarte(partie, partie.cartes[0].id, 0, CARTES_HISTOIRE);
      expect(nbPlaces(partie)).toBe(1);

      placerCarte(partie, partie.cartes[1].id, 1, CARTES_HISTOIRE);
      placerCarte(partie, partie.cartes[2].id, 2, CARTES_HISTOIRE);
      expect(estComplet(partie)).toBe(true);
    });
  });

  describe('validerOrdre', () => {
    it('valide un ordre chronologique correct', () => {
      const partie = creerPartieFrise(CARTES_HISTOIRE, 3);
      // Trier les cartes par date et les placer dans l'ordre
      const triees = [...partie.cartes].sort((a, b) => a.date - b.date);
      triees.forEach((c, i) => placerCarte(partie, c.id, i, CARTES_HISTOIRE));

      const { score, total } = validerOrdre(partie);
      expect(score).toBe(3);
      expect(total).toBe(3);
    });

    it('détecte un ordre incorrect', () => {
      const partie = creerPartieFrise(CARTES_HISTOIRE, 3);
      // Placer dans l'ordre inverse
      const triees = [...partie.cartes].sort((a, b) => a.date - b.date);
      triees.reverse().forEach((c, i) => placerCarte(partie, c.id, i, CARTES_HISTOIRE));

      const { score, total, resultats } = validerOrdre(partie);
      expect(score).toBeLessThan(total);
      expect(resultats.some(r => !r.correct)).toBe(true);
    });
  });
});
