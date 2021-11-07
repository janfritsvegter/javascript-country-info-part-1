
// array voor de tabelhoofd namen
const specs = [
    "name",
    "topLevelDomain",
    "alpha2Code",
    "alpha3Code",
    "callingCodes",
    "capital",
    "altSpellings",
    "subregion",
    "region",
    "population",
    "latlng",
    "demonym",
    "area",
    "timezones",
    "borders",
    "nativeName",
    "numericCode",
    "flags",
    "currencies",
    "languages",
    "translations",
    "flag",
    "regionalBlocs",
    "cioc",
    "independent",];

function makeTable(id, arr, colRed, colRed2 , cssClass) {
    const tableId = document.getElementById(id);
    // indien er al een tabel is deze leegmaken
    while (tableId.firstChild) {
        tableId.removeChild(tableId.lastChild);
    }

    // Create the head row
    const rowHead = document.createElement("tr");
    for (let i = 0; i < specs.length; i++) {
        const cel = document.createElement("td");
        const paragraph = document.createElement("p");
        paragraph.textContent = specs[i];
        cel.appendChild(paragraph);
        rowHead.appendChild(cel);
    }
    tableId.appendChild(rowHead);

    for (let i = 0; i < arr.length; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < specs.length; j++) {
            const cel = document.createElement("td");
            const temp = specs[j];
            if (temp === colRed || temp === colRed2) {
                const paragraph2 = document.createElement("p");
                paragraph2.textContent = arr[i][temp];
                paragraph2.setAttribute("class", cssClass);
                cel.appendChild(paragraph2);
            } else {
                const paragraph = document.createElement("p");
                paragraph.textContent = arr[i][temp];
                cel.appendChild(paragraph);
            }
            row.appendChild(cel);
        }

        tableId.appendChild(row);

    }
}
