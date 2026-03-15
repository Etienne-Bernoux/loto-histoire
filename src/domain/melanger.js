/**
 * Domain - Mélange aléatoire (Fisher-Yates)
 * Fonction pure : retourne une nouvelle copie mélangée
 */
export function melanger(tableau) {
  const copie = [...tableau];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}
