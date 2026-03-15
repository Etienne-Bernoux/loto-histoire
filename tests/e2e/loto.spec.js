// @ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Mode Loto', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('la page d\'accueil affiche les 3 modes', async ({ page }) => {
    await expect(page.locator('.btn-mode')).toHaveCount(3);
    await expect(page.locator('text=Loto classique')).toBeVisible();
    await expect(page.locator('text=Quiz')).toBeVisible();
    await expect(page.locator('text=Frise chronologique')).toBeVisible();
  });

  test('lancer une partie affiche 9 cartes', async ({ page }) => {
    await page.click('[data-mode="loto"]');
    await expect(page.locator('.carte-loto')).toHaveCount(9);
    await expect(page.locator('#loto-tirer')).toBeEnabled();
  });

  test('tirer une date affiche la date et la description', async ({ page }) => {
    await page.click('[data-mode="loto"]');
    await page.click('#loto-tirer');
    const date = page.locator('#loto-date');
    await expect(date).not.toContainText('Clique pour tirer');
    await expect(page.locator('#loto-description')).not.toBeEmpty();
  });

  test('cliquer sur la bonne carte la marque comme trouvée', async ({ page }) => {
    await page.click('[data-mode="loto"]');
    await page.click('#loto-tirer');

    // Récupérer la date tirée et trouver la bonne carte
    const dateTiree = await page.locator('#loto-date').textContent();
    const bonneCarteLoto = page.locator(`.loto-overlay:has-text("${dateTiree}")`).locator('..');
    await bonneCarteLoto.click();

    await expect(bonneCarteLoto).toHaveClass(/trouvee/);
    await expect(page.locator('#loto-score')).toContainText('1');
  });

  test('le bouton retour ramène à l\'accueil', async ({ page }) => {
    await page.click('[data-mode="loto"]');
    await page.click('#loto-retour');
    await expect(page.locator('#ecran-accueil')).toBeVisible();
  });
});
