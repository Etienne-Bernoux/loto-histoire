/**
 * UI — Étape 1 : Découvrir
 * Navigation libre dans les cartes historiques.
 */
import { CARTES_HISTOIRE } from '../domain/cartes.js';

let carteIndex = 0;
let conteneurGrille = null;
let conteneurDetail = null;
let anecdotesDeverrouillees = [];

/** Initialise l'écran Découvrir */
export function initialiserDecouvrir(ecran, ludique) {
  anecdotesDeverrouillees = ludique?.anecdotesDeverrouillees ?? [];

  // Supprimer le contenu précédent sans toucher au jeu-header
  const ancien = ecran.querySelector('.decouvrir-grille-conteneur');
  if (ancien) ancien.remove();
  const ancienDetail = ecran.querySelector('.decouvrir-detail');
  if (ancienDetail) ancienDetail.remove();

  // Vue grille
  conteneurGrille = document.createElement('div');
  conteneurGrille.className = 'decouvrir-grille-conteneur';
  conteneurGrille.innerHTML = '<h2>Explore les cartes</h2>';

  const grille = document.createElement('div');
  grille.className = 'decouvrir-grille';

  for (const carte of CARTES_HISTOIRE) {
    const el = document.createElement('div');
    el.className = 'decouvrir-vignette';
    el.innerHTML = `
      <img src="${carte.image}" alt="${carte.description}">
      <span class="vignette-titre">${carte.dateTexte}</span>
      <span class="vignette-nom">${carte.titre}</span>
    `;
    el.addEventListener('click', () => afficherDetail(carte.id));
    grille.appendChild(el);
  }

  conteneurGrille.appendChild(grille);
  ecran.appendChild(conteneurGrille);

  // Vue détail (cachée au départ)
  conteneurDetail = document.createElement('div');
  conteneurDetail.className = 'decouvrir-detail cache';
  ecran.appendChild(conteneurDetail);
}

/** Affiche le détail d'une carte */
function afficherDetail(carteId) {
  const carte = CARTES_HISTOIRE.find(c => c.id === carteId);
  if (!carte) return;

  carteIndex = CARTES_HISTOIRE.indexOf(carte);
  renderDetail(carte);
  conteneurGrille.classList.add('cache');
  conteneurDetail.classList.remove('cache');
  // Cacher le jeu-header pour éviter le double bouton retour
  const header = conteneurGrille.closest('.ecran')?.querySelector('.jeu-header');
  if (header) header.classList.add('cache');
}

/** Rend le contenu détaillé d'une carte */
function renderDetail(carte) {
  const anecdoteDebloquee = anecdotesDeverrouillees.includes(carte.id);
  const anecdoteHtml = carte.anecdote
    ? (anecdoteDebloquee
      ? `<p class="detail-anecdote">${carte.anecdote}</p>`
      : `<p class="detail-anecdote verrouillee">Réussis cette carte pour débloquer l'anecdote !</p>`)
    : '';

  const paragrapheHtml = carte.paragraphe
    ? `<p class="detail-paragraphe">${carte.paragraphe}</p>`
    : '';

  conteneurDetail.innerHTML = `
    <div class="detail-nav">
      <button class="btn btn-retour" id="detail-retour-grille">Retour</button>
      <div class="detail-nav-fleches">
        <button class="btn" id="detail-precedent" ${carteIndex === 0 ? 'disabled' : ''}>&#8592;</button>
        <span>${carteIndex + 1} / ${CARTES_HISTOIRE.length}</span>
        <button class="btn" id="detail-suivant" ${carteIndex === CARTES_HISTOIRE.length - 1 ? 'disabled' : ''}>&#8594;</button>
      </div>
    </div>
    <div class="detail-contenu">
      <div class="detail-image">
        <img src="${carte.image}" alt="${carte.description}">
      </div>
      <h2>${carte.dateTexte} — ${carte.titre}</h2>
      <p class="detail-description">${carte.description}</p>
      ${anecdoteHtml}
      ${paragrapheHtml}
    </div>
  `;

  // Événements navigation
  conteneurDetail.querySelector('#detail-retour-grille')
    .addEventListener('click', retourGrille);
  conteneurDetail.querySelector('#detail-precedent')
    .addEventListener('click', () => naviguer(-1));
  conteneurDetail.querySelector('#detail-suivant')
    .addEventListener('click', () => naviguer(1));
}

/** Navigue vers la carte précédente ou suivante */
function naviguer(direction) {
  const nouvelIndex = carteIndex + direction;
  if (nouvelIndex < 0 || nouvelIndex >= CARTES_HISTOIRE.length) return;
  carteIndex = nouvelIndex;
  renderDetail(CARTES_HISTOIRE[carteIndex]);
}

/** Retour à la grille */
function retourGrille() {
  conteneurDetail.classList.add('cache');
  conteneurGrille.classList.remove('cache');
  // Réafficher le jeu-header
  const header = conteneurGrille.closest('.ecran')?.querySelector('.jeu-header');
  if (header) header.classList.remove('cache');
}
