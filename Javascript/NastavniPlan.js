if(!sessionStorage.getItem("token")) {
    location.replace("HomePage.html")
}

getNastavniPlan();

let nastavniPlanList = document.getElementById("nastavni-plan");

var results = [];

function getNastavniPlan() {
    fetch(
        'https://www.fulek.com/data/api/supit/curriculum-list/hr',
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
    )

    .then((response) => response.json())
    .then((result) => {

        
        
            result.data.forEach(element => {
                const objectKolegij = {
                    id: element.id,
                    kolegij: element.kolegij
                }
                results.push(objectKolegij)
            });

            nastavniPlanList.onkeyup = function showNastavniPlan() {
        
            let kolegiji = [];

            let inputValue = nastavniPlanList.value
        
            if(nastavniPlanList != null) {
                kolegiji = results.filter((keyword) => {
                    return keyword.kolegij.toLowerCase().includes(inputValue.toLowerCase())
                })
            }
            display(kolegiji);
            
    }})
    .catch((error) => console.log(error)) 
}

let resultsBox = document.querySelector(".displayKolegij")

function display(result) {
    const kolegijiList = [];
    result.forEach(element => {
        kolegijiList.push(element.kolegij)
    });
    console.log(kolegijiList)
    const content = kolegijiList.map(function ListItems(results) {
        return "<li id='kolegijItem' onclick=selectInput(this)>" + results + "</li>"
    })

    resultsBox.innerHTML = "<div id='displayContainer'><ul id='KolegijList'>" + content.join('') + "</ul></div>"
}

function selectInput(list) {
    nastavniPlanList.value = list.innerHTML
    resultsBox.innerHTML = ''
    
    const SelectedKolegij = results.find((element) => element.kolegij === nastavniPlanList.value)

    getKolegij(SelectedKolegij.id)
}

let sumEcts = 0;
let sumSati = 0;
let sumPredavanja = 0;
let sumVjezbe = 0;

function getKolegij(kolegij) {
    fetch(
        `https://www.fulek.com/data/api/supit/get-curriculum/${kolegij}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
    )
    .then((response) => response.json())
    .then((result) => {

        let table = document.getElementById("outputTable")
        let table2 = document.getElementById("SumTable")
        let newRow = table.insertRow(table.rows.length)

        table.style.display = 'block'

        newRow.insertCell(0).innerHTML = result.data.kolegij;
        newRow.insertCell(1).innerHTML = result.data.ects;
        newRow.insertCell(2).innerHTML = result.data.sati; 
        newRow.insertCell(3).innerHTML = result.data.predavanja;
        newRow.insertCell(4).innerHTML = result.data.vjezbe;
        newRow.insertCell(5).innerHTML = result.data.tip + " " + '<button id="deleteBtn" onclick="deleteData(this)">Delete</button>';

        sumEcts += result.data.ects;
        sumSati += result.data.sati;
        sumPredavanja += result.data.predavanja;
        sumVjezbe += result.data.vjezbe;

        PrintSums(sumEcts, sumSati, sumPredavanja, sumVjezbe)
    })
    .catch((error) => console.log(error)) 
}

function deleteData(button) { 

    let row = button.parentNode.parentNode; 

    let value = row.getElementsByTagName("td")

    sumEcts -= value[1].innerHTML
    sumSati -= value[2].innerHTML
    sumPredavanja -= value[3].innerHTML
    sumVjezbe -= value[4].innerHTML

    row.parentNode.removeChild(row);

    PrintSums(sumEcts, sumSati, sumPredavanja, sumVjezbe)
} 

function PrintSums(sumEcts, sumSati, sumPredavanja, sumVjezbe) {
    
    let table = document.getElementById("SumTable")
    let newRow2 = table.insertRow(table.rows.length)
    let table2 = document.getElementById("outputTable")

    if(sumEcts == 0) {
        table.style.display = 'none'
    }
    else {
        table.style.display = 'block'
    }

    let placeHolder = document.querySelector("sectionTwo-NastavniPlan-right")

    if(table2.rows.length < 2) {
        table2.style.display = 'none'
        location.replace("NastavniPlan.html")
    }
    else {
        table2.style.display = 'block'
    }

    if(table.rows.length == 1) {
        newRow2.insertCell(0).innerHTML = "Ukupno"
        newRow2.insertCell(1).innerHTML = sumEcts
        newRow2.insertCell(2).innerHTML = sumSati
        newRow2.insertCell(3).innerHTML = sumPredavanja
        newRow2.insertCell(4).innerHTML = sumVjezbe
    }

    let cells = table.getElementsByTagName("td")
    
    cells[1].innerHTML = sumEcts
    cells[2].innerHTML = sumSati
    cells[3].innerHTML = sumPredavanja
    cells[4].innerHTML = sumVjezbe
    cells[5].innerHTML = " "
}