import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();

Given('j\'ouvre l\'application', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('#ecran-accueil');
});

Given('je suis sur l\'accueil', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('#ecran-accueil');
});

Given('je suis sur l\'écran Découvrir', async ({ page }) => {
  await page.goto('/');
  await page.click('#btn-decouvrir');
  await page.waitForSelector('.decouvrir-grille');
});

Then('je vois le titre {string}', async ({ page }, titre) => {
  await expect(page.locator('h1')).toHaveText(titre);
});

Then('je vois Maestro avec un message d\'accueil', async ({ page }) => {
  const maestro = page.locator('#zone-maestro');
  await expect(maestro.locator('img')).toBeVisible();
  await expect(maestro.locator('.accueil-maestro-bulle')).not.toBeEmpty();
});

Then('je vois le défi du jour avec 5 cartes', async ({ page }) => {
  await expect(page.locator('.defi-carte')).toHaveCount(5);
  await expect(page.locator('#btn-defi')).toBeVisible();
});

Then('je vois les 3 boutons d\'étapes {string}, {string}, {string}', async ({ page }, e1, e2, e3) => {
  await expect(page.locator('#btn-decouvrir .etape-titre')).toHaveText(e1);
  await expect(page.locator('#btn-associer .etape-titre')).toHaveText(e2);
  await expect(page.locator('#btn-restituer .etape-titre')).toHaveText(e3);
});

Then('je vois la barre de progression', async ({ page }) => {
  await expect(page.locator('#zone-progression .progression-conteneur')).toBeVisible();
});

When('je clique sur {string}', async ({ page }, texte) => {
  await page.getByRole('button', { name: texte }).first().click();
});

Then('je vois l\'écran Découvrir avec la grille de cartes', async ({ page }) => {
  await expect(page.locator('#ecran-decouvrir')).toBeVisible();
  await expect(page.locator('.decouvrir-grille')).toBeVisible();
});

Then('je vois le choix entre {string} et {string}', async ({ page }, choix1, choix2) => {
  await expect(page.locator('.choix-sous-mode')).toBeVisible();
  await expect(page.getByRole('button', { name: choix1 })).toBeVisible();
  await expect(page.getByRole('button', { name: choix2 })).toBeVisible();
});

Then('je vois l\'écran d\'accueil', async ({ page }) => {
  await expect(page.locator('#ecran-accueil')).toBeVisible();
});
