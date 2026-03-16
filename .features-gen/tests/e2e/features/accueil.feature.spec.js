// Generated from: tests/e2e/features/accueil.feature
import { test } from "playwright-bdd";

test.describe('Écran d\'accueil', () => {

  test('Affichage de l\'accueil au chargement', async ({ Given, Then, And, page }) => { 
    await Given('j\'ouvre l\'application', null, { page }); 
    await Then('je vois le titre "Loto d\'Histoire"', null, { page }); 
    await And('je vois Maestro avec un message d\'accueil', null, { page }); 
    await And('je vois le défi du jour avec 5 cartes', null, { page }); 
    await And('je vois les 3 boutons d\'étapes "Découvrir", "Associer", "Restituer"', null, { page }); 
    await And('je vois la barre de progression', null, { page }); 
  });

  test('Navigation vers Découvrir', async ({ Given, When, Then, page }) => { 
    await Given('je suis sur l\'accueil', null, { page }); 
    await When('je clique sur "Découvrir"', null, { page }); 
    await Then('je vois l\'écran Découvrir avec la grille de cartes', null, { page }); 
  });

  test('Navigation vers Associer', async ({ Given, When, Then, page }) => { 
    await Given('je suis sur l\'accueil', null, { page }); 
    await When('je clique sur "Associer"', null, { page }); 
    await Then('je vois le choix entre "Quiz" et "Memory"', null, { page }); 
  });

  test('Navigation vers Restituer', async ({ Given, When, Then, page }) => { 
    await Given('je suis sur l\'accueil', null, { page }); 
    await When('je clique sur "Restituer"', null, { page }); 
    await Then('je vois le choix entre "Saisie libre" et "Frise chronologique"', null, { page }); 
  });

  test('Retour à l\'accueil depuis une étape', async ({ Given, When, Then, page }) => { 
    await Given('je suis sur l\'écran Découvrir', null, { page }); 
    await When('je clique sur "Retour"', null, { page }); 
    await Then('je vois l\'écran d\'accueil', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/e2e/features/accueil.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Étant donné que j'ouvre l'application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Alors je vois le titre \"Loto d'Histoire\"","stepMatchArguments":[{"group":{"start":17,"value":"\"Loto d'Histoire\"","children":[{"start":18,"value":"Loto d'Histoire","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Et je vois Maestro avec un message d'accueil","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Et je vois le défi du jour avec 5 cartes","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Et je vois les 3 boutons d'étapes \"Découvrir\", \"Associer\", \"Restituer\"","stepMatchArguments":[{"group":{"start":31,"value":"\"Découvrir\"","children":[{"start":32,"value":"Découvrir","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":44,"value":"\"Associer\"","children":[{"start":45,"value":"Associer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":56,"value":"\"Restituer\"","children":[{"start":57,"value":"Restituer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Et je vois la barre de progression","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":12,"tags":[],"steps":[{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Étant donné que je suis sur l'accueil","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"Quand je clique sur \"Découvrir\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Découvrir\"","children":[{"start":15,"value":"Découvrir","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Alors je vois l'écran Découvrir avec la grille de cartes","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":17,"tags":[],"steps":[{"pwStepLine":22,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"Étant donné que je suis sur l'accueil","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"Quand je clique sur \"Associer\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Associer\"","children":[{"start":15,"value":"Associer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Alors je vois le choix entre \"Quiz\" et \"Memory\"","stepMatchArguments":[{"group":{"start":23,"value":"\"Quiz\"","children":[{"start":24,"value":"Quiz","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":33,"value":"\"Memory\"","children":[{"start":34,"value":"Memory","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":27,"pickleLine":22,"tags":[],"steps":[{"pwStepLine":28,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Étant donné que je suis sur l'accueil","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"Quand je clique sur \"Restituer\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Restituer\"","children":[{"start":15,"value":"Restituer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":30,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Alors je vois le choix entre \"Saisie libre\" et \"Frise chronologique\"","stepMatchArguments":[{"group":{"start":23,"value":"\"Saisie libre\"","children":[{"start":24,"value":"Saisie libre","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":41,"value":"\"Frise chronologique\"","children":[{"start":42,"value":"Frise chronologique","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":33,"pickleLine":27,"tags":[],"steps":[{"pwStepLine":34,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Étant donné que je suis sur l'écran Découvrir","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"Quand je clique sur \"Retour\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Retour\"","children":[{"start":15,"value":"Retour","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":36,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Alors je vois l'écran d'accueil","stepMatchArguments":[]}]},
]; // bdd-data-end