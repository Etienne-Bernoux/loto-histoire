/**
 * App — Shell de navigation principal.
 * Gère les transitions entre les 3 étapes et l'écran d'accueil.
 */
import { CARTES_HISTOIRE } from '../domain/cartes/cartes.js';
import { chargerProgression, chargerLudique, sauverLudique } from '../domain/progression/persistence.js';
import { majDefiDuJour } from '../domain/ludique/defi-du-jour.js';
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

  // Espace professeur
  $('lien-espace-prof')?.addEventListener('click', (e) => {
    e.preventDefault();
    ouvrirEspaceProf();
  });
  $('fermer-espace-prof')?.addEventListener('click', fermerEspaceProf);

  majAccueil();
  afficherEcran('ecran-accueil');
}

/** Ouvre l'espace professeur */
function ouvrirEspaceProf() {
  const conteneur = $('prof-cartes');

  // Sélecteur rapide + accordéon de toutes les cartes
  conteneur.innerHTML = `
    <div class="prof-select-zone">
      <label for="prof-select">Accès rapide :</label>
      <select id="prof-select" class="prof-select">
        <option value="">— Sélectionner une carte —</option>
        ${CARTES_HISTOIRE.map(c => `<option value="${c.id}">${c.dateTexte} — ${c.titre}</option>`).join('')}
      </select>
    </div>
    <div class="prof-accordeon">
      ${CARTES_HISTOIRE.map(carte => `
        <details class="prof-accordeon-item" data-id="${carte.id}">
          <summary class="prof-accordeon-header">
            <img src="${carte.image}" alt="${carte.titre}" class="prof-accordeon-img">
            <span>${carte.dateTexte} — ${carte.titre}</span>
          </summary>
          <div class="prof-accordeon-contenu" id="prof-accordeon-${carte.id}"></div>
        </details>
      `).join('')}
    </div>
    <hr class="prof-separator">
    <div class="prof-nouvelle-carte">
      <h3>Proposer une nouvelle carte</h3>
      <p>Le contenu textuel (date, titre, anecdote, paragraphe) peut être rédigé ensemble. En revanche, <strong>les illustrations doivent impérativement être fournies</strong> :</p>
      <ul>
        <li><strong>Image avec date</strong> : illustration de l'événement avec la date visible (PNG, 800x530px)</li>
        <li><strong>Image sans date</strong> : même illustration sans la date (PNG, 800x530px)</li>
      </ul>
      <p>Merci de joindre les deux images à votre email, ou d'indiquer un lien de téléchargement.</p>
      <p class="prof-section-light">Les éléments suivants sont optionnels dans votre proposition (ils peuvent être complétés ensuite) :</p>
      <ul class="prof-liste-light">
        <li>Date et titre de l'événement</li>
        <li>Anecdote (1-2 phrases accrocheuses)</li>
        <li>Paragraphe explicatif (3-5 phrases, vocabulaire simple)</li>
        <li>Source (herodote.net ou site spécialisé)</li>
      </ul>
      <a class="btn btn-principal prof-btn-mail" href="mailto:etienne@bernoux.fr?subject=${encodeURIComponent("[Loto d'Histoire] Proposition de nouvelle carte")}&body=${encodeURIComponent("Bonjour,\n\nJe souhaite proposer une nouvelle carte :\n\nDate : \nTitre : \nDescription : \nAnecdote : \nParagraphe explicatif : \nSource : \n\nMerci,")}">
        Proposer une nouvelle carte
      </a>
    </div>
  `;

  // Remplir le contenu d'un accordéon au premier clic (lazy)
  conteneur.querySelectorAll('.prof-accordeon-item').forEach(details => {
    details.addEventListener('toggle', () => {
      if (!details.open) return;
      const id = parseInt(details.dataset.id);
      const carte = CARTES_HISTOIRE.find(c => c.id === id);
      const contenu = details.querySelector('.prof-accordeon-contenu');
      if (contenu.innerHTML) return; // déjà rempli
      afficherDetailProf(contenu, carte);
    });
  });

  // Select rapide → ouvre l'accordéon correspondant et scroll
  conteneur.querySelector('#prof-select').addEventListener('change', (e) => {
    const id = e.target.value;
    if (!id) return;
    // Fermer tous les autres
    conteneur.querySelectorAll('.prof-accordeon-item').forEach(d => d.open = false);
    // Ouvrir le bon
    const target = conteneur.querySelector(`.prof-accordeon-item[data-id="${id}"]`);
    if (target) {
      target.open = true;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  $('espace-prof').classList.remove('cache');
  $('espace-prof').scrollIntoView({ behavior: 'smooth' });
}

/** Affiche le détail d'une carte dans l'espace prof (accordéon) */
function afficherDetailProf(conteneur, carte) {
  const sourcesHtml = carte.sources?.length
    ? carte.sources.map(s => `<a href="${s}" target="_blank" rel="noopener">${s}</a>`).join(', ')
    : '<em>Aucune</em>';

  conteneur.innerHTML = `
    <p class="prof-carte-desc">${carte.description}</p>
    <div class="prof-carte-contenu">
      <div class="prof-section">
        <strong>Anecdote</strong>
        <p>${carte.anecdote || '<em>Non renseignée</em>'}</p>
      </div>
      <div class="prof-section">
        <strong>Paragraphe explicatif</strong>
        <p>${carte.paragraphe || '<em>Non renseigné</em>'}</p>
      </div>
      <div class="prof-section">
        <strong>Sources</strong>
        <p>${sourcesHtml}</p>
      </div>
    </div>
    <a class="btn prof-btn-mail" href="mailto:etienne@bernoux.fr?subject=${encodeURIComponent(`[Loto d'Histoire] Carte ${carte.dateTexte} — ${carte.titre}`)}&body=${encodeURIComponent(`Bonjour,\n\nJe souhaite proposer une modification pour la carte :\n\n${carte.dateTexte} — ${carte.titre}\n${carte.description}\n\nAnecdote actuelle :\n${carte.anecdote}\n\nParagraphe actuel :\n${carte.paragraphe}\n\nModification proposée :\n\n\n\nMerci,`)}">
      Proposer une modification
    </a>
  `;
}

/** Ferme l'espace professeur */
function fermerEspaceProf() {
  $('espace-prof').classList.add('cache');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', init);
