import { describe, it, expect } from 'vitest';
import {
  creerSessionSaisie,
  carteCouranteSaisie,
  verifierSaisie,
  scoreSaisie,
  creerSessionFrise,
  placerCarteFrise,
  retirerCarteFrise,
  nbPlacesFrise,
  estCompletFrise,
  validerOrdreFrise,
} from './restituer.js';
import { etatProgressionVide } from './persistence.js';

const CARTES_TEST = [
  { id: 1, titre: '52 av. J.-C.', date: -52, description: 'Vercingétorix à Alésia', image: '', imageSansDate: '' },
  { id: 2, titre: '451', date: 451, description: 'Attila repoussé', image: '', imageSansDate: '' },
  { id: 3, titre: '496', date: 496, description: 'Baptême de Clovis', image: '', imageSansDate: '' },
  { id: 4, titre: '732', date: 732, description: 'Charles Martel à Poitiers', image: '', imageSansDate: '' },
  { id: 5, titre: '800', date: 800, description: 'Charlemagne empereur', image: '', imageSansDate: '' },
];

// === SAISIE LIBRE ===

describe('creerSessionSaisie', () => {
  it('crée une session avec le bon nombre de cartes', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionSaisie(CARTES_TEST, progression, 3);
    expect(session.cartesIds).toHaveLength(3);
    expect(session.mode).toBe('saisie');
    expect(session.index).toBe(0);
  });
});

describe('carteCouranteSaisie', () => {
  it('retourne la carte courante', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionSaisie(CARTES_TEST, progression, 3);
    const courante = carteCouranteSaisie(session, CARTES_TEST);
    expect(courante).not.toBeNull();
    expect(courante.numero).toBe(1);
    expect(courante.total).toBe(3);
  });

  it('retourne null quand la session est terminée', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionSaisie(CARTES_TEST, progression, 1);
    verifierSaisie(session, '999', CARTES_TEST);
    expect(carteCouranteSaisie(session, CARTES_TEST)).toBeNull();
  });
});

describe('verifierSaisie', () => {
  it('valide une saisie correcte', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionSaisie(CARTES_TEST, progression, 3);
    const carteId = session.cartesIds[0];
    const carte = CARTES_TEST.find(c => c.id === carteId);
    const resultat = verifierSaisie(session, String(carte.date), CARTES_TEST);
    expect(resultat.correct).toBe(true);
  });

  it('rejette une saisie incorrecte', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionSaisie(CARTES_TEST, progression, 3);
    const resultat = verifierSaisie(session, '9999', CARTES_TEST);
    expect(resultat.correct).toBe(false);
  });

  it('accepte la saisie avec espaces autour', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionSaisie(CARTES_TEST, progression, 3);
    const carteId = session.cartesIds[0];
    const carte = CARTES_TEST.find(c => c.id === carteId);
    const resultat = verifierSaisie(session, ` ${carte.date} `, CARTES_TEST);
    expect(resultat.correct).toBe(true);
  });

  it('gère les dates négatives', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    // Forcer la carte 1 (date: -52)
    const session = { mode: 'saisie', cartesIds: [1], index: 0, resultats: [] };
    const resultat = verifierSaisie(session, '-52', CARTES_TEST);
    expect(resultat.correct).toBe(true);
  });
});

describe('scoreSaisie', () => {
  it('calcule le score', () => {
    const session = { mode: 'saisie', cartesIds: [1, 2], index: 2, resultats: [
      { carteId: 1, saisie: '-52', correct: true },
      { carteId: 2, saisie: '999', correct: false },
    ]};
    const { score, total } = scoreSaisie(session);
    expect(score).toBe(1);
    expect(total).toBe(2);
  });
});

// === FRISE CHRONOLOGIQUE ===

describe('creerSessionFrise', () => {
  it('crée une session frise', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionFrise(CARTES_TEST, progression, 3);
    expect(session.mode).toBe('frise');
    expect(session.cartes).toHaveLength(3);
    expect(session.slots).toHaveLength(3);
    expect(session.slots.every(s => s === null)).toBe(true);
  });
});

describe('placerCarteFrise', () => {
  it('place une carte dans un slot vide', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionFrise(CARTES_TEST, progression, 3);
    const carte = session.cartes[0];
    const { succes, carteRetiree } = placerCarteFrise(session, carte.id, 0, CARTES_TEST);
    expect(succes).toBe(true);
    expect(carteRetiree).toBeNull();
    expect(session.slots[0]).toBe(carte);
  });

  it('retourne la carte déplacée si le slot est occupé', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionFrise(CARTES_TEST, progression, 3);
    const c1 = session.cartes[0];
    const c2 = session.cartes[1];
    placerCarteFrise(session, c1.id, 0, CARTES_TEST);
    const { carteRetiree } = placerCarteFrise(session, c2.id, 0, CARTES_TEST);
    expect(carteRetiree).toBe(c1);
  });

  it('refuse un index invalide', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionFrise(CARTES_TEST, progression, 3);
    const { succes } = placerCarteFrise(session, session.cartes[0].id, 10, CARTES_TEST);
    expect(succes).toBe(false);
  });
});

describe('retirerCarteFrise', () => {
  it('retire une carte d\'un slot', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionFrise(CARTES_TEST, progression, 3);
    const carte = session.cartes[0];
    placerCarteFrise(session, carte.id, 0, CARTES_TEST);
    const retiree = retirerCarteFrise(session, 0);
    expect(retiree).toBe(carte);
    expect(session.slots[0]).toBeNull();
  });
});

describe('nbPlacesFrise / estCompletFrise', () => {
  it('compte les cartes placées', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionFrise(CARTES_TEST, progression, 3);
    expect(nbPlacesFrise(session)).toBe(0);
    placerCarteFrise(session, session.cartes[0].id, 0, CARTES_TEST);
    expect(nbPlacesFrise(session)).toBe(1);
    expect(estCompletFrise(session)).toBe(false);
  });
});

describe('validerOrdreFrise', () => {
  it('valide un ordre chronologique correct', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionFrise(CARTES_TEST, progression, 3);
    // Trier les cartes par date et les placer dans l'ordre
    const triees = [...session.cartes].sort((a, b) => a.date - b.date);
    triees.forEach((carte, i) => placerCarteFrise(session, carte.id, i, CARTES_TEST));

    const { score, total } = validerOrdreFrise(session);
    expect(score).toBe(total);
  });

  it('détecte un ordre incorrect', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionFrise(CARTES_TEST, progression, 3);
    // Placer dans l'ordre inverse
    const triees = [...session.cartes].sort((a, b) => b.date - a.date);
    triees.forEach((carte, i) => placerCarteFrise(session, carte.id, i, CARTES_TEST));

    const { score, total } = validerOrdreFrise(session);
    expect(score).toBeLessThan(total);
  });
});
