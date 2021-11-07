import axios from "axios";

async function getData() {
    try {
        // ophalen van de data
        const result = await axios.get("https://restcountries.com/v2/all");
        // console.log(result); // controleren wat er teruggeven wordt in de console en kijken hoe die er uit ziet
        // console.log(result.data); // controleren of het juiste keyword gekozen is

        // sorteren van de data
        sortArrayLowHigh(result.data, "population", "low-high");

        // Het injecteren van nde data met inner Html
        // injectInnerHtml(result.data,"countries-list");

        // Het injecteren van de data op de traditionele manier
        injecTraditionalHtml(result.data,"countries-list")

    } catch (e) {
        console.error(e);
    }
}

getData();

// sorteerfunctie is wat uitgebreider
// zodat je ook op andere velden kan sorteren en in een andere richting
// met het oog op mogelijke extra functionaliteit in de toekomst.
function sortArrayLowHigh(arr, field, direction) {
    if (direction === "low-high") {
        arr.sort((a, b) => {
            if (a[field] < b[field]) {
                return -1;
            }
            if (a[field] > b[field]) {
                return 1;
            }
            return 0;
        });
    }
    if (direction === "high-low") {
        arr.sort((a, b) => {
            if (a[field] > b[field]) {
                return -1;
            }
            if (a[field] < b[field]) {
                return 1;
            }
            return 0;
        });
    }
}

function injectInnerHtml(arr,id) {
    const htmlBaseElement = document.getElementById(id);
    const countryItems = arr.map((item) =>{
        const name = item.name;
        const population = item.population;
        const flag = item.flags.png;
        const region = item.region;
        const subregion = item.subregion;
        let cssClass = "black";
        switch (region){
            case "Africa": cssClass = "blue"; break;
            case "Americas":
                if (subregion === "South America"){
                    cssClass = "light-green";
                } else{
                    cssClass = "dark-green";
                } break;
            case "Asia": cssClass = "red"; break;
            case "Europe": cssClass = "yellow"; break;
            case "Oceania": cssClass = "purple"; break;
            default: cssClass = "black";
            // default cssClass = "black" is wat dubbel op omdat hij initieel "black is
            // maar dit is leesbaarder als je de switch bekijkt zie je direct wat de waarde is
            // als er aan geen van de criteria voldaan wordt.
        }
        return `
      <li>
        <p class = "${cssClass} country-name"><img src="${flag}" alt="Flag of ${name}" width="25" class="img-flag"/>${name}</p>
        <p>Has a population of ${population}</p>
      </li>
    `;
    });
    htmlBaseElement.innerHTML = `${countryItems.join('')}`;
}


function injecTraditionalHtml(arr,id,htmlSortElement){
    const htmlBaseElement = document.getElementById(id);
    arr.map((item) =>{
        const htmtElement = document.createElement('li');
        const name = item.name;
        const population = item.population;
        const flag = item.flags.png;
        const region = item.region;
        const divUp = document.createElement('div');
        divUp.setAttribute("class", "flex-row" );
        const divDown = document.createElement('div');
        divDown.setAttribute("class", "flex-row" );
        const pRegion = document.createElement('p');
        pRegion.textContent = region;
        const pName = document.createElement('p');
        pName.textContent = name;
        let cssClass = "black";
        const subregion = item.subregion;
        switch (region){
            case "Africa": cssClass = "blue"; break;
            case "Americas":
                if (subregion === "South America"){
                    cssClass = "light-green";
                } else{
                    cssClass = "dark-green";
                } break;
            case "Asia": cssClass = "red"; break;
            case "Europe": cssClass = "yellow"; break;
            case "Oceania": cssClass = "purple"; break;
            default: cssClass = "black";
            // default cssClass = "black" is wat dubbel op omdat hij initieel "black is
            // maar dit is leesbaarder als je de switch bekijkt zie je direct wat de waarde is
            // als er aan geen van de criteria voldaan wordt.
        }
        pName.setAttribute("class", cssClass );
        const pPopulation = document.createElement('p');
        pPopulation.textContent = "Has a poulation of " + population;
        const imgFlag = document.createElement('img');
        imgFlag.setAttribute("src", flag);
        const alt = "Flag of " + name;
        imgFlag.setAttribute("alt", alt );
        // de vlaggen werden niet goed getoond de verhouding was niet goed
        // vandaar dat naast de breedte ook de hoogte uitgerekend is
        const ratio = imgFlag.naturalHeight/imgFlag.naturalWidth;
        const height = Math.floor(25*ratio);
        imgFlag.setAttribute("width", 25 );
        imgFlag.setAttribute("heigth", height );
        imgFlag.setAttribute("class", "img-flag" );
        divUp.appendChild(imgFlag);
        divUp.appendChild(pName);
        divDown.appendChild(pPopulation);
        // divDown.appendChild(pRegion);
        htmtElement.appendChild(divUp);
        htmtElement.appendChild(divDown);
        htmlBaseElement.appendChild(htmtElement);
        // het stijlen met de traditionele manier is lastiger
        // omdat ik nog geen manier heb gevonden om een img element als eerste in het p element te krijgen.
        // Maar de innerHtml methode ligt dichter bij de manier waarop react het doet
        // dus daarom concentreer ik mij daarop
    });
}