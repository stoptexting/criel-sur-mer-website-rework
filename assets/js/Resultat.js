
var myMap;
var al1;
var al2;
var al3;
var tab;
var taille;

async function main(){
    al1 = document.getElementById("top1");
    al2 = document.getElementById("top2");
    al3 = document.getElementById("top3");
    result = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/TailleBD.json`) 
    const resultat = await result.json();
    tab = [];
    taille = resultat.taille;
    AlimentNum();
    myMap = new Map();
}

async function AlimentNum(){
    for(var i = 0; i < taille; i++){
        result = await fetch(`https://crielsurmer-eb4e8-default-rtdb.europe-west1.firebasedatabase.app/UserAlimentation/${i}.json`) 
        const resultat = await result.json();
        tab.push(resultat.aliment1, resultat.aliment2, resultat.aliment3, resultat.aliment4, resultat.aliment5, resultat.aliment6, resultat.aliment7, resultat.aliment8, resultat.aliment9, resultat.aliment10);
    }
    console.log(tab);
    selectionFinalAliment();
}

function selectionFinalAliment(){
    myMap.set("count1", 0);
    myMap.set("count2", 0);
    myMap.set("count3", 0);
    myMap.set("count4", 0);
    myMap.set("count5", 0);
    myMap.set("count6", 0);
    var e = 0;
    var count = 0;
   for(var i = 0; i < tab.length; i++){
        if(tab[e] === tab[i]){
            count = count + 1;
        }
        if(i === tab.length-1 && e < tab.length-1){
            console.log(e + "->" + count)
            if(count > myMap.get("count1")){
                myMap.set("indice1", e);
                myMap.set("count1", count);
            }
            if(count > myMap.get("count2") && e !== myMap.get("indice1") && tab[e] !== tab[myMap.get("indice1")]){
                myMap.set("indice2", e);
                myMap.set("count2", count);
            }
            if(count > myMap.get("count3") && e !== myMap.get("indice2") && e !== myMap.get("indice1") && tab[e] !== tab[myMap.get("indice1")] && tab[e] !== tab[myMap.get("indice2")]){
                myMap.set("indice3", e);
                myMap.set("count3", count);
            }
            if(count > myMap.get("count4") && e !== myMap.get("indice2") && e !== myMap.get("indice1") && e !== myMap.get("indice3") && tab[e] !== tab[myMap.get("indice1")] && tab[e] !== tab[myMap.get("indice2")] && tab[e] !== tab[myMap.get("indice3")]){
                myMap.set("indice4", e);
                myMap.set("count4", count);
            }
            if(count > myMap.get("count5") && e !== myMap.get("indice2") && e !== myMap.get("indice1") && e !== myMap.get("indice3") && e !== myMap.get("indice4") && tab[e] !== tab[myMap.get("indice1")] && tab[e] !== tab[myMap.get("indice2")] && tab[e] !== tab[myMap.get("indice3")] && tab[e] !== tab[myMap.get("indice4")]){
                myMap.set("indice5", e);
                myMap.set("count5", count);
            }
            if(count > myMap.get("count6") && e !== myMap.get("indice2") && e !== myMap.get("indice1") && e !== myMap.get("indice3") && e !== myMap.get("indice4") && e !== myMap.get("indice5") && tab[e] !== tab[myMap.get("indice1")] && tab[e] !== tab[myMap.get("indice2")] && tab[e] !== tab[myMap.get("indice3")] && tab[e] !== tab[myMap.get("indice4")] && tab[e] !== tab[myMap.get("indice5")]){
                myMap.set("indice6", e);
                myMap.set("count6", count);
            }
            count = 0;
            i = -1;
            e = e + 1;
        }
    }
    al1.innerText = "Aliment n°1 : " + tab[myMap.get("indice1")] + " (" + myMap.get("count1") + " votes)" ;
   al2.innerText = "Aliment n°2 : " + tab[myMap.get("indice2")] + " (" + myMap.get("count2") + " votes)" ;
   al3.innerText = "Aliment n°3 : " + tab[myMap.get("indice3")] + " (" + myMap.get("count3") + " votes)" ;
   DessinGraphique();
  
}
   
function DessinGraphique(){
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [tab[myMap.get("indice1")], tab[myMap.get("indice2")], tab[myMap.get("indice3")], tab[myMap.get("indice4")], tab[myMap.get("indice5")], tab[myMap.get("indice6")]],
        datasets: [{
          label: 'Votes',
          data: [myMap.get("count1"), myMap.get("count2"), myMap.get("count3"), myMap.get("count4"), myMap.get("count5"), myMap.get("count6")],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    const ctxe = document.getElementById('myChart2');
    new Chart(ctxe, {
      type: 'doughnut',
       data : {
        labels: [
            tab[myMap.get("indice1")], tab[myMap.get("indice2")], tab[myMap.get("indice3")], tab[myMap.get("indice4")], tab[myMap.get("indice5")], tab[myMap.get("indice6")]
        ],
        datasets: [{
          label: 'Votes',
          data: [myMap.get("count1"), myMap.get("count2"), myMap.get("count3"), myMap.get("count4"), myMap.get("count5"), myMap.get("count6")],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(160,32,240)',
            'rgb(144,238,144)',
            'rgb(67, 47, 41)'
          ],
          hoverOffset: 4
        }]
      }
    });
}


main();