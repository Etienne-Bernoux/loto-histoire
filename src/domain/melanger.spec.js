import { describe, it, expect } from 'vitest';
import { melanger } from './melanger.js';

describe('melanger', () => {
  it('retourne un tableau de même longueur', () => {
    const original = [1, 2, 3, 4, 5];
    const resultat = melanger(original);
    expect(resultat).toHaveLength(5);
  });

  it('ne modifie pas le tableau original', () => {
    const original = [1, 2, 3, 4, 5];
    const copie = [...original];
    melanger(original);
    expect(original).toEqual(copie);
  });

  it('contient les mêmes éléments', () => {
    const original = [1, 2, 3, 4, 5];
    const resultat = melanger(original);
    expect(resultat.sort()).toEqual(original.sort());
  });

  it('retourne un tableau vide pour une entrée vide', () => {
    expect(melanger([])).toEqual([]);
  });

  it('retourne un seul élément pour un tableau à un élément', () => {
    expect(melanger([42])).toEqual([42]);
  });

  it('produit un ordre différent au moins une fois sur 100 essais', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let auMoinsUnDifferent = false;
    for (let i = 0; i < 100; i++) {
      const resultat = melanger(original);
      if (JSON.stringify(resultat) !== JSON.stringify(original)) {
        auMoinsUnDifferent = true;
        break;
      }
    }
    expect(auMoinsUnDifferent).toBe(true);
  });
});
