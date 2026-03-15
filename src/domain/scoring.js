/**
 * Domain - Calcul du score et message de fin
 */
export function calculerResultat(score, total) {
  const ratio = total > 0 ? score / total : 0;

  let titre, message;
  if (ratio === 1) {
    titre = 'Parfait !';
    message = 'Tu connais ton histoire sur le bout des doigts !';
  } else if (ratio >= 0.7) {
    titre = 'Très bien !';
    message = 'Tu es sur la bonne voie, continue comme ça !';
  } else if (ratio >= 0.4) {
    titre = 'Pas mal !';
    message = 'Encore un peu de révision et tu seras incollable !';
  } else {
    titre = 'Continue !';
    message = "L'histoire s'apprend petit à petit, recommence pour progresser !";
  }

  const details = `${score} bonne${score > 1 ? 's' : ''} réponse${score > 1 ? 's' : ''} sur ${total}`;

  return { titre, message, details, ratio };
}
