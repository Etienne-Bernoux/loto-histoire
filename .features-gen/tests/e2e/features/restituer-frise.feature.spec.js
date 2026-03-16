// Generated from: tests/e2e/features/restituer-frise.feature
import { test } from "playwright-bdd";

test.describe('Étape 3 — Restituer (Frise chronologique)', () => {

  test('Lancer le mode Frise', async ({ Given, When, Then, And, page }) => { 
    await Given('je suis sur l\'écran Restituer', null, { page }); 
    await When('je clique sur "Frise chronologique"', null, { page }); 
    await Then('je vois la consigne "Place les événements dans l\'ordre chronologique"', null, { page }); 
    await And('je vois 6 slots numérotés vides', null, { page }); 
    await And('je vois 6 cartes en réserve', null, { page }); 
    await And('je vois le compteur "0 / 6 placés"', null, { page }); 
  });

  test('Placer une carte dans un slot (drag & drop)', async ({ Given, When, Then, And, page }) => { 
    await Given('la frise est en cours', null, { page }); 
    await When('je glisse une carte sur un slot', null, { page }); 
    await Then('la carte apparaît dans le slot', null, { page }); 
    await And('la carte disparaît de la réserve', null, { page }); 
    await And('le compteur de cartes placées s\'incrémente', null, { page }); 
  });

  test('Placer une carte dans un slot occupé', async ({ Given, When, Then, And, page }) => { 
    await Given('un slot contient déjà une carte', null, { page }); 
    await When('je glisse une nouvelle carte sur ce slot', null, { page }); 
    await Then('la nouvelle carte remplace l\'ancienne', null, { page }); 
    await And('l\'ancienne carte retourne en réserve', null, { page }); 
  });

  test('Retirer une carte d\'un slot', async ({ Given, When, Then, And, page }) => { 
    await Given('une carte est placée dans un slot', null, { page }); 
    await When('je clique sur la carte dans le slot', null, { page }); 
    await Then('la carte retourne en réserve', null, { page }); 
    await And('le slot redevient vide', null, { page }); 
  });

  test('Valider un ordre correct', async ({ Given, When, Then, And, page }) => { 
    await Given('toutes les cartes sont placées dans le bon ordre', null, { page }); 
    await When('je clique sur "Valider l\'ordre"', null, { page }); 
    await Then('toutes les cartes passent en vert', null, { page }); 
    await And('je vois l\'écran de fin avec un score parfait', null, { page }); 
  });

  test('Valider un ordre incorrect', async ({ Given, When, Then, And, page }) => { 
    await Given('les cartes sont placées dans le mauvais ordre', null, { page }); 
    await When('je clique sur "Valider l\'ordre"', null, { page }); 
    await Then('les cartes bien placées sont en vert', null, { page }); 
    await And('les cartes mal placées sont en rouge', null, { page }); 
  });

  test('Bouton valider caché si la frise est incomplète', async ({ Given, Then, page }) => { 
    await Given('la frise n\'est pas complète', null, { page }); 
    await Then('le bouton "Valider l\'ordre" est caché', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/e2e/features/restituer-frise.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Étant donné que je suis sur l'écran Restituer","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"Quand je clique sur \"Frise chronologique\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Frise chronologique\"","children":[{"start":15,"value":"Frise chronologique","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Alors je vois la consigne \"Place les événements dans l'ordre chronologique\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Place les événements dans l'ordre chronologique\"","children":[{"start":21,"value":"Place les événements dans l'ordre chronologique","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Et je vois 6 slots numérotés vides","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Et je vois 6 cartes en réserve","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Et je vois le compteur \"0 / 6 placés\"","stepMatchArguments":[{"group":{"start":20,"value":"\"0 / 6 placés\"","children":[{"start":21,"value":"0 / 6 placés","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":15,"pickleLine":12,"tags":[],"steps":[{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Étant donné que la frise est en cours","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"Quand je glisse une carte sur un slot","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Alors la carte apparaît dans le slot","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Et la carte disparaît de la réserve","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Et le compteur de cartes placées s'incrémente","stepMatchArguments":[]}]},
  {"pwTestLine":23,"pickleLine":19,"tags":[],"steps":[{"pwStepLine":24,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"Étant donné qu'un slot contient déjà une carte","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"Quand je glisse une nouvelle carte sur ce slot","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Alors la nouvelle carte remplace l'ancienne","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Et l'ancienne carte retourne en réserve","stepMatchArguments":[]}]},
  {"pwTestLine":30,"pickleLine":25,"tags":[],"steps":[{"pwStepLine":31,"gherkinStepLine":26,"keywordType":"Context","textWithKeyword":"Étant donné qu'une carte est placée dans un slot","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"Quand je clique sur la carte dans le slot","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Alors la carte retourne en réserve","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Et le slot redevient vide","stepMatchArguments":[]}]},
  {"pwTestLine":37,"pickleLine":31,"tags":[],"steps":[{"pwStepLine":38,"gherkinStepLine":32,"keywordType":"Context","textWithKeyword":"Étant donné que toutes les cartes sont placées dans le bon ordre","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"Quand je clique sur \"Valider l'ordre\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Valider l'ordre\"","children":[{"start":15,"value":"Valider l'ordre","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":40,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Alors toutes les cartes passent en vert","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Et je vois l'écran de fin avec un score parfait","stepMatchArguments":[]}]},
  {"pwTestLine":44,"pickleLine":37,"tags":[],"steps":[{"pwStepLine":45,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"Étant donné que les cartes sont placées dans le mauvais ordre","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"Quand je clique sur \"Valider l'ordre\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Valider l'ordre\"","children":[{"start":15,"value":"Valider l'ordre","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":47,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Alors les cartes bien placées sont en vert","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Et les cartes mal placées sont en rouge","stepMatchArguments":[]}]},
  {"pwTestLine":51,"pickleLine":43,"tags":[],"steps":[{"pwStepLine":52,"gherkinStepLine":44,"keywordType":"Context","textWithKeyword":"Étant donné que la frise n'est pas complète","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Alors le bouton \"Valider l'ordre\" est caché","stepMatchArguments":[{"group":{"start":10,"value":"\"Valider l'ordre\"","children":[{"start":11,"value":"Valider l'ordre","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end