/**
 * UI - Couche de présentation
 * Gère le DOM et délègue la logique au domaine
 */
import { CARTES_HISTOIRE } from '../domain/cartes.js';
import { creerPartieLoto, tirerDate, verifierReponse, scoreActuel } from '../domain/loto.js';
import { creerPartieQuiz, questionActuelle, repondreQuiz, scoreQuiz } from '../domain/quiz.js';
import { creerPartieFrise, placerCarte, retirerCarte, nbPlaces, estComplet, validerOrdre } from '../domain/frise.js';
import { calculerResultat } from '../domain/scoring.js';
import { melanger } from '../domain/melanger.js';

// === Helpers DOM ===
function $(id) { return document.getElementById(id); }

function afficherEcran(id) {
  document.querySelectorAll('.ecran').forEach(e => e.classList.add('cache'));
  $(id).classList.remove('cache');
}

// === Navigation ===
let modeActuel = null;

document.querySelectorAll('.btn-mode').forEach(btn => {
  btn.addEventListener('click', () => {
    modeActuel = btn.dataset.mode;
    if (modeActuel === 'loto') lancerLoto();
    else if (modeActuel === 'quiz') lancerQuiz();
    else if (modeActuel === 'frise') lancerFrise();
  });
});

document.querySelectorAll('.btn-retour').forEach(btn => {
  btn.addEventListener('click', () => afficherEcran('ecran-accueil'));
});

$('fin-accueil').addEventListener('click', () => afficherEcran('ecran-accueil'));
$('fin-rejouer').addEventListener('click', () => {
  if (modeActuel === 'loto') lancerLoto();
  else if (modeActuel === 'quiz') lancerQuiz();
  else if (modeActuel === 'frise') lancerFrise();
});

// =======================
// === MODE LOTO =========
// =======================

let loto = null;

function lancerLoto() {
  afficherEcran('ecran-loto');
  loto = creerPartieLoto(CARTES_HISTOIRE, 9);

  const { trouvees, total } = scoreActuel(loto);
  $('loto-score').textContent = trouvees;
  $('loto-total').textContent = total;
  $('loto-date').innerHTML = '<p class="placeholder">Clique pour tirer une date</p>';
  $('loto-description').textContent = '';
  $('loto-tirer').disabled = false;

  const plateau = $('loto-plateau');
  plateau.innerHTML = '';
  loto.cartesPlateauMelangees.forEach(carte => {
    const div = document.createElement('div');
    div.classList.add('carte-loto');
    div.dataset.id = carte.id;
    div.innerHTML = `
      <img src="${carte.image}" alt="${carte.description}" loading="lazy">
      <div class="loto-overlay">${carte.titre}</div>
    `;
    div.addEventListener('click', () => onLotoClicCarte(carte.id));
    plateau.appendChild(div);
  });
}

$('loto-tirer').addEventListener('click', () => {
  const carte = tirerDate(loto);
  if (!carte) return;

  $('loto-date').textContent = carte.titre;
  $('loto-description').textContent = carte.description;
  $('loto-tirer').disabled = true;
});

function onLotoClicCarte(id) {
  const resultat = verifierReponse(loto, id);
  if (!resultat.valide) return;

  const carteEl = $('loto-plateau').querySelector(`[data-id="${id}"]`);
  if (!carteEl) return;

  if (resultat.correct) {
    carteEl.classList.add('trouvee');
    const { trouvees, total } = scoreActuel(loto);
    $('loto-score').textContent = trouvees;

    if (resultat.termine) {
      setTimeout(() => afficherFin(trouvees, total), 600);
    } else {
      $('loto-tirer').disabled = false;
    }
  } else {
    carteEl.classList.add('erreur');
    setTimeout(() => carteEl.classList.remove('erreur'), 400);
  }
}

// =======================
// === MODE QUIZ =========
// =======================

let quiz = null;

function lancerQuiz() {
  afficherEcran('ecran-quiz');
  quiz = creerPartieQuiz(CARTES_HISTOIRE, 10);
  $('quiz-score').textContent = '0';
  $('quiz-question-num').textContent = '0';
  afficherQuestion();
}

function afficherQuestion() {
  const q = questionActuelle(quiz, CARTES_HISTOIRE);
  if (!q) {
    const { score, total } = scoreQuiz(quiz);
    afficherFin(score, total);
    return;
  }

  $('quiz-question-num').textContent = q.numero;
  $('quiz-image').innerHTML = `<img src="${q.carte.image}" alt="Illustration mystère">`;
  $('quiz-consigne').textContent = 'Quel événement correspond à cette illustration ?';

  const choixEl = $('quiz-choix');
  choixEl.innerHTML = '';
  q.choix.forEach(c => {
    const btn = document.createElement('button');
    btn.classList.add('quiz-option');
    btn.innerHTML = `<div>${c.titre}</div><div style="font-size:0.7rem;font-family:'Lora',serif;font-weight:400;margin-top:0.3rem">${c.description}</div>`;
    btn.addEventListener('click', () => onQuizReponse(c.id, q.carte));
    choixEl.appendChild(btn);
  });

  $('quiz-resultat').classList.add('cache');
  $('quiz-suivant').classList.add('cache');
}

function onQuizReponse(idChoisi, carteQuestion) {
  const resultat = repondreQuiz(quiz, idChoisi);

  const boutons = $('quiz-choix').querySelectorAll('.quiz-option');
  boutons.forEach(btn => {
    btn.disabled = true;
    const titre = btn.querySelector('div').textContent;
    const carte = CARTES_HISTOIRE.find(c => c.titre === titre);
    if (carte && carte.id === carteQuestion.id) btn.classList.add('correct');
    else if (carte && carte.id === idChoisi && !resultat.correct) btn.classList.add('incorrect');
  });

  const resultatEl = $('quiz-resultat');
  resultatEl.classList.remove('cache', 'succes', 'echec');

  if (resultat.correct) {
    $('quiz-score').textContent = quiz.score;
    resultatEl.classList.add('succes');
    resultatEl.textContent = 'Bravo ! Bonne réponse !';
  } else {
    resultatEl.classList.add('echec');
    resultatEl.textContent = `Non, c'était : ${resultat.bonneReponse.titre} — ${resultat.bonneReponse.description}`;
  }

  $('quiz-suivant').classList.remove('cache');
}

$('quiz-suivant').addEventListener('click', afficherQuestion);

// =======================
// === MODE FRISE ========
// =======================

let frisePartie = null;

function lancerFrise() {
  afficherEcran('ecran-frise');
  frisePartie = creerPartieFrise(CARTES_HISTOIRE, 6);

  $('frise-places').textContent = '0';
  $('frise-total').textContent = frisePartie.cartes.length;
  $('frise-valider').classList.add('cache');

  const timeline = $('frise-timeline');
  timeline.innerHTML = '';
  for (let i = 0; i < frisePartie.cartes.length; i++) {
    const slot = creerSlot(i);
    timeline.appendChild(slot);
  }

  const reserve = $('frise-reserve');
  reserve.innerHTML = '';
  frisePartie.cartesMelangees.forEach(carte => {
    reserve.appendChild(creerFriseCarte(carte));
  });
}

function creerSlot(index) {
  const slot = document.createElement('div');
  slot.classList.add('frise-slot');
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
    onFriseDeposer(carteId, index);
  });

  // Support tactile : clic sur un slot quand une carte est sélectionnée
  slot.addEventListener('click', () => {
    if (frisePartie.touchCarte) {
      onFriseDeposer(frisePartie.touchCarte, index);
      frisePartie.touchCarte = null;
    }
  });

  return slot;
}

function creerFriseCarte(carte) {
  const div = document.createElement('div');
  div.classList.add('frise-carte');
  div.draggable = true;
  div.dataset.id = carte.id;
  div.innerHTML = `
    <img src="${carte.image}" alt="${carte.description}" loading="lazy">
    <div class="frise-carte-titre">${carte.description.split(':')[0].split(',')[0]}</div>
  `;

  div.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', carte.id);
    div.style.opacity = '0.5';
  });
  div.addEventListener('dragend', () => { div.style.opacity = '1'; });

  // Support tactile
  div.addEventListener('touchstart', () => {
    frisePartie.touchCarte = carte.id;
    div.style.opacity = '0.5';
  });
  div.addEventListener('touchend', () => { div.style.opacity = '1'; });

  return div;
}

function onFriseDeposer(carteId, slotIndex) {
  const { succes, carteRetiree } = placerCarte(frisePartie, carteId, slotIndex, CARTES_HISTOIRE);
  if (!succes) return;

  // Remettre l'ancienne carte en réserve si le slot était occupé
  if (carteRetiree) {
    $('frise-reserve').appendChild(creerFriseCarte(carteRetiree));
  }

  // Retirer la carte de la réserve
  const carteEl = $('frise-reserve').querySelector(`[data-id="${carteId}"]`);
  if (carteEl) carteEl.remove();

  // Afficher la carte dans le slot
  const carte = CARTES_HISTOIRE.find(c => c.id === carteId);
  const slot = $('frise-timeline').children[slotIndex];
  slot.innerHTML = '';
  const mini = document.createElement('div');
  mini.classList.add('frise-carte', 'dans-frise');
  mini.innerHTML = `
    <img src="${carte.image}" alt="${carte.description}">
    <div class="frise-carte-titre">${carte.description.split(':')[0].split(',')[0]}</div>
  `;
  slot.appendChild(mini);

  // Clic pour retirer
  mini.addEventListener('click', () => {
    const retiree = retirerCarte(frisePartie, slotIndex);
    if (retiree) {
      slot.replaceWith(creerSlot(slotIndex));
      // Réinsérer dans le DOM au bon endroit
      const timeline = $('frise-timeline');
      const slots = [...timeline.children];
      // Le slot a été remplacé, on doit re-récupérer la référence
      $('frise-reserve').appendChild(creerFriseCarte(retiree));
    }
    majFrise();
  });

  majFrise();
}

function majFrise() {
  $('frise-places').textContent = nbPlaces(frisePartie);
  $('frise-valider').classList.toggle('cache', !estComplet(frisePartie));
}

$('frise-valider').addEventListener('click', () => {
  const { resultats, score, total } = validerOrdre(frisePartie);

  const slots = $('frise-timeline').children;
  resultats.forEach((r, i) => {
    const carteEl = slots[i]?.querySelector('.frise-carte');
    if (carteEl) carteEl.classList.add(r.correct ? 'correct' : 'incorrect');
  });

  setTimeout(() => afficherFin(score, total), 1000);
});

// =======================
// === FIN DE PARTIE =====
// =======================

function afficherFin(score, total) {
  afficherEcran('ecran-fin');
  const resultat = calculerResultat(score, total);
  $('fin-titre').textContent = resultat.titre;
  $('fin-message').textContent = resultat.message;
  $('fin-details').textContent = resultat.details;
}
