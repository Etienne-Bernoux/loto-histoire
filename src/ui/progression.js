/**
 * UI — Frise de progression
 * Affiche la progression globale et les étoiles sur l'accueil.
 */
import { CARTES_HISTOIRE } from '../domain/cartes.js';
import { chargerProgression } from '../domain/persistence.js';
import { totalEtoiles, maxEtoiles } from '../domain/etoiles.js';

/** Crée ou met à jour le widget de progression dans un conteneur */
export function afficherProgression(conteneur) {
  const progression = chargerProgression(CARTES_HISTOIRE);
  const etoiles = totalEtoiles(progression);
  const max = maxEtoiles(progression);
  const maitrisees = Object.values(progression.cartes).filter(c => c.maitrisee).length;
  const totalCartes = CARTES_HISTOIRE.length;
  const pourcentage = totalCartes > 0 ? Math.round((maitrisees / totalCartes) * 100) : 0;

  conteneur.innerHTML = `
    <div class="progression-conteneur">
      <div class="progression-barre">
        <div class="progression-remplissage" style="width: ${pourcentage}%"></div>
      </div>
      <div class="progression-stats">
        <span>${maitrisees} / ${totalCartes} cartes maîtrisées</span>
        <span class="progression-etoiles">${etoiles} / ${max} &#9733;</span>
      </div>
    </div>
  `;
}
