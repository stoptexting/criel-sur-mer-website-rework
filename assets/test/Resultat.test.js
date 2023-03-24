const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
global.window = window;
global.document = window.document;
global.$ = require('jquery');
const { faker } = require('@faker-js/faker');
const resultat = require("../js/Resultat");

const al1 = document.createElement("div");
const al2 = document.createElement("div");
const al3 = document.createElement("div");
al1.setAttribute('id', 'top1');
al2.setAttribute('id', 'top2');
al3.setAttribute('id', 'top3');

test('Verification aucun champs vides', () => {
    const myMap = new Map();
    const tab = ["apple", "banana", "orange", "apple", "orange", "banana", "apple"];
    document.body.appendChild(al1);
    document.body.appendChild(al2);
    document.body.appendChild(al3);
    resultat.selectionFinalAliment(tab, myMap, true);
    expect(myMap.get("indice1")).toBe(0);
    expect(myMap.get("count2")).toBe(2);
    expect(myMap.get("indice2")).toBe(1);
    expect(myMap.get("count3")).toBe(2);
    expect(myMap.get("indice3")).toBe(2);
    expect(al1.innerText).toBe("Aliment n°1 : apple (3 votes)");
    expect(al2.innerText).toBe("Aliment n°2 : banana (2 votes)");
    expect(al3.innerText).toBe("Aliment n°3 : orange (2 votes)");

    
  });
  
  
  
  
 