// Generated from: tests/e2e/features/associer-quiz.feature
import { test } from "playwright-bdd";

test.describe('Étape 2 — Associer (Quiz)', () => {

  test('Lancer le mode Quiz', async ({ Given, When, Then, And, page }) => { 
    await Given('je suis sur l\'écran Associer', null, { page }); 
    await When('je clique sur "Quiz"', null, { page }); 
    await Then('je vois une question avec 4 propositions', null, { page }); 
    await And('je vois le compteur "Question 1 / 10"', null, { page }); 
  });

  test('Répondre correctement', async ({ Given, When, Then, And, page }) => { 
    await Given('je suis sur une question du quiz', null, { page }); 
    await When('je clique sur la bonne réponse', null, { page }); 
    await Then('le bouton correct est vert', null, { page }); 
    await And('je vois le message "Bravo ! Bonne réponse !"', null, { page }); 
    await And('le personnage Maestro apparaît avec un commentaire', null, { page }); 
    await And('le bouton "Question suivante" apparaît', null, { page }); 
  });

  test('Répondre incorrectement', async ({ Given, When, Then, And, page }) => { 
    await Given('je suis sur une question du quiz', null, { page }); 
    await When('je clique sur une mauvaise réponse', null, { page }); 
    await Then('le bouton choisi est rouge', null, { page }); 
    await And('le bon bouton est vert', null, { page }); 
    await And('je vois la bonne réponse avec la date et le titre', null, { page }); 
    await And('le personnage Maestro encourage', null, { page }); 
  });

  test('Passer à la question suivante', async ({ Given, When, Then, And, page }) => { 
    await Given('j\'ai répondu à une question', null, { page }); 
    await When('je clique sur "Question suivante"', null, { page }); 
    await Then('je vois une nouvelle question', null, { page }); 
    await And('le compteur s\'incrémente', null, { page }); 
  });

  test('Fin du quiz', async ({ Given, Then, page }) => { 
    await Given('j\'ai répondu à toutes les questions', null, { page }); 
    await Then('je vois l\'écran de fin avec mon score', null, { page }); 
  });

  test('Mode image vers date', async ({ Given, Then, And, page }) => { 
    await Given('la question est en mode image→date', null, { page }); 
    await Then('je vois l\'image sans date', null, { page }); 
    await And('je vois la description de l\'événement', null, { page }); 
    await And('les 4 propositions sont des dates', null, { page }); 
  });

  test('Mode date vers événement', async ({ Given, Then, And, page }) => { 
    await Given('la question est en mode date→événement', null, { page }); 
    await Then('je vois la date en grand', null, { page }); 
    await And('les 4 propositions sont des descriptions d\'événements', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/e2e/features/associer-quiz.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Étant donné que je suis sur l'écran Associer","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"Quand je clique sur \"Quiz\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Quiz\"","children":[{"start":15,"value":"Quiz","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Alors je vois une question avec 4 propositions","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Et je vois le compteur \"Question 1 / 10\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Question 1 / 10\"","children":[{"start":21,"value":"Question 1 / 10","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":13,"pickleLine":10,"tags":[],"steps":[{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Étant donné que je suis sur une question du quiz","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"Quand je clique sur la bonne réponse","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Alors le bouton correct est vert","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Et je vois le message \"Bravo ! Bonne réponse !\"","stepMatchArguments":[{"group":{"start":19,"value":"\"Bravo ! Bonne réponse !\"","children":[{"start":20,"value":"Bravo ! Bonne réponse !","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Et le personnage Maestro apparaît avec un commentaire","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Et le bouton \"Question suivante\" apparaît","stepMatchArguments":[{"group":{"start":10,"value":"\"Question suivante\"","children":[{"start":11,"value":"Question suivante","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":22,"pickleLine":18,"tags":[],"steps":[{"pwStepLine":23,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Étant donné que je suis sur une question du quiz","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"Quand je clique sur une mauvaise réponse","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Alors le bouton choisi est rouge","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Et le bon bouton est vert","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Et je vois la bonne réponse avec la date et le titre","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Et le personnage Maestro encourage","stepMatchArguments":[]}]},
  {"pwTestLine":31,"pickleLine":26,"tags":[],"steps":[{"pwStepLine":32,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"Étant donné que j'ai répondu à une question","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"Quand je clique sur \"Question suivante\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Question suivante\"","children":[{"start":15,"value":"Question suivante","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":34,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Alors je vois une nouvelle question","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Et le compteur s'incrémente","stepMatchArguments":[]}]},
  {"pwTestLine":38,"pickleLine":32,"tags":[],"steps":[{"pwStepLine":39,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"Étant donné que j'ai répondu à toutes les questions","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Alors je vois l'écran de fin avec mon score","stepMatchArguments":[]}]},
  {"pwTestLine":43,"pickleLine":36,"tags":[],"steps":[{"pwStepLine":44,"gherkinStepLine":37,"keywordType":"Context","textWithKeyword":"Étant donné que la question est en mode image→date","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"Alors je vois l'image sans date","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Et je vois la description de l'événement","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Et les 4 propositions sont des dates","stepMatchArguments":[]}]},
  {"pwTestLine":50,"pickleLine":42,"tags":[],"steps":[{"pwStepLine":51,"gherkinStepLine":43,"keywordType":"Context","textWithKeyword":"Étant donné que la question est en mode date→événement","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Alors je vois la date en grand","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Et les 4 propositions sont des descriptions d'événements","stepMatchArguments":[]}]},
]; // bdd-data-end