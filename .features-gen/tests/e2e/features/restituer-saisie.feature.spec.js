// Generated from: tests/e2e/features/restituer-saisie.feature
import { test } from "playwright-bdd";

test.describe('Étape 3 — Restituer (Saisie libre)', () => {

  test('Lancer le mode Saisie libre', async ({ Given, When, Then, And, page }) => { 
    await Given('je suis sur l\'écran Restituer', null, { page }); 
    await When('je clique sur "Saisie libre"', null, { page }); 
    await Then('je vois une image sans date', null, { page }); 
    await And('je vois la description de l\'événement', null, { page }); 
    await And('je vois un champ de saisie avec le placeholder "ex: 1515"', null, { page }); 
    await And('je vois le bouton "Valider"', null, { page }); 
  });

  test('Saisir la bonne date', async ({ Given, When, Then, And, page }) => { 
    await Given('je suis sur une question de saisie', null, { page }); 
    await When('je tape la bonne date et valide', null, { page }); 
    await Then('le champ passe en vert', null, { page }); 
    await And('je vois "Bravo !"', null, { page }); 
    await And('Maestro me félicite', null, { page }); 
    await And('le bouton "Suivant" apparaît', null, { page }); 
  });

  test('Saisir une mauvaise date', async ({ Given, When, Then, And, page }) => { 
    await Given('je suis sur une question de saisie', null, { page }); 
    await When('je tape une mauvaise date et valide', null, { page }); 
    await Then('le champ passe en rouge', null, { page }); 
    await And('je vois la bonne réponse avec la date attendue', null, { page }); 
    await And('Maestro m\'encourage', null, { page }); 
  });

  test('Valider avec la touche Entrée', async ({ Given, When, Then, page }) => { 
    await Given('je suis sur une question de saisie', null, { page }); 
    await When('je tape une date et appuie sur Entrée', null, { page }); 
    await Then('la réponse est validée', null, { page }); 
  });

  test('Saisie stricte des dates négatives', async ({ Given, When, Then, page }) => { 
    await Given('la carte attendue est "52 av. J.-C."', null, { page }); 
    await When('je tape "-52" et valide', null, { page }); 
    await Then('la réponse est correcte', null, { page }); 
  });

  test('Saisie vide ignorée', async ({ Given, When, Then, page }) => { 
    await Given('je suis sur une question de saisie', null, { page }); 
    await When('je clique sur "Valider" sans rien taper', null, { page }); 
    await Then('rien ne se passe', null, { page }); 
  });

  test('Fin de la saisie libre', async ({ Given, Then, page }) => { 
    await Given('j\'ai répondu à toutes les questions', null, { page }); 
    await Then('je vois l\'écran de fin avec mon score', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/e2e/features/restituer-saisie.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Étant donné que je suis sur l'écran Restituer","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"Quand je clique sur \"Saisie libre\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Saisie libre\"","children":[{"start":15,"value":"Saisie libre","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Alors je vois une image sans date","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Et je vois la description de l'événement","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Et je vois un champ de saisie avec le placeholder \"ex: 1515\"","stepMatchArguments":[{"group":{"start":47,"value":"\"ex: 1515\"","children":[{"start":48,"value":"ex: 1515","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Et je vois le bouton \"Valider\"","stepMatchArguments":[{"group":{"start":18,"value":"\"Valider\"","children":[{"start":19,"value":"Valider","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":15,"pickleLine":12,"tags":[],"steps":[{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Étant donné que je suis sur une question de saisie","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"Quand je tape la bonne date et valide","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Alors le champ passe en vert","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Et je vois \"Bravo !\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Bravo !\"","children":[{"start":9,"value":"Bravo !","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Et Maestro me félicite","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Et le bouton \"Suivant\" apparaît","stepMatchArguments":[{"group":{"start":10,"value":"\"Suivant\"","children":[{"start":11,"value":"Suivant","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":24,"pickleLine":20,"tags":[],"steps":[{"pwStepLine":25,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"Étant donné que je suis sur une question de saisie","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"Quand je tape une mauvaise date et valide","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Alors le champ passe en rouge","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Et je vois la bonne réponse avec la date attendue","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Et Maestro m'encourage","stepMatchArguments":[]}]},
  {"pwTestLine":32,"pickleLine":27,"tags":[],"steps":[{"pwStepLine":33,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Étant donné que je suis sur une question de saisie","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"Quand je tape une date et appuie sur Entrée","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Alors la réponse est validée","stepMatchArguments":[]}]},
  {"pwTestLine":38,"pickleLine":32,"tags":[],"steps":[{"pwStepLine":39,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"Étant donné que la carte attendue est \"52 av. J.-C.\"","stepMatchArguments":[{"group":{"start":22,"value":"\"52 av. J.-C.\"","children":[{"start":23,"value":"52 av. J.-C.","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":40,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"Quand je tape \"-52\" et valide","stepMatchArguments":[{"group":{"start":8,"value":"\"-52\"","children":[{"start":9,"value":"-52","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":41,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Alors la réponse est correcte","stepMatchArguments":[]}]},
  {"pwTestLine":44,"pickleLine":37,"tags":[],"steps":[{"pwStepLine":45,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"Étant donné que je suis sur une question de saisie","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"Quand je clique sur \"Valider\" sans rien taper","stepMatchArguments":[{"group":{"start":14,"value":"\"Valider\"","children":[{"start":15,"value":"Valider","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":47,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Alors rien ne se passe","stepMatchArguments":[]}]},
  {"pwTestLine":50,"pickleLine":42,"tags":[],"steps":[{"pwStepLine":51,"gherkinStepLine":43,"keywordType":"Context","textWithKeyword":"Étant donné que j'ai répondu à toutes les questions","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Alors je vois l'écran de fin avec mon score","stepMatchArguments":[]}]},
]; // bdd-data-end