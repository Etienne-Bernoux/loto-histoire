import { describe, it, expect } from 'vitest';
import {
  creerSessionAssocier,
  genererQuestion,
  repondreAssocier,
  scoreAssocier,
} from './associer.js';
import { etatProgressionVide } from './persistence.js';

const CARTES_TEST = [
  { id: 1, dateTexte: '52 av. J.-C.', date: -52, description: 'Vercingétorix à Alésia', image: '', imageSansDate: '' },
  { id: 2, dateTexte: '451', date: 451, description: 'Attila repoussé', image: '', imageSansDate: '' },
  { id: 3, dateTexte: '496', date: 496, description: 'Baptême de Clovis', image: '', imageSansDate: '' },
  { id: 4, dateTexte: '732', date: 732, description: 'Charles Martel à Poitiers', image: '', imageSansDate: '' },
  { id: 5, dateTexte: '800', date: 800, description: 'Charlemagne empereur', image: '', imageSansDate: '' },
];

describe('creerSessionAssocier', () => {
  it('crée une session avec le bon nombre de cartes', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionAssocier(CARTES_TEST, progression, 3);
    expect(session.cartesIds).toHaveLength(3);
    expect(session.index).toBe(0);
    expect(session.resultats).toEqual([]);
  });

  it('ne dépasse pas le nombre de cartes disponibles', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionAssocier(CARTES_TEST, progression, 20);
    expect(session.cartesIds.length).toBeLessThanOrEqual(5);
  });
});

describe('genererQuestion', () => {
  it('génère une question avec 4 choix', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionAssocier(CARTES_TEST, progression, 3);
    const question = genererQuestion(session, CARTES_TEST);

    expect(question).not.toBeNull();
    expect(question.choix).toHaveLength(4);
    expect(question.numero).toBe(1);
    expect(question.total).toBe(3);
    expect(['image-vers-date', 'date-vers-evenement']).toContain(question.sousMode);
  });

  it('contient la bonne réponse dans les choix', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionAssocier(CARTES_TEST, progression, 3);
    const question = genererQuestion(session, CARTES_TEST);

    const bonneReponse = question.choix.find(c => c.id === question.carte.id);
    expect(bonneReponse).toBeDefined();
  });

  it('retourne null quand la session est terminée', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionAssocier(CARTES_TEST, progression, 1);
    // Répondre à la première question
    repondreAssocier(session, session.cartesIds[0], CARTES_TEST);
    const question = genererQuestion(session, CARTES_TEST);
    expect(question).toBeNull();
  });
});

describe('repondreAssocier', () => {
  it('détecte une bonne réponse', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionAssocier(CARTES_TEST, progression, 3);
    const carteId = session.cartesIds[0];

    const resultat = repondreAssocier(session, carteId, CARTES_TEST);
    expect(resultat.correct).toBe(true);
    expect(resultat.bonneReponse.id).toBe(carteId);
  });

  it('détecte une mauvaise réponse', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionAssocier(CARTES_TEST, progression, 3);
    const carteId = session.cartesIds[0];
    const mauvaisId = CARTES_TEST.find(c => c.id !== carteId).id;

    const resultat = repondreAssocier(session, mauvaisId, CARTES_TEST);
    expect(resultat.correct).toBe(false);
  });

  it('avance l\'index après chaque réponse', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionAssocier(CARTES_TEST, progression, 3);

    repondreAssocier(session, session.cartesIds[0], CARTES_TEST);
    expect(session.index).toBe(1);

    repondreAssocier(session, session.cartesIds[1], CARTES_TEST);
    expect(session.index).toBe(2);
  });

  it('indique quand la session est terminée', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionAssocier(CARTES_TEST, progression, 2);

    const r1 = repondreAssocier(session, session.cartesIds[0], CARTES_TEST);
    expect(r1.termine).toBe(false);

    const r2 = repondreAssocier(session, session.cartesIds[1], CARTES_TEST);
    expect(r2.termine).toBe(true);
  });
});

describe('scoreAssocier', () => {
  it('calcule le score correctement', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionAssocier(CARTES_TEST, progression, 3);

    // Bonne réponse
    repondreAssocier(session, session.cartesIds[0], CARTES_TEST);
    // Mauvaise réponse
    const mauvaisId = CARTES_TEST.find(c => c.id !== session.cartesIds[1]).id;
    repondreAssocier(session, mauvaisId, CARTES_TEST);

    const { score, total } = scoreAssocier(session);
    expect(score).toBe(1);
    expect(total).toBe(3);
  });
});
