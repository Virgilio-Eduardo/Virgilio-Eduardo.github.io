// main.js
function pesquisarPais() {
    const paisInput = document.getElementById("paisInput").value;
    if (!paisInput) {
        alert("Por favor, insira o nome de um país.");
        return;
    }

    $.ajax({
        url: `https://restcountries.com/v3.1/name/${paisInput}?fullText=true`,
        method: "GET",
        success: function(data) {
            exibirInformacoes(data[0]);
        },
        error: function() {
            alert("Erro ao obter informações do país. Certifique-se de inserir um nome válido.");
        }
    });
}
let pesquisarBtn = document.getElementById("pesquisar_btn");

let paisesInp = document.getElementById("paisInput");

pesquisarBtn.addEventListener("click", () => {
    let nomePais = paisesInp.value;
    let finalURL = `https://restcountries.com/v3.1/name/${nomePais}?fullText=true`;
    console.log(finalURL);
    fetch(finalURL).then((response) => response.json())
    .then((data) => {
        console.log(data[0]);
        console.log(data[0].capital[0]);
        console.log(data[0].flags.svg);
        console.log(data[0].name.common);
        console.log(data[0].continents[0]);
        console.log(data[0].region[0]);
        console.log(Object.keys(data[0].currencies)[0]);
        console.log(data[0].currencies[Object.keys(data[0]
        .currencies)].name);
        
         console.log(Object.values(data[0].languages).
         toString().split(",").join(",")
         );

         resultado.innerHTML = `
         <img src ="${data[0].flags.svg}" class ="bandeira-img">
         <h2>${data[0].name.common}</h2>
         <div class='info'>
            <div class='data-info'>
            <h4>Capital:</h4>
            <span>${data[0].capital[0]}</span>
            </div>       
         </div>

         <div class='info'>
         <div class='data-info'>
         <h4>Regiao:</h4>
         <span>${data[0].region}</span>
         </div>       
         </div>

         
         <div class='info'>
         <div class='data-info'>
         <h4>Sub-regiao:</h4>
         <span>${data[0].subregion}</span>
         </div>       
         </div>

         <div class='info'>
         <div class='data-info'>
         <h4>Populacao:</h4>
         <span>${data[0].population}</span>
         </div>       
          </div>

          <div class='info'>
          <div class='data-info'>
          <h4>Area:</h4>
          <span>${data[0].area} km²</span>
          </div>       
          </div>

         `;

    });

});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function exportarParaXLS() {
    const paisInfo = document.getElementById("resultado").innerText;

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([{ Informacoes_Pais: paisInfo }]);
    XLSX.utils.book_append_sheet(wb, ws, "resultado");
    XLSX.writeFile(wb, "informacoes_paises.xls");
}

function exportarParaCSV() {
    const paisInfo = document.getElementById("resultado").innerText;

    const csvContent = `Informacoes_Pais\n"${paisInfo}"\n`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, "informacoes_paises.csv");
    } else {
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "informacoes_paises.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function exportarParaXML() {
    const paisInfo = document.getElementById("resultado").innerHTML;

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<Informacoes_Pais>\n${paisInfo}\n</Informacoes_Pais>`;
    const blob = new Blob([xmlContent], { type: "application/xml;charset=utf-8;" });
    const link = document.createElement("a");

    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, "informacoes_paises.xml");
    } else {
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "informacoes_paises.xml");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
