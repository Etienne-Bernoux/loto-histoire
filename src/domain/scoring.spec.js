import { describe, it, expect } from 'vitest';
import { calculerResultat } from './scoring.js';

describe('calculerResultat', () => {
  it('affiche "Parfait" pour un score parfait', () => {
    const r = calculerResultat(10, 10);
    expect(r.titre).toBe('Parfait !');
    expect(r.ratio).toBe(1);
  });

  it('affiche "Très bien" pour 70%+', () => {
    const r = calculerResultat(7, 10);
    expect(r.titre).toBe('Très bien !');
  });

  it('affiche "Pas mal" pour 40%+', () => {
    const r = calculerResultat(5, 10);
    expect(r.titre).toBe('Pas mal !');
  });

  it('affiche "Continue" pour moins de 40%', () => {
    const r = calculerResultat(2, 10);
    expect(r.titre).toBe('Continue !');
  });

  it('gère un total de 0 sans erreur', () => {
    const r = calculerResultat(0, 0);
    expect(r.titre).toBe('Continue !');
    expect(r.ratio).toBe(0);
  });

  it('formate correctement les détails au singulier', () => {
    const r = calculerResultat(1, 5);
    expect(r.details).toBe('1 bonne réponse sur 5');
  });

  it('formate correctement les détails au pluriel', () => {
    const r = calculerResultat(3, 5);
    expect(r.details).toBe('3 bonnes réponses sur 5');
  });
});
