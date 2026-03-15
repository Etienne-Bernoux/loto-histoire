/**
 * UI — Personnage explorateur du temps
 * Affiche un personnage avec une bulle de dialogue.
 */

let bulleTimeout = null;

/** Crée le conteneur du personnage s'il n'existe pas */
function getOuCreerPersonnage() {
  let el = document.getElementById('personnage');
  if (!el) {
    el = document.createElement('div');
    el.id = 'personnage';
    el.className = 'personnage';
    el.innerHTML = `
      <img class="personnage-sprite" src="images/sage.svg" alt="Le Sage" width="60" height="60">
      <div class="personnage-bulle cache" id="personnage-bulle"></div>
    `;
    document.body.appendChild(el);
  }
  return el;
}

/** Affiche une réplique dans la bulle du personnage */
export function direReplique(texte, duree = 3000) {
  getOuCreerPersonnage();
  const bulle = document.getElementById('personnage-bulle');
  bulle.textContent = texte;
  bulle.classList.remove('cache');

  if (bulleTimeout) clearTimeout(bulleTimeout);
  bulleTimeout = setTimeout(() => {
    bulle.classList.add('cache');
  }, duree);
}

/** Cache le personnage */
export function cacherPersonnage() {
  const el = document.getElementById('personnage');
  if (el) el.classList.add('cache');
}

/** Montre le personnage */
export function montrerPersonnage() {
  getOuCreerPersonnage();
  const el = document.getElementById('personnage');
  el.classList.remove('cache');
}
