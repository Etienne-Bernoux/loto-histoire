import { describe, it, expect } from 'vitest';
import {
  creerSessionMemory,
  retournerTuile,
  cacherTuiles,
  estTermineMemory,
  scoreMemory,
} from './memory.js';
import { etatProgressionVide } from '../progression/persistence.js';

const CARTES_TEST = [
  { id: 1, dateTexte: '52 av. J.-C.', date: -52, titre: 'Siège d\'Alésia', image: 'img1.png', description: '' },
  { id: 2, dateTexte: '451', date: 451, titre: 'Champs Catalauniques', image: 'img2.png', description: '' },
  { id: 3, dateTexte: '496', date: 496, titre: 'Baptême de Clovis', image: 'img3.png', description: '' },
  { id: 4, dateTexte: '732', date: 732, titre: 'Bataille de Poitiers', image: 'img4.png', description: '' },
  { id: 5, dateTexte: '800', date: 800, titre: 'Couronnement de Charlemagne', image: 'img5.png', description: '' },
  { id: 6, dateTexte: '843', date: 843, titre: 'Traité de Verdun', image: 'img6.png', description: '' },
  { id: 7, dateTexte: '885', date: 885, titre: 'Siège de Paris', image: 'img7.png', description: '' },
];

describe('creerSessionMemory', () => {
  it('crée 12 tuiles pour 6 paires', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionMemory(CARTES_TEST, progression, 6);
    expect(session.tuiles).toHaveLength(12);
    expect(session.coups).toBe(0);
    expect(session.trouvees.size).toBe(0);
  });

  it('chaque paire a une tuile image et une tuile titre', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionMemory(CARTES_TEST, progression, 3);
    expect(session.tuiles).toHaveLength(6);

    const parCarteId = {};
    for (const tuile of session.tuiles) {
      if (!parCarteId[tuile.carteId]) parCarteId[tuile.carteId] = [];
      parCarteId[tuile.carteId].push(tuile.type);
    }

    for (const types of Object.values(parCarteId)) {
      expect(types).toContain('image');
      expect(types).toContain('titre');
    }
  });
});

describe('retournerTuile', () => {
  it('première tuile retourne "premiere"', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionMemory(CARTES_TEST, progression, 3);
    const resultat = retournerTuile(session, 0);
    expect(resultat.action).toBe('premiere');
  });

  it('ignore une tuile déjà retournée', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionMemory(CARTES_TEST, progression, 3);
    retournerTuile(session, 0);
    const resultat = retournerTuile(session, 0);
    expect(resultat.action).toBe('ignore');
  });

  it('détecte une paire', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionMemory(CARTES_TEST, progression, 3);

    // Trouver deux tuiles de la même carte
    const carteId = session.tuiles[0].carteId;
    const idx1 = session.tuiles.findIndex(t => t.carteId === carteId && t.type === 'image');
    const idx2 = session.tuiles.findIndex(t => t.carteId === carteId && t.type === 'titre');

    retournerTuile(session, idx1);
    const resultat = retournerTuile(session, idx2);
    expect(resultat.action).toBe('paire');
    expect(resultat.carteId).toBe(carteId);
    expect(session.trouvees.has(carteId)).toBe(true);
  });

  it('détecte un échec', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionMemory(CARTES_TEST, progression, 3);

    // Trouver deux tuiles de cartes différentes
    const id1 = session.tuiles[0].carteId;
    const idx2 = session.tuiles.findIndex(t => t.carteId !== id1);

    retournerTuile(session, 0);
    const resultat = retournerTuile(session, idx2);
    expect(resultat.action).toBe('echec');
  });

  it('incrémente les coups à chaque paire de retournements', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionMemory(CARTES_TEST, progression, 3);

    const id1 = session.tuiles[0].carteId;
    const idx2 = session.tuiles.findIndex(t => t.carteId !== id1);

    retournerTuile(session, 0);
    retournerTuile(session, idx2);
    expect(session.coups).toBe(1);
  });
});

describe('cacherTuiles', () => {
  it('réinitialise les tuiles retournées', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionMemory(CARTES_TEST, progression, 3);

    retournerTuile(session, 0);
    retournerTuile(session, 1);
    cacherTuiles(session);
    expect(session.retournees).toEqual([]);
  });
});

describe('estTermineMemory', () => {
  it('retourne false en cours de partie', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionMemory(CARTES_TEST, progression, 3);
    expect(estTermineMemory(session)).toBe(false);
  });

  it('retourne true quand toutes les paires sont trouvées', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionMemory(CARTES_TEST, progression, 3);

    // Trouver toutes les paires
    const cartesVues = new Set();
    for (const tuile of session.tuiles) {
      if (!cartesVues.has(tuile.carteId)) {
        cartesVues.add(tuile.carteId);
        const idx1 = session.tuiles.findIndex(t => t.carteId === tuile.carteId && t.type === 'image');
        const idx2 = session.tuiles.findIndex(t => t.carteId === tuile.carteId && t.type === 'titre');
        retournerTuile(session, idx1);
        retournerTuile(session, idx2);
      }
    }

    expect(estTermineMemory(session)).toBe(true);
  });
});

describe('scoreMemory', () => {
  it('retourne le score correct', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const session = creerSessionMemory(CARTES_TEST, progression, 3);
    const { coups, paires, total } = scoreMemory(session);
    expect(coups).toBe(0);
    expect(paires).toBe(0);
    expect(total).toBe(3);
  });
});
