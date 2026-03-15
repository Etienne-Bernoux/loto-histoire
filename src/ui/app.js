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

/** Met à jour l'accueil (maestro, stats, défi, progression) */
function majAccueil() {
  progression = chargerProgression(CARTES_HISTOIRE);
  ludique = chargerLudique();

  // Défi du jour
  const aujourdhui = new Date().toISOString().slice(0, 10);
  ludique = majDefiDuJour(ludique, CARTES_HISTOIRE, aujourdhui);
  sauverLudique(ludique);

  // Progression
  const progressionEl = $('zone-progression');
  if (progressionEl) afficherProgression(progressionEl);

  // Maestro
  const maestroEl = $('zone-maestro');
  if (maestroEl) {
    const maitrisees = Object.values(progression.cartes).filter(c => c.maitrisee).length;
    let message;
    if (maitrisees === 0) message = 'Bienvenue jeune explorateur ! Prêt à voyager dans le temps ?';
    else if (maitrisees < 10) message = `Tu as déjà maîtrisé ${maitrisees} carte${maitrisees > 1 ? 's' : ''}. Continue comme ça !`;
    else if (maitrisees < 27) message = `${maitrisees} cartes maîtrisées ! Tu deviens un vrai historien !`;
    else message = 'Tu as tout maîtrisé ! Tu es un maître du temps !';

    maestroEl.innerHTML = `
      <img class="accueil-maestro-img" src="images/sage.svg" alt="Maestro" width="60" height="60">
      <p class="accueil-maestro-bulle">${message}</p>
    `;
  }

  // Stats rapides
  const statsEl = $('zone-stats');
  if (statsEl) {
    statsEl.innerHTML = `
      <div class="accueil-stat">
        <span class="stat-valeur">${ludique.streakActuel}</span>
        <span class="stat-label">série en cours</span>
      </div>
      <div class="accueil-stat">
        <span class="stat-valeur">${ludique.meilleurStreak}</span>
        <span class="stat-label">meilleure série</span>
      </div>
      <div class="accueil-stat">
        <span class="stat-valeur">${Object.values(progression.cartes).filter(c => c.maitrisee).length}</span>
        <span class="stat-label">maîtrisées</span>
      </div>
    `;
  }

  // Défi du jour
  const defiEl = $('zone-defi');
  if (defiEl && ludique.defiDuJour) {
    const cartes = ludique.defiDuJour.carteIds.map(id => CARTES_HISTOIRE.find(c => c.id === id)).filter(Boolean);
    defiEl.innerHTML = `
      <h3 class="defi-titre">Défi du jour</h3>
      <div class="defi-cartes">
        ${cartes.map(c => `<div class="defi-carte">
          <img src="${c.image}" alt="${c.titre}">
          <span>${c.dateTexte}</span>
        </div>`).join('')}
      </div>
      <button class="btn btn-principal" id="btn-defi">Jouer le défi !</button>
    `;
    $('btn-defi')?.addEventListener('click', () => {
      initialiserAssocier($('ecran-associer'), {
        nbCartes: 5,
        cartesIds: ludique.defiDuJour.carteIds,
        onFin: (score, total) => afficherFin(score, total),
      });
      afficherEcran('ecran-associer');
    });
  }
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
