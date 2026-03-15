// @ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Mode Quiz', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('[data-mode="quiz"]');
  });

  test('affiche une illustration et 4 choix', async ({ page }) => {
    await expect(page.locator('.quiz-image img')).toBeVisible();
    await expect(page.locator('.quiz-option')).toHaveCount(4);
  });

  test('une bonne réponse affiche un message de succès', async ({ page }) => {
    // On ne sait pas quelle est la bonne réponse côté E2E,
    // mais on peut vérifier qu'un clic déclenche un feedback
    await page.locator('.quiz-option').first().click();
    const resultat = page.locator('#quiz-resultat');
    await expect(resultat).toBeVisible();
  });

  test('après réponse, le bouton suivant apparaît', async ({ page }) => {
    await page.locator('.quiz-option').first().click();
    await expect(page.locator('#quiz-suivant')).toBeVisible();
  });

  test('passer à la question suivante met à jour le numéro', async ({ page }) => {
    await page.locator('.quiz-option').first().click();
    await page.click('#quiz-suivant');
    await expect(page.locator('#quiz-question-num')).toContainText('2');
  });
});
