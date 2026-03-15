import { describe, it, expect } from 'vitest';
import { genererDefiDuJour, estNouveauJour, majDefiDuJour } from './defi-du-jour.js';
import { etatLudiqueVide } from './persistence.js';

const CARTES_TEST = [
  { id: 1, dateTexte: '1515', date: 1515 },
  { id: 2, dateTexte: '1789', date: 1789 },
  { id: 3, dateTexte: '-52', date: -52 },
  { id: 4, dateTexte: '800', date: 800 },
  { id: 5, dateTexte: '1214', date: 1214 },
  { id: 6, dateTexte: '732', date: 732 },
  { id: 7, dateTexte: '496', date: 496 },
];

describe('genererDefiDuJour', () => {
  it('retourne 5 cartes', () => {
    const ids = genererDefiDuJour(CARTES_TEST, '2026-03-15');
    expect(ids).toHaveLength(5);
  });

  it('est déterministe pour la même date', () => {
    const ids1 = genererDefiDuJour(CARTES_TEST, '2026-03-15');
    const ids2 = genererDefiDuJour(CARTES_TEST, '2026-03-15');
    expect(ids1).toEqual(ids2);
  });

  it('donne des cartes différentes pour des dates différentes', () => {
    const ids1 = genererDefiDuJour(CARTES_TEST, '2026-03-15');
    const ids2 = genererDefiDuJour(CARTES_TEST, '2026-03-16');
    // Très improbable que ce soit identique
    expect(ids1).not.toEqual(ids2);
  });

  it('retourne des ids uniques', () => {
    const ids = genererDefiDuJour(CARTES_TEST, '2026-03-15');
    expect(new Set(ids).size).toBe(5);
  });
});

describe('estNouveauJour', () => {
  it('retourne true si pas de défi', () => {
    expect(estNouveauJour(null, '2026-03-15')).toBe(true);
  });

  it('retourne true si le jour a changé', () => {
    expect(estNouveauJour({ date: '2026-03-14' }, '2026-03-15')).toBe(true);
  });

  it('retourne false si même jour', () => {
    expect(estNouveauJour({ date: '2026-03-15' }, '2026-03-15')).toBe(false);
  });
});

describe('majDefiDuJour', () => {
  it('crée un défi si aucun n\'existe', () => {
    const ludique = etatLudiqueVide();
    const nouveau = majDefiDuJour(ludique, CARTES_TEST, '2026-03-15');
    expect(nouveau.defiDuJour).not.toBeNull();
    expect(nouveau.defiDuJour.date).toBe('2026-03-15');
    expect(nouveau.defiDuJour.carteIds).toHaveLength(5);
  });

  it('ne change pas si même jour', () => {
    const ludique = etatLudiqueVide();
    const j1 = majDefiDuJour(ludique, CARTES_TEST, '2026-03-15');
    const j2 = majDefiDuJour(j1, CARTES_TEST, '2026-03-15');
    expect(j2).toBe(j1);
  });

  it('renouvelle le lendemain', () => {
    const ludique = etatLudiqueVide();
    const j1 = majDefiDuJour(ludique, CARTES_TEST, '2026-03-15');
    const j2 = majDefiDuJour(j1, CARTES_TEST, '2026-03-16');
    expect(j2.defiDuJour.date).toBe('2026-03-16');
  });
});
