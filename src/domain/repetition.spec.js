import { describe, it, expect } from 'vitest';
import {
  estMaitrisee,
  estDuePourConsolidation,
  calculerProchainPassage,
  selectionnerCartes,
  enregistrerResultat,
} from './repetition.js';
import { etatProgressionVide } from './persistence.js';

const CARTES_TEST = [
  { id: 1, titre: '1515', date: 1515 },
  { id: 2, titre: '1789', date: 1789 },
  { id: 3, titre: '-52', date: -52 },
  { id: 4, titre: '800', date: 800 },
  { id: 5, titre: '1214', date: 1214 },
];

describe('estMaitrisee', () => {
  it('retourne false sous le seuil', () => {
    expect(estMaitrisee({ successConsecutifs: 2 })).toBe(false);
  });

  it('retourne true au seuil', () => {
    expect(estMaitrisee({ successConsecutifs: 3 })).toBe(true);
  });

  it('retourne true au-dessus du seuil', () => {
    expect(estMaitrisee({ successConsecutifs: 5 })).toBe(true);
  });
});

describe('estDuePourConsolidation', () => {
  it('retourne false si pas maîtrisée', () => {
    expect(estDuePourConsolidation({ maitrisee: false, prochainPassage: null })).toBe(false);
  });

  it('retourne false si pas encore due', () => {
    const demain = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();
    expect(estDuePourConsolidation(
      { maitrisee: true, prochainPassage: demain },
      new Date()
    )).toBe(false);
  });

  it('retourne true si la date est passée', () => {
    const hier = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    expect(estDuePourConsolidation(
      { maitrisee: true, prochainPassage: hier },
      new Date()
    )).toBe(true);
  });
});

describe('calculerProchainPassage', () => {
  it('retourne +1 jour pour la première consolidation', () => {
    const maintenant = new Date('2026-03-15T12:00:00Z');
    const etat = { totalReussites: 3 };
    const passage = calculerProchainPassage(etat, maintenant);
    expect(new Date(passage).toISOString()).toBe('2026-03-16T12:00:00.000Z');
  });

  it('retourne +3 jours après une consolidation réussie', () => {
    const maintenant = new Date('2026-03-15T12:00:00Z');
    const etat = { totalReussites: 4 };
    const passage = calculerProchainPassage(etat, maintenant);
    expect(new Date(passage).toISOString()).toBe('2026-03-18T12:00:00.000Z');
  });

  it('plafonne à 14 jours', () => {
    const maintenant = new Date('2026-03-15T12:00:00Z');
    const etat = { totalReussites: 20 };
    const passage = calculerProchainPassage(etat, maintenant);
    expect(new Date(passage).toISOString()).toBe('2026-03-29T12:00:00.000Z');
  });
});

describe('selectionnerCartes', () => {
  it('sélectionne des cartes jamais vues en priorité', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const selection = selectionnerCartes(progression, CARTES_TEST, 3);
    expect(selection).toHaveLength(3);
    // Toutes les cartes sont jamais vues, on en récupère 3
    for (const id of selection) {
      expect(CARTES_TEST.map(c => c.id)).toContain(id);
    }
  });

  it('priorise les cartes échouées', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    // Carte 1 : échouée (totalEchecs > 0, successConsecutifs = 0)
    progression.cartes[1].totalEchecs = 2;
    progression.cartes[1].totalReussites = 1;
    // Carte 2 : jamais vue (par défaut)
    // Carte 3 : en cours (non maîtrisée, quelques succès)
    progression.cartes[3].totalReussites = 1;
    progression.cartes[3].successConsecutifs = 1;

    const selection = selectionnerCartes(progression, CARTES_TEST, 2);
    // La carte échouée doit apparaître en premier
    expect(selection[0]).toBe(1);
  });

  it('respecte le nombre demandé', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const selection = selectionnerCartes(progression, CARTES_TEST, 2);
    expect(selection).toHaveLength(2);
  });

  it('ne sélectionne pas les cartes maîtrisées non dues', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    // Maîtriser toutes les cartes sauf la 5
    for (let i = 1; i <= 4; i++) {
      progression.cartes[i].maitrisee = true;
      progression.cartes[i].successConsecutifs = 3;
      progression.cartes[i].totalReussites = 3;
      progression.cartes[i].prochainPassage = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    }

    const selection = selectionnerCartes(progression, CARTES_TEST, 3);
    // Seule la carte 5 (jamais vue) devrait être sélectionnée
    expect(selection).toHaveLength(1);
    expect(selection[0]).toBe(5);
  });
});

describe('enregistrerResultat', () => {
  it('incrémente les succès consécutifs sur réussite', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const nouveau = enregistrerResultat(progression, 1, true);
    expect(nouveau.cartes[1].successConsecutifs).toBe(1);
    expect(nouveau.cartes[1].totalReussites).toBe(1);
  });

  it('réinitialise les succès consécutifs sur échec', () => {
    let progression = etatProgressionVide(CARTES_TEST);
    progression = enregistrerResultat(progression, 1, true);
    progression = enregistrerResultat(progression, 1, true);
    progression = enregistrerResultat(progression, 1, false);
    expect(progression.cartes[1].successConsecutifs).toBe(0);
    expect(progression.cartes[1].totalEchecs).toBe(1);
  });

  it('marque une carte comme maîtrisée après 3 succès consécutifs', () => {
    let progression = etatProgressionVide(CARTES_TEST);
    progression = enregistrerResultat(progression, 1, true);
    progression = enregistrerResultat(progression, 1, true);
    expect(progression.cartes[1].maitrisee).toBe(false);
    progression = enregistrerResultat(progression, 1, true);
    expect(progression.cartes[1].maitrisee).toBe(true);
    expect(progression.cartes[1].prochainPassage).not.toBeNull();
  });

  it('ne mute pas l\'état original', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const nouveau = enregistrerResultat(progression, 1, true);
    expect(progression.cartes[1].successConsecutifs).toBe(0);
    expect(nouveau.cartes[1].successConsecutifs).toBe(1);
  });

  it('perd la maîtrise sur un échec', () => {
    let progression = etatProgressionVide(CARTES_TEST);
    progression = enregistrerResultat(progression, 1, true);
    progression = enregistrerResultat(progression, 1, true);
    progression = enregistrerResultat(progression, 1, true);
    expect(progression.cartes[1].maitrisee).toBe(true);

    progression = enregistrerResultat(progression, 1, false);
    expect(progression.cartes[1].maitrisee).toBe(false);
    expect(progression.cartes[1].prochainPassage).toBeNull();
  });

  it('met à jour la date de dernière interaction', () => {
    const progression = etatProgressionVide(CARTES_TEST);
    const date = new Date('2026-03-15T10:00:00Z');
    const nouveau = enregistrerResultat(progression, 1, true, date);
    expect(nouveau.cartes[1].derniereInteraction).toBe('2026-03-15T10:00:00.000Z');
  });
});
