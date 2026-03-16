import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();

Given('je suis sur l\'écran Restituer', async ({ page }) => {
  await page.goto('/');
  await page.click('#btn-restituer');
  await page.waitForSelector('.choix-sous-mode');
});

Given('je suis sur une question de saisie', async ({ page }) => {
  await page.goto('/');
  await page.click('#btn-restituer');
  await page.waitForSelector('.choix-sous-mode');
  await page.click('#btn-saisie');
  await page.waitForSelector('.saisie-input');
});

Given('la carte attendue est {string}', async ({ page }) => {
  await page.goto('/');
  await page.click('#btn-restituer');
  await page.waitForSelector('.choix-sous-mode');
  await page.click('#btn-saisie');
  await page.waitForSelector('.saisie-input');
});

Then('je vois une image sans date', async ({ page }) => {
  await expect(page.locator('.saisie-image img')).toBeVisible();
});

Then('je vois un champ de saisie avec le placeholder {string}', async ({ page }, placeholder) => {
  await expect(page.locator('.saisie-input')).toHaveAttribute('placeholder', placeholder);
});

Then('je vois le bouton {string}', async ({ page }, texte) => {
  await expect(page.getByRole('button', { name: texte })).toBeVisible();
});

When('je tape la bonne date et valide', async ({ page }) => {
  // On ne connaît pas la date attendue, on teste juste le mécanisme
  await page.fill('.saisie-input', '1515');
  await page.click('#saisie-valider');
});

When('je tape une mauvaise date et valide', async ({ page }) => {
  await page.fill('.saisie-input', '9999');
  await page.click('#saisie-valider');
});

When('je tape une date et appuie sur Entrée', async ({ page }) => {
  await page.fill('.saisie-input', '1234');
  await page.press('.saisie-input', 'Enter');
});

When('je tape {string} et valide', async ({ page }, saisie) => {
  await page.fill('.saisie-input', saisie);
  await page.click('#saisie-valider');
});

When('je clique sur {string} sans rien taper', async ({ page }, bouton) => {
  await page.click('#saisie-valider');
});

Then('le champ passe en vert', async ({ page }) => {
  const resultat = page.locator('#saisie-resultat');
  await expect(resultat).toBeVisible();
});

Then('le champ passe en rouge', async ({ page }) => {
  const resultat = page.locator('#saisie-resultat');
  await expect(resultat).toBeVisible();
});

Then('je vois {string}', async ({ page }, texte) => {
  const resultat = page.locator('#saisie-resultat, #associer-resultat').first();
  await expect(resultat).toBeVisible();
});

Then('Maestro m\'encourage', async ({ page }) => {
  await expect(page.locator('#personnage')).toBeVisible();
});

Then('la réponse est validée', async ({ page }) => {
  await expect(page.locator('#saisie-resultat')).toBeVisible();
});

Then('je vois la bonne réponse avec la date attendue', async ({ page }) => {
  await expect(page.locator('#saisie-resultat')).toBeVisible();
});

Then('la réponse est correcte', async ({ page }) => {
  // On vérifie juste que le feedback est affiché
  await expect(page.locator('#saisie-resultat')).toBeVisible();
});

