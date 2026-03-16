import { describe, it, expect } from 'vitest';
import { commentaireReussite, commentaireErreur, commentaireStreak } from './personnage.js';

describe('commentaireReussite', () => {
  it('retourne une réplique spécifique pour certaines cartes', () => {
    expect(commentaireReussite({ id: 17 })).toBe('François Iᵉʳ serait fier de toi !');
  });

  it('retourne une réplique générique pour les autres', () => {
    const commentaire = commentaireReussite({ id: 99 });
    expect(typeof commentaire).toBe('string');
    expect(commentaire.length).toBeGreaterThan(0);
  });
});

describe('commentaireErreur', () => {
  it('retourne un encouragement', () => {
    const commentaire = commentaireErreur();
    expect(typeof commentaire).toBe('string');
    expect(commentaire.length).toBeGreaterThan(0);
  });
});

describe('commentaireStreak', () => {
  it('retourne un message pour le palier 3', () => {
    expect(commentaireStreak(3)).toBe('Trois d\'affilée, bien joué !');
  });

  it('retourne un message pour le palier 5', () => {
    expect(commentaireStreak(5)).toBe('Cinq de suite ! Tu es en feu !');
  });

  it('retourne un message pour le palier 10', () => {
    expect(commentaireStreak(10)).toBe('Dix ! Tu es imbattable, quel talent !');
  });

  it('retourne null hors palier', () => {
    expect(commentaireStreak(4)).toBeNull();
    expect(commentaireStreak(7)).toBeNull();
  });
});
