/**
 * UI — Étape 3 : Restituer
 * Deux sous-modes : saisie libre et frise chronologique.
 */
import { CARTES_HISTOIRE } from '../domain/cartes.js';
import {
  creerSessionSaisie, carteCouranteSaisie, verifierSaisie, scoreSaisie,
  creerSessionFrise, placerCarteFrise, retirerCarteFrise,
  nbPlacesFrise, estCompletFrise, validerOrdreFrise,
} from '../domain/restituer.js';
import {
  chargerProgression, sauverProgression, chargerLudique, sauverLudique,
} from '../domain/persistence.js';
import { enregistrerResultat } from '../domain/repetition.js';
import { incrementerStreak, resetStreak } from '../domain/streaks.js';
import { commentaireReussite, commentaireErreur } from '../domain/personnage.js';
import { direReplique, montrerPersonnage } from './personnage-ui.js';

let session = null;
let ecranEl = null;
let onTermine = null;

/** Initialise l'écran Restituer avec un choix de sous-mode */
export function initialiserRestituer(ecran, { nbCartes = 6, onFin } = {}) {
  ecranEl = ecran;
  onTermine = onFin;

  const contenu = ecran.querySelector('.restituer-contenu') || creerConteneur(ecran);
  contenu.innerHTML = `
    <div class="choix-sous-mode">
      <h3>Choisis ton défi</h3>
      <button class="btn-etape" id="btn-saisie">
        <span class="etape-titre">Saisie libre</span>
        <span class="etape-desc">Tape la date exacte de mémoire</span>
      </button>
      <button class="btn-etape" id="btn-frise">
        <span class="etape-titre">Frise chronologique</span>
        <span class="etape-desc">Remets les événements dans l'ordre</span>
      </button>
    </div>
  `;

  contenu.querySelector('#btn-saisie').addEventListener('click', () => {
    const progression = chargerProgression(CARTES_HISTOIRE);
    session = creerSessionSaisie(CARTES_HISTOIRE, progression, nbCartes);
    afficherSaisie(contenu);
  });

  contenu.querySelector('#btn-frise').addEventListener('click', () => {
    const progression = chargerProgression(CARTES_HISTOIRE);
    session = creerSessionFrise(CARTES_HISTOIRE, progression, nbCartes);
    afficherFrise(contenu);
  });
}

function creerConteneur(ecran) {
  const div = document.createElement('div');
  div.className = 'restituer-contenu';
  ecran.appendChild(div);
  return div;
}

// === SAISIE LIBRE ===

function afficherSaisie(contenu) {
  const courante = carteCouranteSaisie(session, CARTES_HISTOIRE);
  if (!courante) {
    const { score, total } = scoreSaisie(session);
    if (onTermine) onTermine(score, total);
    return;
  }

  const { carte, numero, total } = courante;
  contenu.innerHTML = `
    <div class="score-zone">Question ${numero} / ${total}</div>
    <div class="saisie-zone">
      <div class="saisie-image"><img src="${carte.imageSansDate}" alt="Illustration mystère"></div>
      <p class="quiz-consigne">${carte.description}</p>
      <p class="quiz-consigne"><strong>Quelle est la date ?</strong></p>
      <input type="text" class="saisie-input" id="saisie-date" placeholder="ex: 1515" autocomplete="off">
      <button class="btn btn-principal" id="saisie-valider">Valider</button>
    </div>
    <div class="quiz-resultat cache" id="saisie-resultat"></div>
    <button class="btn btn-principal cache" id="saisie-suivant">Suivant</button>
  `;

  const input = contenu.querySelector('#saisie-date');
  const btnValider = contenu.querySelector('#saisie-valider');

  input.focus();
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btnValider.click();
  });

  btnValider.addEventListener('click', () => {
    const saisie = input.value;
    if (!saisie.trim()) return;

    const resultat = verifierSaisie(session, saisie, CARTES_HISTOIRE);

    // Répétition espacée
    let progression = chargerProgression(CARTES_HISTOIRE);
    progression = enregistrerResultat(progression, carte.id, resultat.correct);
    sauverProgression(progression);

    // Streaks, anecdote, personnage
    let ludique = chargerLudique();
    if (resultat.correct) {
      ludique = incrementerStreak(ludique);
      if (!ludique.anecdotesDeverrouillees.includes(carte.id)) {
        ludique.anecdotesDeverrouillees.push(carte.id);
      }
      montrerPersonnage();
      direReplique(commentaireReussite(carte));
    } else {
      ludique = resetStreak(ludique);
      montrerPersonnage();
      direReplique(commentaireErreur());
    }
    sauverLudique(ludique);

    // Feedback
    input.disabled = true;
    btnValider.disabled = true;

    const resultatEl = contenu.querySelector('#saisie-resultat');
    resultatEl.classList.remove('cache', 'succes', 'echec');

    if (resultat.correct) {
      resultatEl.classList.add('succes');
      resultatEl.textContent = 'Bravo !';
      input.style.borderColor = 'var(--couleur-succes)';
    } else {
      resultatEl.classList.add('echec');
      resultatEl.textContent = `Non, c'était : ${resultat.titreAttendu} (${resultat.dateAttendue})`;
      input.style.borderColor = 'var(--couleur-erreur)';
    }

    const btnSuivant = contenu.querySelector('#saisie-suivant');
    btnSuivant.classList.remove('cache');
    btnSuivant.style.display = 'block';
    btnSuivant.style.margin = '1rem auto';
    btnSuivant.addEventListener('click', () => afficherSaisie(contenu));
  });
}

// === FRISE CHRONOLOGIQUE ===

function afficherFrise(contenu) {
  contenu.innerHTML = `
    <p class="frise-consigne">Place les événements dans l'ordre chronologique, du plus ancien au plus récent.</p>
    <div class="frise-timeline" id="restituer-timeline"></div>
    <div class="frise-reserve" id="restituer-reserve"></div>
    <div class="frise-actions">
      <span class="score-zone"><span id="restituer-places">0</span> / ${session.cartes.length} placés</span>
      <button class="btn btn-principal cache" id="restituer-valider">Valider l'ordre</button>
    </div>
  `;

  const timeline = contenu.querySelector('#restituer-timeline');
  const reserve = contenu.querySelector('#restituer-reserve');

  // Créer les slots
  for (let i = 0; i < session.cartes.length; i++) {
    timeline.appendChild(creerSlotFrise(i, contenu));
  }

  // Créer les cartes en réserve
  session.cartesMelangees.forEach(carte => {
    reserve.appendChild(creerCarteFrise(carte, contenu));
  });

  // Bouton valider
  contenu.querySelector('#restituer-valider').addEventListener('click', () => {
    const { resultats, score, total } = validerOrdreFrise(session);

    // Feedback visuel
    const slots = timeline.children;
    resultats.forEach((r, i) => {
      const carteEl = slots[i]?.querySelector('.frise-carte');
      if (carteEl) carteEl.classList.add(r.correct ? 'correct' : 'incorrect');
    });

    // Enregistrer dans la répétition espacée
    let progression = chargerProgression(CARTES_HISTOIRE);
    resultats.forEach(r => {
      if (r.carteId) {
        progression = enregistrerResultat(progression, r.carteId, r.correct);
      }
    });
    sauverProgression(progression);

    setTimeout(() => {
      if (onTermine) onTermine(score, total);
    }, 1000);
  });
}

function creerSlotFrise(index, contenu) {
  const slot = document.createElement('div');
  slot.className = 'frise-slot';
  slot.dataset.index = index;
  slot.innerHTML = `<span class="slot-number">${index + 1}</span>`;

  slot.addEventListener('dragover', e => {
    e.preventDefault();
    slot.classList.add('drag-over');
  });
  slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
  slot.addEventListener('drop', e => {
    e.preventDefault();
    slot.classList.remove('drag-over');
    const carteId = parseInt(e.dataTransfer.getData('text/plain'));
    deposerCarteFrise(carteId, index, contenu);
  });

  // Support tactile
  slot.addEventListener('click', () => {
    if (session._touchCarte) {
      deposerCarteFrise(session._touchCarte, index, contenu);
      session._touchCarte = null;
    }
  });

  return slot;
}

function creerCarteFrise(carte, contenu) {
  const div = document.createElement('div');
  div.className = 'frise-carte';
  div.draggable = true;
  div.dataset.id = carte.id;
  div.innerHTML = `
    <img src="${carte.imageSansDate}" alt="${carte.description}" loading="lazy">
    <div class="frise-carte-titre">${carte.description.split(':')[0].split(',')[0]}</div>
  `;

  div.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', carte.id);
    div.style.opacity = '0.5';
  });
  div.addEventListener('dragend', () => { div.style.opacity = '1'; });

  // Support tactile
  div.addEventListener('touchstart', () => {
    session._touchCarte = carte.id;
    div.style.opacity = '0.5';
  });
  div.addEventListener('touchend', () => { div.style.opacity = '1'; });

  return div;
}

function deposerCarteFrise(carteId, slotIndex, contenu) {
  const { succes, carteRetiree } = placerCarteFrise(session, carteId, slotIndex, CARTES_HISTOIRE);
  if (!succes) return;

  const reserve = contenu.querySelector('#restituer-reserve');
  const timeline = contenu.querySelector('#restituer-timeline');

  // Remettre l'ancienne carte en réserve
  if (carteRetiree) {
    reserve.appendChild(creerCarteFrise(carteRetiree, contenu));
  }

  // Retirer la carte de la réserve
  const carteEl = reserve.querySelector(`[data-id="${carteId}"]`);
  if (carteEl) carteEl.remove();

  // Afficher dans le slot
  const carte = CARTES_HISTOIRE.find(c => c.id === carteId);
  const slot = timeline.children[slotIndex];
  slot.innerHTML = '';
  const mini = creerCarteFrise(carte, contenu);
  mini.classList.add('dans-frise');
  mini.addEventListener('click', () => {
    retirerCarteFrise(session, slotIndex);
    slot.innerHTML = `<span class="slot-number">${slotIndex + 1}</span>`;
    // Recréer les événements du slot
    const nouveauSlot = creerSlotFrise(slotIndex, contenu);
    slot.replaceWith(nouveauSlot);
    reserve.appendChild(creerCarteFrise(carte, contenu));
    majFriseUI(contenu);
  });
  slot.appendChild(mini);

  majFriseUI(contenu);
}

function majFriseUI(contenu) {
  contenu.querySelector('#restituer-places').textContent = nbPlacesFrise(session);
  contenu.querySelector('#restituer-valider').classList.toggle('cache', !estCompletFrise(session));
}
