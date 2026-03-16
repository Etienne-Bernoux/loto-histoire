import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();

Given('je lance l\'étape Découvrir', async ({ page }) => {
  await page.goto('/');
  await page.click('#btn-decouvrir');
  await page.waitForSelector('.decouvrir-grille');
});

Given('je suis sur la grille Découvrir', async ({ page }) => {
  await page.goto('/');
  await page.click('#btn-decouvrir');
  await page.waitForSelector('.decouvrir-grille');
});

Given('je suis sur le détail d\'une carte', async ({ page }) => {
  await page.goto('/');
  await page.click('#btn-decouvrir');
  await page.waitForSelector('.decouvrir-grille');
  await page.locator('.decouvrir-vignette').first().click();
  await page.waitForSelector('.decouvrir-detail:not(.cache)');
});

Given('je n\'ai jamais réussi la carte', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.click('#btn-decouvrir');
  await page.waitForSelector('.decouvrir-grille');
});

Then('je vois une grille de 27 cartes', async ({ page }) => {
  await expect(page.locator('.decouvrir-vignette')).toHaveCount(27);
});

Then('chaque carte affiche une date et un titre', async ({ page }) => {
  const premiere = page.locator('.decouvrir-vignette').first();
  await expect(premiere.locator('.vignette-titre')).not.toBeEmpty();
  await expect(premiere.locator('.vignette-nom')).not.toBeEmpty();
});

When('je clique sur une carte', async ({ page }) => {
  await page.locator('.decouvrir-vignette').first().click();
});

Then('je vois l\'image de la carte en grand', async ({ page }) => {
  await expect(page.locator('.detail-image img')).toBeVisible();
});

Then('je vois la date et le titre de l\'événement', async ({ page }) => {
  await expect(page.locator('.detail-contenu h2')).not.toBeEmpty();
});

Then('je vois la description', async ({ page }) => {
  await expect(page.locator('.detail-description')).not.toBeEmpty();
});

Then('je vois le paragraphe explicatif', async ({ page }) => {
  await expect(page.locator('.detail-paragraphe')).not.toBeEmpty();
});

Then('le bouton {string} ramène à la grille', async ({ page }, texte) => {
  await page.click('#detail-retour-grille');
  await expect(page.locator('.decouvrir-grille')).toBeVisible();
  await expect(page.locator('.decouvrir-detail')).toBeHidden();
});

When('je clique sur la flèche suivante', async ({ page }) => {
  await page.click('#detail-suivant');
});

Then('je vois la carte suivante', async ({ page }) => {
  await expect(page.locator('.detail-contenu h2')).not.toBeEmpty();
});

Then('le compteur affiche la position correcte', async ({ page }) => {
  await expect(page.locator('.detail-nav-fleches')).toContainText('2 / 27');
});

When('je consulte son détail', async ({ page }) => {
  await page.locator('.decouvrir-vignette').first().click();
});

Then('l\'anecdote affiche {string}', async ({ page }, texte) => {
  await expect(page.locator('.detail-anecdote.verrouillee')).toContainText(texte);
});

Then('je vois un seul bouton {string}', async ({ page }, texte) => {
  await expect(page.locator('#detail-retour-grille')).toBeVisible();
  await expect(page.locator('#ecran-decouvrir .jeu-header')).toBeHidden();
});

Then('le bouton retour ramène à la grille, pas à l\'accueil', async ({ page }) => {
  await page.click('#detail-retour-grille');
  await expect(page.locator('.decouvrir-grille')).toBeVisible();
  await expect(page.locator('#ecran-accueil')).toBeHidden();
});
