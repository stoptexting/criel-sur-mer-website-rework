const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
global.window = window;
global.document = window.document;
global.$ = require('jquery');
const { faker } = require('@faker-js/faker');
const sondage = require("../js/sondage");

const avertissement = document.createElement('div');
const elm = document.createElement('input');
const elm1 = document.createElement('input');
const elm2 = document.createElement('input');
const elm3 = document.createElement('input');
elm.setAttribute('id', 'Nom');
elm1.setAttribute('id', 'Prenom');
elm2.setAttribute('id', 'DateNaissance');
elm3.setAttribute('id', 'adresse');
avertissement.setAttribute('id', 'Avertissement');

test('Verification aucun champs vides', () => {
    elm.value = "bob";
    elm1.value = "jone";
    elm2.value = "23/03/2003";
    elm3.value = "55 rue de la vilette";
    const tableau = [elm, elm1, elm2, elm3];
    const tableauAliments = [{ value: 'pomme' }, { value: 'fraise' }, { value: 'peche' }, { value: 'riz' }, { value: 'quiche' }, { value: 'thon' },{ value: 'steak' }, { value: 'ric' }];
    document.body.appendChild(avertissement);
    sondage.verif_formulaire(tableau, tableauAliments);
    expect(avertissement.innerText).toBe('');
  });

  test('Verification champs vide dans lidentité de la personne inscrites', () => {
      elm.value = "bob";
      elm1.value = "";
      elm2.value = "";
      elm3.value = "55 rue de la vilette";
      const tableau1 = [elm1, elm1, elm2, elm3];
      const tableauAliments1 = [{ value: 'pomme' }, { value: 'fraise' }, { value: 'peche' }, { value: 'riz' }, { value: 'quiche' }, { value: 'thon' },{ value: 'steak' }, { value: 'ric' }];
      document.body.appendChild(avertissement);
      sondage.verif_formulaire(tableau1, tableauAliments1);
      expect(avertissement.innerText).toBe("Veuillez remplir tous les champs du formulaires");
  });

  test('Verification champs vide dans les aliments', () => {
    elm.value = "bob";
    elm1.value = "jone";
    elm2.value = "23/06/2002";
    elm3.value = "55 rue de la vilette";
    avertissement.setAttribute('id', 'Avertissement');
    const tableau1 = [elm1, elm1, elm2, elm3];
    const tableauAliments1 = [{ value: 'pomme' }, { value: 'fraise' }, { value: '' }, { value: 'riz' }, { value: 'quiche' }, { value: 'thon' },{ value: 'steak' }, { value: 'ric' }];
    document.body.appendChild(avertissement);
    sondage.verif_formulaire(tableau1, tableauAliments1);
    expect(avertissement.innerText).toBe("Veuillez remplir tous les champs du formulaires");
});

const textNom = document.createElement('div');
const textPrenom = document.createElement('div');
const textVille = document.createElement('div');
textNom.setAttribute('id', 'pb-nom');
textPrenom.setAttribute('id', 'pb-prenom');
textVille.setAttribute('id', 'pb-ville');



test('Verification du nom incorrect, prenom et de la ville', () => {
  elm.value = "44!";
  elm1.value = "jones";
  elm2.value = "qilibitin";
  document.body.appendChild(avertissement);
  document.body.appendChild(textNom);
  document.body.appendChild(textPrenom);
  document.body.appendChild(textVille)
  sondage.verif_NomPrenomVille(elm, elm1, elm2, true);
  expect(avertissement.innerHTML).toBe("Veuillez remplir tous les champs du formulaires correctement");
  expect(textNom.innerHTML).toBe("Le nom ne doit contenir que des lettres de l'alphabets");
  expect(textPrenom.innerHTML).toBe("");
  expect(textVille.innerHTML).toBe("");
});

test('Verification du nom, prenom incorrect et de la ville incorrect', () => {
  elm.value = "bob";
  elm1.value = "carlos!";
  elm2.value = "qilibitin44";
  document.body.appendChild(avertissement);
  document.body.appendChild(textNom);
  document.body.appendChild(textPrenom);
  document.body.appendChild(textVille)
  sondage.verif_NomPrenomVille(elm, elm1, elm2, true);
  expect(avertissement.innerHTML).toBe("Veuillez remplir tous les champs du formulaires correctement"); 
  expect(textNom.innerHTML).toBe("");
  expect(textPrenom.innerHTML).toBe("Le prenom ne doit contenir que des lettres de l'alphabets");
  expect(textVille.innerHTML).toBe("Le nom de la ville ne doit contenir que des lettres de l'alphabets");
});

test('Verification du nom, prenom et de la ville correct', () => {
  elm.value = "pomme";
  elm1.value = "jones";
  elm2.value = "qilibitin";
  document.body.appendChild(avertissement);
  document.body.appendChild(textNom);
  document.body.appendChild(textPrenom);
  document.body.appendChild(textVille)
  sondage.verif_NomPrenomVille(elm, elm1, elm2, true);
  expect(avertissement.innerHTML).toBe("");
  expect(textNom.innerHTML).toBe("");
  expect(textPrenom.innerHTML).toBe("");
  expect(textVille.innerHTML).toBe("");
});

const textNaissance = document.createElement('div');
textNaissance.setAttribute('id', 'pb-naissance');



test('Verification de la date de naissance, cas année < 1908', () => {
  elm.value = "03/20/1900";
  document.body.appendChild(avertissement);
  document.body.appendChild(textNaissance);
  sondage.verif_AnneeNaissance(elm, true);
  expect(avertissement.innerText).toBe("Veuillez remplir tous les champs du formulaires correctement"); 
  expect(textNaissance.innerText).toBe("Veuillez entrez votre vraie date de naissance"); 
});

test('Verification de la date de naissance, cas age < 18', () => {
  elm.value = "03/20/2020";
  elm1.value = "akash";
  elm2.value = "selvaratnam";
  document.body.appendChild(avertissement);
  document.body.appendChild(textNaissance);
  sondage.verif_AnneeNaissance(elm);
  expect(avertissement.innerText).toBe("Redirection page d'accueil"); 
  expect(textNaissance.innerText).toBe("Vous n'êtez pas majeur, vous ne pouvez pas remplir ce sondage, vous serez donc redirigé vers la page d'accueil"); 
});

test('Verification de la date de naissance, cas correct', () => {
  elm.value = "03/20/1964";
  document.body.appendChild(avertissement);
  document.body.appendChild(textNaissance);
  sondage.verif_AnneeNaissance(elm, true);
  expect(avertissement.innerText).toBe(""); 
  expect(textNaissance.innerText).toBe(""); 
});

const textPostaleCode = document.createElement('div');
textPostaleCode.setAttribute('id', 'pb-CodePostale');

test('Verification du code postal de l utilisateur', () => {
  elm.value = "75015";
  document.body.appendChild(avertissement);
  document.body.appendChild(textPostaleCode);
  sondage.verif_PostalCode(elm, true);
  expect(avertissement.innerText).toBe(""); 
  expect(textPostaleCode.innerText).toBe(""); 
});

test('Verification du code postal de l utilisateur incorrect comportant des caractere différent à des chiffres', () => {
  elm.value = "750!a";
  document.body.appendChild(avertissement);
  document.body.appendChild(textPostaleCode);
  sondage.verif_PostalCode(elm, true);
  expect(avertissement.innerText).toBe("Veuillez remplir tous les champs du formulaires correctement"); 
  expect(textPostaleCode.innerText).toBe("Le code postale fournie est invalide"); 
});

test('Verification du code postal de l utilisateur incorrect composer inferieur à 5', () => {
  elm.value = "750";
  document.body.appendChild(avertissement);
  document.body.appendChild(textPostaleCode);
  sondage.verif_PostalCode(elm, true);
  expect(avertissement.innerText).toBe("Veuillez remplir tous les champs du formulaires correctement"); 
  expect(textPostaleCode.innerText).toBe("Le code postale fournie est invalide"); 
});



const textTelephone = document.createElement('div');
textTelephone.setAttribute('id', 'pb-numtel');

test('Verification numéro de téléphone, inférieur à 10', () => {
  elm.value = "064027027";
  document.body.appendChild(avertissement);
  document.body.appendChild(textTelephone);
  sondage.verif_TelephoneNumber(elm, true);
  expect(avertissement.innerText).toBe("Veuillez remplir tous les champs du formulaires correctement"); 
  expect(textTelephone.innerText).toBe("Le numéro de téléphone fournie est invalide"); 
});

test('Verification numéro de téléphone, supérieur à 10', () => {
  elm.value = "064027027";
  document.body.appendChild(avertissement);
  document.body.appendChild(textTelephone);
  sondage.verif_TelephoneNumber(elm, true);
  expect(avertissement.innerText).toBe("Veuillez remplir tous les champs du formulaires correctement"); 
  expect(textTelephone.innerText).toBe("Le numéro de téléphone fournie est invalide"); 
});

test('Verification numéro de téléphone contenant différent que des chiffres', () => {
  elm.value = "mop0640270";
  document.body.appendChild(avertissement);
  document.body.appendChild(textTelephone);
  sondage.verif_TelephoneNumber(elm, true);
  expect(avertissement.innerText).toBe("Veuillez remplir tous les champs du formulaires correctement"); 
  expect(textTelephone.innerText).toBe("Le numéro de téléphone fournie est invalide"); 
});

test('Verification aliments Corrects', () => {
  const tableauAliments = [{ value: 'pomme' }, { value: 'fraise' }, { value: 'peche' }, { value: 'riz' }, { value: 'quiche' }, { value: 'thon' },{ value: 'steak' }, { value: 'ric' }];
  document.body.appendChild(avertissement);
  sondage.verifAliment(tableauAliments, true);
  expect(avertissement.innerText).toBe('');
});

test('Verification aliments Corrects/ cas tableau plusieur meme aliments', () => {
  const tableauAliments = [{ value: 'pomme' }, { value: 'fraise' }, { value: 'peche' }, { value: 'fraise' }, { value: 'quiche' }, { value: 'thon' },{ value: 'steak' }, { value: 'ric' }];
  document.body.appendChild(avertissement);
  sondage.verifAliment(tableauAliments, true);
  expect(avertissement.innerText).toBe("veuillez choisir des aliments différents dans la liste, probleme aliment n° 2 avec l'aliment n° 4");
});

test('Appel a la taille de la base de donnée supérieur à 0', async() => {
  const result = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/TailleBD.json`);
  const resultat = await result.json();
  expect(resultat.taille).toBeGreaterThan(0);
});

test('Appel a la table alimentation, verification de l aliment numéro 6 : Blé dur précuit, grains entiers, cuisiné, à poêler', async() =>{
  const result = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/products/6.json`);
  const resultat = await result.json();
  expect(resultat.alim_nom_fr).toBe("Blé dur précuit, grains entiers, cuisiné, à poêler");
})

test('Appel a la table résultat, verification du resultat sondage numéro 6 aliment 1: âtonnet pané soja et blé (convient aux véganes ou végétaliens), préemballée', async() =>{
  const result = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/UserAlimentation/6.json`);
  const resultat = await result.json();
  expect(resultat.aliment1).toBe("Bâtonnet pané soja et blé (convient aux véganes ou végétaliens), préemballée");
})

test('Insertion manuel dans la base de donne UserAlimention (resultat), verification', async() =>{
  const result = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/TailleBD.json`);
  const resultat = await result.json();
  const val = resultat.taille;
  const result2 = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/UserAlimentation/${val}.json`, {
    method : "PUT",
    headers : {
        'Content-Type': 'application/json',
    },
    body : JSON.stringify({
        nom : "joe",
        prenom : "Don",
        naissance : "24/03/1999",
        adresse : "99 avenue versailles",
        codePostale : "75016",
        ville : "paris",
        telephone : "0632489517", 
        aliment1 : "Blé dur précuit, grains entiers, cuisiné, à poêle",
        aliment2 : "Bâtonnet pané soja et blé (convient aux véganes ou végétaliens), préemballée",
        aliment3 : "Carpaccio de boeuf, avec marinade",
        aliment4 : "Brochette de poisson",
        aliment5 : "Canard en sauce (poivre vert, chasseur, etc.), préemballé",
        aliment6 : "Aligot (purée de pomme de terre à la tomme fraîche), préemballé",
        aliment7 : "Cassoulet, appertisé",
        aliment8 : "Beignet de légumes",
        aliment9 : "Croque-monsieur, fait maison",
        aliment10 : "Brochette de volaille, cuite",
    }),
  })
  if(!result2.ok){
    throw new error("Base de donnée non connecté");
  }
  const valeurFinal = val + 1;
  const tailleFinale = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/TailleBD.json`, {
    method : "PUT",
    headers : {
        'Content-Type': 'application/json',
    },
    body : JSON.stringify({
        taille : valeurFinal,
    }),
  })
  if(!result.ok){
    throw new error("Base de donnée non connecté");
  }

const resulttaille = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/TailleBD.json`);
const resultattailleFinal = await resulttaille.json();
const valfinal = resultattailleFinal.taille;
const resultatfinaux = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/UserAlimentation/${val}.json`);
const resJSON = await resultatfinaux.json();
const rnom = resJSON.nom;
const ral1 = resJSON.aliment1;
expect(rnom).toBe("joe");
expect(ral1).toBe("Blé dur précuit, grains entiers, cuisiné, à poêle");
expect(valfinal).toBe(valeurFinal);
}
)

test("insertion donnée dans UserAlimentation (résultat) avec la génération de donnée (faker)", async()=>{
  const result = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/TailleBD.json`);
  const resultat = await result.json();
  var val = resultat.taille;
  var al1Gen = "";
  var tabAlimentsGenerer = new Array();
  var nomP = "";
  for(var l = 0; l < 10; l++){
    var indice = faker.mersenne.rand(999, 0);
    var resultatAlimentGenerer = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/products/${indice}.json`);
    var resultatAlimentsGen = await resultatAlimentGenerer.json();
    var alimentGenerer = resultatAlimentsGen.alim_nom_fr;
    tabAlimentsGenerer.push(alimentGenerer);
  }
    var date = faker.date.between('1908-01-01', '2005-01-01');
    nomP = faker.name.lastName();
    var d = new Date(date);
    al1Gen = tabAlimentsGenerer[0];
    var formattedDate = date.toLocaleDateString();
    var result2 = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/UserAlimentation/${val}.json`, {
        method : "PUT",
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({
            nom : nomP,
            prenom : faker.name.firstName(),
            naissance : formattedDate,
            adresse : faker.address.streetAddress(),
            codePostale : faker.address.zipCode('#####'),
            ville : faker.address.city(),
            telephone : faker.phone.phoneNumber('##########'), 
            aliment1 : al1Gen,
            aliment2 : tabAlimentsGenerer[1],
            aliment3 : tabAlimentsGenerer[2],
            aliment4 : tabAlimentsGenerer[3],
            aliment5 : tabAlimentsGenerer[4],
            aliment6 : tabAlimentsGenerer[5],
            aliment7 : tabAlimentsGenerer[6],
            aliment8 : tabAlimentsGenerer[7],
            aliment9 : tabAlimentsGenerer[8],
            aliment10 : tabAlimentsGenerer[9],
        }),
      })
      if(!result2.ok){
        throw new error("Base de donnée non connecté");
      }

const tailleFinale = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/TailleBD.json`, {
          method : "PUT",
          headers : {
              'Content-Type': 'application/json',
          },
          body : JSON.stringify({
              taille : val + 1,
          }),
        })
        if(!result.ok){
          throw new error("Base de donnée non connecté");
        }
        var resultAlimentGenereFinal = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/UserAlimentation/${val}.json`); 
        var resgenFin =  await resultAlimentGenereFinal.json();
        expect(resgenFin.nom).toEqual(nomP);
        expect(resgenFin.aliment1).toEqual(al1Gen);
        const resulttaille = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/TailleBD.json`);
        const resultattailleFinal = await resulttaille.json();
        const valfinal = resultattailleFinal.taille;
        expect(valfinal).toBe(val + 1);               

})
