import { describe, it, expect } from 'vitest';
import { estRecord, majRecord, formaterTemps } from './chrono.js';
import { etatLudiqueVide } from './persistence.js';

describe('estRecord', () => {
  it('retourne true si pas de record', () => {
    expect(estRecord(30, null)).toBe(true);
  });

  it('retourne true si meilleur temps', () => {
    expect(estRecord(25, 30)).toBe(true);
  });

  it('retourne false si moins bon', () => {
    expect(estRecord(35, 30)).toBe(false);
  });

  it('retourne false si égal', () => {
    expect(estRecord(30, 30)).toBe(false);
  });
});

describe('majRecord', () => {
  it('met à jour le record si meilleur', () => {
    const ludique = etatLudiqueVide();
    const nouveau = majRecord(ludique, 'associer', 45);
    expect(nouveau.recordChrono.associer).toBe(45);
  });

  it('ne change pas si moins bon', () => {
    let ludique = etatLudiqueVide();
    ludique = majRecord(ludique, 'associer', 30);
    const meme = majRecord(ludique, 'associer', 40);
    expect(meme).toBe(ludique);
  });

  it('ne mute pas l\'état original', () => {
    const ludique = etatLudiqueVide();
    majRecord(ludique, 'associer', 45);
    expect(ludique.recordChrono.associer).toBeNull();
  });
});

describe('formaterTemps', () => {
  it('formate 0 secondes', () => {
    expect(formaterTemps(0)).toBe('0:00');
  });

  it('formate les secondes avec padding', () => {
    expect(formaterTemps(5)).toBe('0:05');
  });

  it('formate les minutes', () => {
    expect(formaterTemps(65)).toBe('1:05');
  });

  it('formate les gros temps', () => {
    expect(formaterTemps(600)).toBe('10:00');
  });
});
