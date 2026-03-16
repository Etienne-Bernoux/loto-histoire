import { describe, it, expect } from 'vitest';
import { incrementerStreak, resetStreak, messageStreak } from './streaks.js';
import { etatLudiqueVide } from '../progression/persistence.js';

describe('incrementerStreak', () => {
  it('incrémente le streak de 1', () => {
    const ludique = etatLudiqueVide();
    const nouveau = incrementerStreak(ludique);
    expect(nouveau.streakActuel).toBe(1);
  });

  it('met à jour le meilleur streak', () => {
    let ludique = etatLudiqueVide();
    ludique = incrementerStreak(ludique);
    ludique = incrementerStreak(ludique);
    ludique = incrementerStreak(ludique);
    expect(ludique.meilleurStreak).toBe(3);
  });

  it('ne mute pas l\'état original', () => {
    const ludique = etatLudiqueVide();
    incrementerStreak(ludique);
    expect(ludique.streakActuel).toBe(0);
  });
});

describe('resetStreak', () => {
  it('remet le streak à 0', () => {
    let ludique = etatLudiqueVide();
    ludique = incrementerStreak(ludique);
    ludique = incrementerStreak(ludique);
    ludique = resetStreak(ludique);
    expect(ludique.streakActuel).toBe(0);
  });

  it('conserve le meilleur streak', () => {
    let ludique = etatLudiqueVide();
    ludique = incrementerStreak(ludique);
    ludique = incrementerStreak(ludique);
    ludique = incrementerStreak(ludique);
    ludique = resetStreak(ludique);
    expect(ludique.meilleurStreak).toBe(3);
  });
});

describe('messageStreak', () => {
  it('retourne null sous le seuil de 3', () => {
    expect(messageStreak(0)).toBeNull();
    expect(messageStreak(1)).toBeNull();
    expect(messageStreak(2)).toBeNull();
  });

  it('retourne "Bien joué !" à 3', () => {
    expect(messageStreak(3)).toBe('Bien joué !');
  });

  it('retourne "En feu !" à 5', () => {
    expect(messageStreak(5)).toBe('En feu !');
  });

  it('retourne "Imbattable !" à 10', () => {
    expect(messageStreak(10)).toBe('Imbattable !');
  });

  it('retourne "Imbattable !" au-dessus de 10', () => {
    expect(messageStreak(15)).toBe('Imbattable !');
  });
});
