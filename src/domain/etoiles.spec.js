import { describe, it, expect } from 'vitest';
import { calculerEtoiles, totalEtoiles, maxEtoiles } from './etoiles.js';
import { etatProgressionVide } from './persistence.js';

const CARTES_TEST = [
  { id: 1, titre: '1515', date: 1515 },
  { id: 2, titre: '1789', date: 1789 },
  { id: 3, titre: '-52', date: -52 },
];

describe('calculerEtoiles', () => {
  it('retourne 0 sans succès', () => {
    expect(calculerEtoiles({ successConsecutifs: 0 })).toBe(0);
  });

  it('retourne le nombre de succès consécutifs jusqu\'à 3', () => {
    expect(calculerEtoiles({ successConsecutifs: 1 })).toBe(1);
    expect(calculerEtoiles({ successConsecutifs: 2 })).toBe(2);
    expect(calculerEtoiles({ successConsecutifs: 3 })).toBe(3);
  });

  it('plafonne à 3', () => {
    expect(calculerEtoiles({ successConsecutifs: 5 })).toBe(3);
  });
});

describe('totalEtoiles', () => {
  it('retourne 0 pour une progression vide', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    expect(totalEtoiles(progression)).toBe(0);
  });

  it('additionne les étoiles de toutes les cartes', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    progression.cartes[1].successConsecutifs = 2;
    progression.cartes[2].successConsecutifs = 3;
    expect(totalEtoiles(progression)).toBe(5);
  });
});

describe('maxEtoiles', () => {
  it('retourne 3 fois le nombre de cartes', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    expect(maxEtoiles(progression)).toBe(9);
  });
});
