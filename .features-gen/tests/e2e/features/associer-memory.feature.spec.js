// Generated from: tests/e2e/features/associer-memory.feature
import { test } from "playwright-bdd";

test.describe('Étape 2 — Associer (Memory)', () => {

  test('Lancer le mode Memory', async ({ Given, When, Then, And, page }) => { 
    await Given('je suis sur l\'écran Associer', null, { page }); 
    await When('je clique sur "Memory"', null, { page }); 
    await Then('je vois une grille de 12 tuiles retournées', null, { page }); 
    await And('je vois le compteur "Coups : 0"', null, { page }); 
    await And('je vois le compteur "Paires : 0 / 6"', null, { page }); 
  });

  test('Retourner une tuile', async ({ Given, When, Then, And, page }) => { 
    await Given('le memory est en cours', null, { page }); 
    await When('je clique sur une tuile', null, { page }); 
    await Then('la tuile se retourne avec une animation flip', null, { page }); 
    await And('je vois soit une image soit un titre d\'événement', null, { page }); 
  });

  test('Trouver une paire', async ({ Given, When, Then, And, page }) => { 
    await Given('j\'ai retourné une tuile image', null, { page }); 
    await When('je retourne la tuile titre correspondante', null, { page }); 
    await Then('les deux tuiles restent visibles', null, { page }); 
    await And('elles sont marquées comme trouvées (bordure verte)', null, { page }); 
    await And('le compteur de paires s\'incrémente', null, { page }); 
    await And('Maestro me félicite', null, { page }); 
  });

  test('Échouer une paire', async ({ Given, When, Then, And, page }) => { 
    await Given('j\'ai retourné une tuile', null, { page }); 
    await When('je retourne une tuile qui ne correspond pas', null, { page }); 
    await Then('les deux tuiles se retournent face cachée après un délai', null, { page }); 
    await And('le compteur de coups s\'incrémente', null, { page }); 
  });

  test('Impossible de cliquer pendant le retournement', async ({ Given, When, Then, page }) => { 
    await Given('deux tuiles non-paires sont visibles', null, { page }); 
    await When('je clique sur une autre tuile pendant le délai', null, { page }); 
    await Then('rien ne se passe', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/e2e/features/associer-memory.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Étant donné que je suis sur l'écran Associer","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"Quand je clique sur \"Memory\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Memory\"","children":[{"start":15,"value":"Memory","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Alors je vois une grille de 12 tuiles retournées","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Et je vois le compteur \"Coups : 0\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Coups : 0\"","children":[{"start":21,"value":"Coups : 0","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Et je vois le compteur \"Paires : 0 / 6\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Paires : 0 / 6\"","children":[{"start":21,"value":"Paires : 0 / 6","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":14,"pickleLine":11,"tags":[],"steps":[{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"Étant donné que le memory est en cours","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"Quand je clique sur une tuile","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Alors la tuile se retourne avec une animation flip","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Et je vois soit une image soit un titre d'événement","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":17,"tags":[],"steps":[{"pwStepLine":22,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"Étant donné que j'ai retourné une tuile image","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"Quand je retourne la tuile titre correspondante","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Alors les deux tuiles restent visibles","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Et elles sont marquées comme trouvées (bordure verte)","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Et le compteur de paires s'incrémente","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Et Maestro me félicite","stepMatchArguments":[]}]},
  {"pwTestLine":30,"pickleLine":25,"tags":[],"steps":[{"pwStepLine":31,"gherkinStepLine":26,"keywordType":"Context","textWithKeyword":"Étant donné que j'ai retourné une tuile","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"Quand je retourne une tuile qui ne correspond pas","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Alors les deux tuiles se retournent face cachée après un délai","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Et le compteur de coups s'incrémente","stepMatchArguments":[]}]},
  {"pwTestLine":37,"pickleLine":31,"tags":[],"steps":[{"pwStepLine":38,"gherkinStepLine":32,"keywordType":"Context","textWithKeyword":"Étant donné que deux tuiles non-paires sont visibles","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"Quand je clique sur une autre tuile pendant le délai","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Alors rien ne se passe","stepMatchArguments":[]}]},
]; // bdd-data-end