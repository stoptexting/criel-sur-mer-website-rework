var nom;
var prenom;
var naissance;
var adresse;
var codePostale;
var btnSuivant;
var ville;
var telephone;
var tab;
var bool;
var result;
var resultatFinaux;
var tabAliments;
var btnGenerer;
const valeur = 0;
var tabAlimentsGenerer;
async function main(){
    nom = document.getElementById("Nom");
    prenom = document.getElementById("Prenom");
    naissance = document.getElementById("DateNaissance");
    adresse= document.getElementById("Adresse");
    codePostale = document.getElementById("CodePostale");
    ville = document.getElementById("Ville"),
    telephone = document.getElementById("NumTel")
    btnSuivant = document.getElementById("btnsuiv");
    btnGenerer = document.getElementById("btnGenerer");
    aliment = $('[name="Al"]');
    resultatFinaux = [];
    tabAlimentsGenerer = [];
    tab = new Array(nom, prenom, naissance, adresse, codePostale, ville);
    tabAliments = new Array(document.getElementById("Al1"),document.getElementById("Al2"),document.getElementById("Al3"),document.getElementById("Al4"),document.getElementById("Al5"),document.getElementById("Al6"),document.getElementById("Al7"),document.getElementById("Al8"),document.getElementById("Al9"),document.getElementById("Al10"))
   for(var i = 0; i < 1000; i++){
        result = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/products/${i}.json`) 
        const resultat = await result.json();
        aliment.append(`<option>${resultat.alim_nom_fr}</option>`)
    }
    btnSuivant.addEventListener("click", function() {
        verif_formulaire(tab, tabAliments, false)
    });
    btnGenerer.addEventListener("click", function(){
        GenererFormulaire();//a changer
    });

}

async function GenererAlimentsFormulaire(){
tabAlimentsGenerer.splice(0, tab.length);
for(var i = 0; i < 10; i++){
    var indice = faker.random.number({min:0, max:999});
    result = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/products/${indice}.json`)
    const resultat = await result.json();
    const alimentGenerer = resultat.alim_nom_fr;
    tabAlimentsGenerer.push(alimentGenerer);
}
}

async function GenererFormulaire(){
    document.getElementById("Avertissement").innerHTML = `<p id="Avertissement" class="mb-4 text-base text-black">Génération des données, Veuillez patienter</p>`;
    const result = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/TailleBD.json`);
    const resultat = await result.json();
    var val = resultat.taille;
    var indiceVal = val;
    for(var i = 0; i < 100; i++){
        tabAlimentsGenerer.splice(0, tabAlimentsGenerer.length);
        for(var l = 0; l < 10; l++){
            var indice = faker.random.number({min:0, max:999});
            var resultatAlimentGenerer = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/products/${indice}.json`);
            var resultatAlimentsGen = await resultatAlimentGenerer.json();
            var alimentGenerer = resultatAlimentsGen.alim_nom_fr;
            tabAlimentsGenerer.push(alimentGenerer);
        }
      var date = faker.date.between('1908-01-01', '2005-01-01');
      var d = new Date(date);
      var formattedDate = date.toLocaleDateString();
      var result2 = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/UserAlimentation/${indiceVal}.json`, {
        method : "PUT",
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({
            nom : faker.name.lastName(),
            prenom : faker.name.firstName(),
            naissance : formattedDate,
            adresse : faker.address.streetAddress(),
            codePostale : faker.address.zipCode('#####'),
            ville : faker.address.city(),
            telephone : faker.phone.phoneNumber('##########'), 
            aliment1 : tabAlimentsGenerer[0],
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
      else{
        console.log(indiceVal);
        console.log(i);
        indiceVal = indiceVal + 1;
      }
    }
    AJourFormulaire();
}    


async function AJourFormulaire(){
    const result = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/TailleBD.json`);
    const resultat = await result.json();
    const val = resultat.taille;
    const tailleFinale = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/TailleBD.json`, {
          method : "PUT",
          headers : {
              'Content-Type': 'application/json',
          },
          body : JSON.stringify({
              taille : val + 100,
          }),
        })
        if(!result.ok){
          throw new error("Base de donnée non connecté");
        }
        else{
            document.getElementById("Avertissement").innerHTML = `<p id="Avertissement" class="mb-4 text-base text-black">Données généré sur la base de donnée, résultat prêt sur la page résultat, générer 100 données de plus ou quitter la page</p>`;
            btnSuivant.disabled = true;
        }
}

function verif_formulaire(tableau, tableauAliments, test){
    bool = false;
    console.log(tableau[0].value);
    for(var i = 0; i < tableau.length; i++){
        if(tableau[i].value.trim() === ""){
            document.getElementById("Avertissement").innerText = "Veuillez remplir tous les champs du formulaires";
            bool = true;
            break;    
        }
        if(i === tableau.length-1){
            document.getElementById("Avertissement").innerText = "";
        }
    }
    for(var i = 0; i < tableauAliments.length; i++){
        if(tableauAliments[i].value === ""){
            document.getElementById("Avertissement").innerText = "Veuillez remplir tous les champs du formulaires";
            bool = true;
            break;
        }
    }
    if(bool == false && test === false){
        verif_NomPrenomVille(nom, prenom, ville, false);
    } 
}

function verif_NomPrenomVille(familyname, name, city, test){
    var error =false;
    if(test === false){
        btnSuivant.removeEventListener("click", verif_formulaire);
    }
    if(/^[a-zA-Z]+$/.test(familyname.value) === false){
        document.getElementById("Avertissement").innerHTML = "Veuillez remplir tous les champs du formulaires correctement";
        document.getElementById("pb-nom").innerHTML = "Le nom ne doit contenir que des lettres de l'alphabets";
        bool = true;
        error = true;
    }
    else{
        document.getElementById("pb-nom").innerHTML = "";
    }
    if(/^[a-zA-Z]+$/.test(name.value) === false){
        document.getElementById("Avertissement").innerHTML = "Veuillez remplir tous les champs du formulaires correctement";
        document.getElementById("pb-prenom").innerHTML = "Le prenom ne doit contenir que des lettres de l'alphabets";
        bool = true;
        error = true;
    }
    else{
        document.getElementById("pb-prenom").innerHTML = "";
    }
    if(/^[a-zA-Z]+$/.test(city.value) === false){
        document.getElementById("Avertissement").innerHTML = "Veuillez remplir tous les champs du formulaires correctement";
        document.getElementById("pb-ville").innerHTML = "Le nom de la ville ne doit contenir que des lettres de l'alphabets"
        bool = true;
        error = true;
    }
    else{
        document.getElementById("pb-ville").innerHTML = "";
    }
    if(error == false && test == true){
        document.getElementById("Avertissement").innerHTML = "";
    }
    if(bool === false){
        document.getElementById("Avertissement").innerHTML = "";
        verif_AnneeNaissance(naissance, false);
    }

}

function verif_AnneeNaissance(naissanceDate, test){
    console.log(naissanceDate.value);
    var date = new Date(naissanceDate.value);
    var dateActuelle = new Date();
    var anneeActuelle = dateActuelle.getFullYear();
    var annee = date.getFullYear();
    var error = false;
    if(anneeActuelle - annee < 18){
        document.getElementById("Avertissement").innerText = "Redirection page d'accueil";
        document.getElementById("pb-naissance").innerText = "Vous n'êtez pas majeur, vous ne pouvez pas remplir ce sondage, vous serez donc redirigé vers la page d'accueil";
        if(test === false){
            for(var i = 0; i < tab.length; i++){
                tab[i].disabled = true;
            }
            btnSuivant.disabled = true;
        }
        bool = true;
        error = true;
        setTimeout(function() {
            window.location.href = "./index.html";
          }, 5000);
    }
    if(anneeActuelle - annee > 115){
        document.getElementById("Avertissement").innerText = "Veuillez remplir tous les champs du formulaires correctement";
        document.getElementById("pb-naissance").innerText = "Veuillez entrez votre vraie date de naissance";
        bool = true;
        error = true;
        if(test == false){
            verif_PostalCode();
        }
    }
    if(error == false && test == true){
        document.getElementById("Avertissement").innerText = "";
        document.getElementById("pb-naissance").innerText = "";
    }
    if(bool == false){
        verif_PostalCode(codePostale, false);
    }
}

function verif_PostalCode(PostaleCode, test){
    var error = false;
    if(PostaleCode.value.length < 5 || /^[0-9]*$/.test(PostaleCode.value) === false){
        document.getElementById("Avertissement").innerText = "Veuillez remplir tous les champs du formulaires correctement";
        document.getElementById("pb-CodePostale").innerText = "Le code postale fournie est invalide";
        bool = true;
        error = true;
        if(test == false){
            verif_TelephoneNumber();
        }
    }
    if(error == false && test == true){
        document.getElementById("pb-CodePostale").innerText = "";
        document.getElementById("Avertissement").innerText = "";
    }
    if(bool == false){
        document.getElementById("Avertissement").innerText = "";
        verif_TelephoneNumber(telephone, false);
    }
}

function verif_TelephoneNumber(telephoneNumber, test){
    var error = false;
    if(telephoneNumber.value.length < 10 || telephoneNumber.value.length > 10  || /^[0-9]*$/.test(telephoneNumber.value) === false){
        document.getElementById("pb-numtel").innerText = "Le numéro de téléphone fournie est invalide";
        document.getElementById("Avertissement").innerText = "Veuillez remplir tous les champs du formulaires correctement";
        bool = true;
        error = true;
        console.log("ok")
    }
    if(error == false && test == true){
        document.getElementById("pb-numtel").innerText = "";
        document.getElementById("Avertissement").innerText = "";
    }
    if(bool == false){
        document.getElementById("Avertissement").innerText = "";
        verifAliment(tabAliments, false);
    }
}

async function verifAliment(tableauAliments, test){
    var e = 0;
    var error = false;
    for(var i = 0; i < tableauAliments.length; i++){
        if(tableauAliments[e].value === tableauAliments[i].value && i !== e){
            var indiceInitial = e + 1;
            var indice  = i + 1;
            document.getElementById("Avertissement").innerText = "veuillez choisir des aliments différents dans la liste, probleme aliment n° " + indiceInitial + " avec l'aliment n° " + indice;
            bool = true;
            error = true;
            break;
        }
        if(e < tableauAliments.length-1 && i === tableauAliments.length - 1){
            i = -1;
            e = e+1;
        }
    }
    if(test == true && error == false){
        document.getElementById("Avertissement").innerText = "";
    }
    if(bool == false){
        //setTimeout(5000, window.location.pathname = "C:/criel-sur-mer-website-rework-main/sondages2.html");
        const result = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/TailleBD.json`);
        const resultat = await result.json();
        const val = resultat.taille;
        const result2 = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/UserAlimentation/${val}.json`, {
          method : "PUT",
          headers : {
              'Content-Type': 'application/json',
          },
          body : JSON.stringify({
              nom : nom.value,
              prenom : prenom.value,
              naissance : naissance.value,
              adresse : adresse.value,
              codePostale : codePostale.value,
              ville : ville.value,
              telephone : telephone.value, 
              aliment1 : document.getElementById("Al1").value,
              aliment2 : document.getElementById("Al2").value,
              aliment3 : document.getElementById("Al3").value,
              aliment4 : document.getElementById("Al4").value,
              aliment5 : document.getElementById("Al5").value,
              aliment6 : document.getElementById("Al6").value,
              aliment7 : document.getElementById("Al7").value,
              aliment8 : document.getElementById("Al8").value,
              aliment9 : document.getElementById("Al9").value,
              aliment10 : document.getElementById("Al10").value,
          }),
        })
        if(!result2.ok){
          throw new error("Base de donnée non connecté");
        }
        const valeurFinal = val + 1;
        btnSuivant.disabled = true;
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
        else{
            setTimeout(function() {
                window.location.href = "./SondageAccueil.html";
              }, 5000);
        }
      }
} 
main();

module.exports = {
    verif_formulaire, verif_NomPrenomVille, verif_AnneeNaissance, verif_PostalCode, verif_TelephoneNumber, verifAliment
};
