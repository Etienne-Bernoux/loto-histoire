/**
 * App — Shell de navigation principal.
 * Gère les transitions entre les 3 étapes et l'écran d'accueil.
 */
import { CARTES_HISTOIRE } from '../domain/cartes.js';
import { chargerProgression, chargerLudique, sauverLudique } from '../domain/persistence.js';
import { majDefiDuJour } from '../domain/defi-du-jour.js';
import { initialiserDecouvrir } from './decouvrir.js';
import { initialiserAssocier } from './associer.js';
import { initialiserRestituer } from './restituer.js';
import { afficherProgression } from './progression.js';
import { cacherPersonnage } from './personnage-ui.js';

const $ = (id) => document.getElementById(id);

let progression = null;
let ludique = null;

/** Affiche un écran et cache les autres */
function afficherEcran(id) {
  document.querySelectorAll('.ecran').forEach(e => e.classList.add('cache'));
  $(id).classList.remove('cache');
}

/** Retour à l'accueil */
function retourAccueil() {
  cacherPersonnage();
  majAccueil();
  afficherEcran('ecran-accueil');
}

/** Met à jour l'accueil (progression + défi du jour) */
function majAccueil() {
  const progressionEl = document.getElementById('zone-progression');
  if (progressionEl) afficherProgression(progressionEl);

  // Défi du jour
  const aujourdhui = new Date().toISOString().slice(0, 10);
  ludique = chargerLudique();
  ludique = majDefiDuJour(ludique, CARTES_HISTOIRE, aujourdhui);
  sauverLudique(ludique);
}

/** Lancer l'étape Découvrir */
function lancerDecouvrir() {
  ludique = chargerLudique();
  initialiserDecouvrir($('ecran-decouvrir'), ludique);
  afficherEcran('ecran-decouvrir');
}

/** Lancer l'étape Associer */
function lancerAssocier() {
  initialiserAssocier($('ecran-associer'), {
    nbCartes: 10,
    onFin: (score, total) => afficherFin(score, total),
  });
  afficherEcran('ecran-associer');
}

/** Affiche l'écran de fin avec le score */
function afficherFin(score, total) {
  afficherEcran('ecran-fin');
  $('fin-titre').textContent = score === total ? 'Parfait !' : score >= total * 0.7 ? 'Très bien !' : score >= total * 0.4 ? 'Pas mal !' : 'Continue !';
  $('fin-message').textContent = `${score} bonne${score > 1 ? 's' : ''} réponse${score > 1 ? 's' : ''} sur ${total}`;
  $('fin-details').textContent = '';
}

/** Lancer l'étape Restituer */
function lancerRestituer() {
  initialiserRestituer($('ecran-restituer'), {
    nbCartes: 6,
    onFin: (score, total) => afficherFin(score, total),
  });
  afficherEcran('ecran-restituer');
}

// --- Initialisation ---
function init() {
  progression = chargerProgression(CARTES_HISTOIRE);
  ludique = chargerLudique();

  // Boutons de l'écran d'accueil
  $('btn-decouvrir').addEventListener('click', lancerDecouvrir);
  $('btn-associer').addEventListener('click', lancerAssocier);
  $('btn-restituer').addEventListener('click', lancerRestituer);

  // Boutons retour
  document.querySelectorAll('.btn-retour-accueil').forEach(btn => {
    btn.addEventListener('click', retourAccueil);
  });

  majAccueil();
  afficherEcran('ecran-accueil');
}

document.addEventListener('DOMContentLoaded', init);
