/**
 * UI — Étape 2 : Associer
 * QCM à 4 choix avec deux sous-modes.
 */
import { CARTES_HISTOIRE } from '../domain/cartes/cartes.js';
import {
  creerSessionAssocier,
  genererQuestion,
  repondreAssocier,
  scoreAssocier,
} from '../domain/jeu/associer.js';
import {
  chargerProgression,
  sauverProgression,
  chargerLudique,
  sauverLudique,
} from '../domain/progression/persistence.js';
import { enregistrerResultat } from '../domain/progression/repetition.js';
import { incrementerStreak, resetStreak, messageStreak } from '../domain/progression/streaks.js';
import { commentaireReussite, commentaireErreur, commentaireStreak } from '../domain/ludique/personnage.js';
import { direReplique, montrerPersonnage } from './personnage-ui.js';
import { initialiserMemory } from './memory.js';

let session = null;
let ecranEl = null;
let onTermine = null;

/** Initialise l'écran Associer avec choix de sous-mode */
export function initialiserAssocier(ecran, { nbCartes = 10, onFin } = {}) {
  ecranEl = ecran;
  onTermine = onFin;

  const contenu = ecran.querySelector('.associer-contenu') || creerConteneur();
  contenu.innerHTML = `
    <div class="choix-sous-mode">
      <h3>Choisis ton mode</h3>
      <button class="btn-etape" id="btn-qcm">
        <span class="etape-titre">Quiz</span>
        <span class="etape-desc">Choisis la bonne réponse parmi 4 propositions</span>
      </button>
      <button class="btn-etape" id="btn-memory">
        <span class="etape-titre">Memory</span>
        <span class="etape-desc">Retrouve les paires image ↔ événement</span>
      </button>
    </div>
  `;

  contenu.querySelector('#btn-qcm').addEventListener('click', () => {
    const progression = chargerProgression(CARTES_HISTOIRE);
    session = creerSessionAssocier(CARTES_HISTOIRE, progression, nbCartes);
    afficherQuestion();
  });

  contenu.querySelector('#btn-memory').addEventListener('click', () => {
    initialiserMemory(contenu, {
      nbPaires: 6,
      onFin: (paires, total, coups) => {
        if (onTermine) onTermine(paires, total);
      },
    });
  });
}

/** Affiche la question courante */
function afficherQuestion() {
  const question = genererQuestion(session, CARTES_HISTOIRE);
  if (!question) {
    terminerSession();
    return;
  }

  const { carte, sousMode, choix, numero, total } = question;

  // Construire le contenu
  let consigne, imageHtml;

  if (sousMode === 'image-vers-date') {
    imageHtml = `<div class="quiz-image"><img src="${carte.imageSansDate}" alt="Illustration mystère"></div>`;
    consigne = `<p class="quiz-consigne">${carte.description}</p><p class="quiz-consigne"><strong>Quelle est la date ?</strong></p>`;
  } else {
    imageHtml = '';
    consigne = `<p class="quiz-date-affichee">${carte.dateTexte}</p><p class="quiz-consigne"><strong>Quel événement correspond ?</strong></p>`;
  }

  // Zone de jeu (on réutilise la structure après le jeu-header)
  const contenu = ecranEl.querySelector('.associer-contenu') || creerConteneur();

  contenu.innerHTML = `
    <div class="score-zone">Question ${numero} / ${total}</div>
    <div class="quiz-zone">
      ${imageHtml}
      ${consigne}
      <div class="quiz-choix">
        ${choix.map(c => `<button class="quiz-option" data-id="${c.id}">${c.label}</button>`).join('')}
      </div>
    </div>
    <div class="quiz-resultat cache" id="associer-resultat"></div>
    <button class="btn btn-principal cache" id="associer-suivant">Question suivante</button>
  `;

  // Événements boutons choix
  contenu.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => onReponse(parseInt(btn.dataset.id), carte, contenu));
  });
}

/** Crée le conteneur de jeu s'il n'existe pas encore */
function creerConteneur() {
  const div = document.createElement('div');
  div.className = 'associer-contenu';
  ecranEl.appendChild(div);
  return div;
}

/** Gère la réponse de l'enfant */
function onReponse(choixId, carteQuestion, contenu) {
  const resultat = repondreAssocier(session, choixId, CARTES_HISTOIRE);

  // Mettre à jour la répétition espacée
  let progression = chargerProgression(CARTES_HISTOIRE);
  progression = enregistrerResultat(progression, carteQuestion.id, resultat.correct);
  sauverProgression(progression);

  // Streaks et personnage
  let ludique = chargerLudique();
  if (resultat.correct) {
    ludique = incrementerStreak(ludique);
    if (!ludique.anecdotesDeverrouillees.includes(carteQuestion.id)) {
      ludique.anecdotesDeverrouillees.push(carteQuestion.id);
    }
    // Réplique personnage
    montrerPersonnage();
    const msgStreak = commentaireStreak(ludique.streakActuel);
    direReplique(msgStreak || commentaireReussite(carteQuestion));
  } else {
    ludique = resetStreak(ludique);
    montrerPersonnage();
    direReplique(commentaireErreur());
  }
  sauverLudique(ludique);

  // Feedback visuel
  const boutons = contenu.querySelectorAll('.quiz-option');
  boutons.forEach(btn => {
    btn.disabled = true;
    const id = parseInt(btn.dataset.id);
    if (id === carteQuestion.id) btn.classList.add('correct');
    else if (id === choixId && !resultat.correct) btn.classList.add('incorrect');
  });

  const resultatEl = contenu.querySelector('#associer-resultat');
  resultatEl.classList.remove('cache', 'succes', 'echec');

  if (resultat.correct) {
    resultatEl.classList.add('succes');
    resultatEl.textContent = 'Bravo ! Bonne réponse !';
  } else {
    resultatEl.classList.add('echec');
    resultatEl.textContent = `Non, c'était : ${resultat.bonneReponse.dateTexte} — ${resultat.bonneReponse.titre}`;
  }

  const btnSuivant = contenu.querySelector('#associer-suivant');
  btnSuivant.classList.remove('cache');
  btnSuivant.onclick = afficherQuestion;
}

/** Termine la session et affiche le score */
function terminerSession() {
  const { score, total } = scoreAssocier(session);
  if (onTermine) {
    onTermine(score, total);
  }
}
