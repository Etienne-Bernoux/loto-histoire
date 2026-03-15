import { describe, it, expect, beforeEach } from 'vitest';
import {
  etatProgressionVide,
  etatLudiqueVide,
  chargerProgression,
  sauverProgression,
  chargerLudique,
  sauverLudique,
} from './persistence.js';

/** Fake storage en mémoire */
function creerFakeStorage() {
  const store = {};
  return {
    getItem: (cle) => store[cle] ?? null,
    setItem: (cle, valeur) => { store[cle] = valeur; },
    removeItem: (cle) => { delete store[cle]; },
  };
}

const CARTES_TEST = [
  { id: 1, titre: '1515', date: 1515 },
  { id: 2, titre: '1789', date: 1789 },
];

describe('etatProgressionVide', () => {
  it('crée un état pour chaque carte', () => {
    const etat = etatProgressionVide(CARTES_TEST);
    expect(Object.keys(etat.cartes)).toHaveLength(2);
    expect(etat.cartes[1].successConsecutifs).toBe(0);
    expect(etat.cartes[1].maitrisee).toBe(false);
    expect(etat.version).toBe(1);
  });

  it('gère un tableau vide', () => {
    const etat = etatProgressionVide([]);
    expect(Object.keys(etat.cartes)).toHaveLength(0);
  });
});

describe('etatLudiqueVide', () => {
  it('retourne un état ludique par défaut', () => {
    const etat = etatLudiqueVide();
    expect(etat.streakActuel).toBe(0);
    expect(etat.anecdotesDeverrouillees).toEqual([]);
    expect(etat.defiDuJour).toBeNull();
    expect(etat.version).toBe(1);
  });
});

describe('chargerProgression / sauverProgression', () => {
  let storage;

  beforeEach(() => {
    storage = creerFakeStorage();
  });

  it('retourne un état vide si rien en storage', () => {
    const etat = chargerProgression(CARTES_TEST, storage);
    expect(Object.keys(etat.cartes)).toHaveLength(2);
    expect(etat.cartes[1].successConsecutifs).toBe(0);
  });

  it('sauvegarde et recharge la progression', () => {
    const etat = etatProgressionVide(CARTES_TEST);
    etat.cartes[1].successConsecutifs = 2;
    sauverProgression(etat, storage);

    const recharge = chargerProgression(CARTES_TEST, storage);
    expect(recharge.cartes[1].successConsecutifs).toBe(2);
  });

  it('ajoute les nouvelles cartes absentes au rechargement', () => {
    const etat = etatProgressionVide([CARTES_TEST[0]]);
    sauverProgression(etat, storage);

    const recharge = chargerProgression(CARTES_TEST, storage);
    expect(recharge.cartes[2]).toBeDefined();
    expect(recharge.cartes[2].successConsecutifs).toBe(0);
  });

  it('retourne un état vide si JSON corrompu', () => {
    storage.setItem('loto-histoire-progression', 'pas du json');
    const etat = chargerProgression(CARTES_TEST, storage);
    expect(Object.keys(etat.cartes)).toHaveLength(2);
  });
});

describe('chargerLudique / sauverLudique', () => {
  let storage;

  beforeEach(() => {
    storage = creerFakeStorage();
  });

  it('retourne un état vide si rien en storage', () => {
    const etat = chargerLudique(storage);
    expect(etat.streakActuel).toBe(0);
  });

  it('sauvegarde et recharge l\'état ludique', () => {
    const etat = etatLudiqueVide();
    etat.streakActuel = 5;
    sauverLudique(etat, storage);

    const recharge = chargerLudique(storage);
    expect(recharge.streakActuel).toBe(5);
  });

  it('retourne un état vide si JSON corrompu', () => {
    storage.setItem('loto-histoire-ludique', '{corrompu');
    const etat = chargerLudique(storage);
    expect(etat.streakActuel).toBe(0);
  });
});
