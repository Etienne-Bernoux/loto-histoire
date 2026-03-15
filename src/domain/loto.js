/**
 * Domain - Logique du mode Loto
 * Gère l'état d'une partie de loto (tirage de dates, vérification des réponses)
 */
import { melanger } from './melanger.js';

export function creerPartieLoto(cartes, nbCartes = 9) {
  const carteMelangees = melanger(cartes);
  const cartesPlateau = carteMelangees.slice(0, nbCartes);

  return {
    cartesPlateau,
    cartesPlateauMelangees: melanger([...cartesPlateau]),
    cartesATirer: melanger([...cartesPlateau]),
    carteTiree: null,
    trouvees: new Set(),
    attenteReponse: false,
  };
}

export function tirerDate(partie) {
  if (partie.cartesATirer.length === 0) return null;

  const carte = partie.cartesATirer.pop();
  partie.carteTiree = carte;
  partie.attenteReponse = true;
  return carte;
}

export function verifierReponse(partie, idChoisi) {
  if (!partie.attenteReponse || !partie.carteTiree) {
    return { valide: false, raison: 'pas_de_tirage' };
  }

  if (partie.trouvees.has(idChoisi)) {
    return { valide: false, raison: 'deja_trouvee' };
  }

  if (idChoisi === partie.carteTiree.id) {
    partie.trouvees.add(idChoisi);
    partie.attenteReponse = false;
    const termine = partie.trouvees.size === partie.cartesPlateau.length;
    return { valide: true, correct: true, termine };
  }

  return { valide: true, correct: false };
}

export function scoreActuel(partie) {
  return {
    trouvees: partie.trouvees.size,
    total: partie.cartesPlateau.length,
  };
}
