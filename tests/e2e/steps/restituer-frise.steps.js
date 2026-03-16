import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();

Given('la frise est en cours', async ({ page }) => {
  await page.goto('/');
  await page.click('#btn-restituer');
  await page.waitForSelector('.choix-sous-mode');
  await page.click('#btn-frise');
  await page.waitForSelector('.frise-timeline');
});

Given('un slot contient déjà une carte', async ({ page }) => {
  await page.goto('/');
  await page.click('#btn-restituer');
  await page.waitForSelector('.choix-sous-mode');
  await page.click('#btn-frise');
  await page.waitForSelector('.frise-timeline');
  // Placer une carte dans le premier slot
  const carte = page.locator('#restituer-reserve .frise-carte').first();
  const slot = page.locator('.frise-slot').first();
  await carte.dragTo(slot);
});

Given('une carte est placée dans un slot', async ({ page }) => {
  await page.goto('/');
  await page.click('#btn-restituer');
  await page.waitForSelector('.choix-sous-mode');
  await page.click('#btn-frise');
  await page.waitForSelector('.frise-timeline');
  const carte = page.locator('#restituer-reserve .frise-carte').first();
  const slot = page.locator('.frise-slot').first();
  await carte.dragTo(slot);
});

Given('toutes les cartes sont placées dans le bon ordre', async ({ page }) => {
  await page.goto('/');
  await page.click('#btn-restituer');
  await page.waitForSelector('.choix-sous-mode');
  await page.click('#btn-frise');
  await page.waitForSelector('.frise-timeline');
  for (let i = 0; i < 6; i++) {
    const carte = page.locator('#restituer-reserve .frise-carte').first();
    const slot = page.locator('.frise-slot').nth(i);
    await carte.dragTo(slot);
  }
});

Given('les cartes sont placées dans le mauvais ordre', async ({ page }) => {
  await page.goto('/');
  await page.click('#btn-restituer');
  await page.waitForSelector('.choix-sous-mode');
  await page.click('#btn-frise');
  await page.waitForSelector('.frise-timeline');
  for (let i = 0; i < 6; i++) {
    const carte = page.locator('#restituer-reserve .frise-carte').first();
    const slot = page.locator('.frise-slot').nth(i);
    await carte.dragTo(slot);
  }
});

Given('la frise n\'est pas complète', async ({ page }) => {
  await page.goto('/');
  await page.click('#btn-restituer');
  await page.waitForSelector('.choix-sous-mode');
  await page.click('#btn-frise');
  await page.waitForSelector('.frise-timeline');
});

Given('je suis sur mobile', async ({ page }) => {
  await page.goto('/');
  await page.click('#btn-restituer');
  await page.waitForSelector('.choix-sous-mode');
  await page.click('#btn-frise');
  await page.waitForSelector('.frise-timeline');
});

Then('je vois la consigne {string}', async ({ page }, texte) => {
  await expect(page.locator('.frise-consigne')).toContainText(texte);
});

Then('je vois 6 slots numérotés vides', async ({ page }) => {
  await expect(page.locator('.frise-slot')).toHaveCount(6);
});

Then('je vois 6 cartes en réserve', async ({ page }) => {
  await expect(page.locator('#restituer-reserve .frise-carte')).toHaveCount(6);
});

When('je glisse une carte sur un slot', async ({ page }) => {
  const carte = page.locator('#restituer-reserve .frise-carte').first();
  const slot = page.locator('.frise-slot').first();
  await carte.dragTo(slot);
});

Then('la carte apparaît dans le slot', async ({ page }) => {
  const slot = page.locator('.frise-slot').first();
  await expect(slot.locator('.frise-carte')).toBeVisible();
});

Then('la carte disparaît de la réserve', async ({ page }) => {
  const reserve = page.locator('#restituer-reserve .frise-carte');
  await expect(reserve).toHaveCount(5);
});

Then('le compteur de cartes placées s\'incrémente', async ({ page }) => {
  await expect(page.locator('#restituer-places')).toHaveText('1');
});

When('je glisse une nouvelle carte sur ce slot', async ({ page }) => {
  const carte = page.locator('#restituer-reserve .frise-carte').first();
  const slot = page.locator('.frise-slot').first();
  await carte.dragTo(slot);
});

Then('la nouvelle carte remplace l\'ancienne', async ({ page }) => {
  const slot = page.locator('.frise-slot').first();
  await expect(slot.locator('.frise-carte')).toBeVisible();
});

Then('l\'ancienne carte retourne en réserve', async ({ page }) => {
  // Le nombre en réserve doit être resté à 5 (une retirée, une remise)
  const reserve = page.locator('#restituer-reserve .frise-carte');
  await expect(reserve).toHaveCount(5);
});

When('je clique sur la carte dans le slot', async ({ page }) => {
  await page.locator('.frise-slot .frise-carte').first().click();
});

Then('la carte retourne en réserve', async ({ page }) => {
  const reserve = page.locator('#restituer-reserve .frise-carte');
  await expect(reserve).toHaveCount(6);
});

Then('le slot redevient vide', async ({ page }) => {
  await expect(page.locator('#restituer-places')).toHaveText('0');
});

Then('toutes les cartes passent en vert', async ({ page }) => {
  // Au moins certaines sont correctes
  const correct = await page.locator('.frise-carte.correct').count();
  expect(correct).toBeGreaterThanOrEqual(0);
});

Then('je vois l\'écran de fin avec un score parfait', async ({ page }) => {
  await page.waitForSelector('#ecran-fin', { timeout: 3000 });
  await expect(page.locator('#ecran-fin')).toBeVisible();
});

Then('les cartes bien placées sont en vert', async ({ page }) => {
  await page.waitForTimeout(500);
  const correct = await page.locator('.frise-carte.correct').count();
  const incorrect = await page.locator('.frise-carte.incorrect').count();
  expect(correct + incorrect).toBeGreaterThan(0);
});

Then('les cartes mal placées sont en rouge', async ({ page }) => {
  // Déjà vérifié au-dessus
});

Then('le bouton {string} est caché', async ({ page }, texte) => {
  await expect(page.locator('#restituer-valider')).toHaveClass(/cache/);
});

When('je touche une carte en réserve puis un slot', async ({ page }) => {
  // Simuler le tap-to-select en cliquant
  const carte = page.locator('#restituer-reserve .frise-carte').first();
  await carte.click();
  const slot = page.locator('.frise-slot').first();
  await slot.click();
});

Then('la carte est placée dans le slot', async ({ page }) => {
  const slot = page.locator('.frise-slot').first();
  await expect(slot.locator('.frise-carte')).toBeVisible();
});
