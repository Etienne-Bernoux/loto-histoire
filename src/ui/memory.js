/**
 * UI — Memory
 * Jeu de paires : retourner des cartes pour matcher image ↔ titre.
 */
import { CARTES_HISTOIRE } from '../domain/cartes/cartes.js';
import {
  creerSessionMemory,
  retournerTuile,
  cacherTuiles,
  estTermineMemory,
  scoreMemory,
} from '../domain/jeu/memory.js';
import {
  chargerProgression, sauverProgression, chargerLudique, sauverLudique,
} from '../domain/progression/persistence.js';
import { enregistrerResultat } from '../domain/progression/repetition.js';
import { incrementerStreak, resetStreak } from '../domain/progression/streaks.js';
import { commentaireReussite, commentaireErreur } from '../domain/ludique/personnage.js';
import { direReplique, montrerPersonnage } from './personnage-ui.js';

let session = null;
let verrouille = false;

/** Initialise le memory dans un conteneur */
export function initialiserMemory(conteneur, { nbPaires = 6, onFin } = {}) {
  const progression = chargerProgression(CARTES_HISTOIRE);
  session = creerSessionMemory(CARTES_HISTOIRE, progression, nbPaires);
  verrouille = false;

  conteneur.innerHTML = `
    <div class="memory-info">
      <span class="score-zone">Coups : <span id="memory-coups">0</span></span>
      <span class="score-zone">Paires : <span id="memory-paires">0</span> / ${session.nbPaires}</span>
    </div>
    <div class="memory-grille" id="memory-grille"></div>
  `;

  const grille = conteneur.querySelector('#memory-grille');

  session.tuiles.forEach((tuile, index) => {
    const el = document.createElement('div');
    el.className = 'memory-tuile';
    el.dataset.index = index;

    el.innerHTML = `
      <div class="memory-tuile-inner">
        <div class="memory-tuile-dos"></div>
        <div class="memory-tuile-face">
          ${tuile.type === 'image'
            ? `<img src="${tuile.contenu}" alt="Carte historique">`
            : `<span class="memory-tuile-texte">${tuile.contenu}</span>`
          }
        </div>
      </div>
    `;

    el.addEventListener('click', () => onClicTuile(index, conteneur, onFin));
    grille.appendChild(el);
  });
}

function onClicTuile(index, conteneur, onFin) {
  if (verrouille) return;

  const resultat = retournerTuile(session, index);
  if (resultat.action === 'ignore') return;

  // Retourner visuellement la tuile
  const grille = conteneur.querySelector('#memory-grille');
  const tuileEl = grille.children[index];
  tuileEl.classList.add('retournee');

  if (resultat.action === 'premiere') return;

  // Mettre à jour le compteur de coups
  conteneur.querySelector('#memory-coups').textContent = session.coups;

  if (resultat.action === 'paire') {
    // Marquer les deux tuiles comme trouvées
    const carte = CARTES_HISTOIRE.find(c => c.id === resultat.carteId);
    marquerTrouvees(grille, resultat.carteId);
    conteneur.querySelector('#memory-paires').textContent = session.trouvees.size;

    // Répétition espacée
    let progression = chargerProgression(CARTES_HISTOIRE);
    progression = enregistrerResultat(progression, resultat.carteId, true);
    sauverProgression(progression);

    // Streak + personnage
    let ludique = chargerLudique();
    ludique = incrementerStreak(ludique);
    if (!ludique.anecdotesDeverrouillees.includes(resultat.carteId)) {
      ludique.anecdotesDeverrouillees.push(resultat.carteId);
    }
    sauverLudique(ludique);
    montrerPersonnage();
    direReplique(commentaireReussite(carte));

    // Vérifier fin de partie
    if (estTermineMemory(session)) {
      setTimeout(() => {
        if (onFin) {
          const { paires, total, coups } = scoreMemory(session);
          onFin(paires, total, coups);
        }
      }, 800);
    }
  } else {
    // Échec : retourner les deux tuiles après un délai
    verrouille = true;

    // Streak reset
    let ludique = chargerLudique();
    ludique = resetStreak(ludique);
    sauverLudique(ludique);

    setTimeout(() => {
      const [idx1, idx2] = session.retournees;
      grille.children[idx1].classList.remove('retournee');
      grille.children[idx2].classList.remove('retournee');
      cacherTuiles(session);
      verrouille = false;
    }, 800);
  }
}

function marquerTrouvees(grille, carteId) {
  for (const el of grille.children) {
    const idx = parseInt(el.dataset.index);
    const tuile = session.tuiles[idx];
    if (tuile.carteId === carteId) {
      el.classList.add('trouvee');
    }
  }
}
