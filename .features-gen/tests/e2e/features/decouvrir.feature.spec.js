// Generated from: tests/e2e/features/decouvrir.feature
import { test } from "playwright-bdd";

test.describe('Étape 1 — Découvrir', () => {

  test('Affichage de la grille de cartes', async ({ Given, Then, And, page }) => { 
    await Given('je lance l\'étape Découvrir', null, { page }); 
    await Then('je vois une grille de 27 cartes', null, { page }); 
    await And('chaque carte affiche une date et un titre', null, { page }); 
  });

  test('Ouvrir le détail d\'une carte', async ({ Given, When, Then, And, page }) => { 
    await Given('je suis sur la grille Découvrir', null, { page }); 
    await When('je clique sur une carte', null, { page }); 
    await Then('je vois l\'image de la carte en grand', null, { page }); 
    await And('je vois la date et le titre de l\'événement', null, { page }); 
    await And('je vois la description', null, { page }); 
    await And('je vois le paragraphe explicatif', null, { page }); 
    await And('le bouton "Retour" ramène à la grille', null, { page }); 
  });

  test('Navigation entre les cartes en vue détail', async ({ Given, When, Then, And, page }) => { 
    await Given('je suis sur le détail d\'une carte', null, { page }); 
    await When('je clique sur la flèche suivante', null, { page }); 
    await Then('je vois la carte suivante', null, { page }); 
    await And('le compteur affiche la position correcte', null, { page }); 
  });

  test('Anecdote verrouillée avant première réussite', async ({ Given, When, Then, page }) => { 
    await Given('je n\'ai jamais réussi la carte', null, { page }); 
    await When('je consulte son détail', null, { page }); 
    await Then('l\'anecdote affiche "Réussis cette carte pour débloquer l\'anecdote !"', null, { page }); 
  });

  test('Un seul bouton retour en vue détail', async ({ Given, Then, And, page }) => { 
    await Given('je suis sur le détail d\'une carte', null, { page }); 
    await Then('je vois un seul bouton "Retour"', null, { page }); 
    await And('le bouton retour ramène à la grille, pas à l\'accueil', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/e2e/features/decouvrir.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Étant donné que je lance l'étape Découvrir","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Alors je vois une grille de 27 cartes","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Et chaque carte affiche une date et un titre","stepMatchArguments":[]}]},
  {"pwTestLine":12,"pickleLine":9,"tags":[],"steps":[{"pwStepLine":13,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Étant donné que je suis sur la grille Découvrir","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"Quand je clique sur une carte","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Alors je vois l'image de la carte en grand","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Et je vois la date et le titre de l'événement","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Et je vois la description","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Et je vois le paragraphe explicatif","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Et le bouton \"Retour\" ramène à la grille","stepMatchArguments":[{"group":{"start":10,"value":"\"Retour\"","children":[{"start":11,"value":"Retour","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":22,"pickleLine":18,"tags":[],"steps":[{"pwStepLine":23,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Étant donné que je suis sur le détail d'une carte","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"Quand je clique sur la flèche suivante","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Alors je vois la carte suivante","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Et le compteur affiche la position correcte","stepMatchArguments":[]}]},
  {"pwTestLine":29,"pickleLine":24,"tags":[],"steps":[{"pwStepLine":30,"gherkinStepLine":25,"keywordType":"Context","textWithKeyword":"Étant donné que je n'ai jamais réussi la carte","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"Quand je consulte son détail","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Alors l'anecdote affiche \"Réussis cette carte pour débloquer l'anecdote !\"","stepMatchArguments":[{"group":{"start":19,"value":"\"Réussis cette carte pour débloquer l'anecdote !\"","children":[{"start":20,"value":"Réussis cette carte pour débloquer l'anecdote !","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":35,"pickleLine":29,"tags":[],"steps":[{"pwStepLine":36,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"Étant donné que je suis sur le détail d'une carte","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Alors je vois un seul bouton \"Retour\"","stepMatchArguments":[{"group":{"start":23,"value":"\"Retour\"","children":[{"start":24,"value":"Retour","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Et le bouton retour ramène à la grille, pas à l'accueil","stepMatchArguments":[]}]},
]; // bdd-data-end