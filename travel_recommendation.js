const searchBtn = document.getElementById('btnSearch');
const clearBtn = document.getElementById('btnClear');
const contactBtn = document.getElementById('SubmitContact');

function searchPlace() {
    const input = document.getElementById('destinationInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const countries = ['japan', 'australia', 'brazil'];
            const beaches = ['beach', 'beaches'];
            const temples = ['temple', 'temples'];

            if (countries.includes(input.toLowerCase())) {
                // Encontrar o país digitado
                const country = data.countries.find(country => country.name.toLowerCase() === input.toLowerCase());
                
                if (country) {
                    // Limpa o conteúdo anterior
                    resultDiv.innerHTML = '';
            
                    // Itera pelas cidades do país selecionado
                    for (let i = 0; i < country.cities.length; i++) {
                        resultDiv.innerHTML += `<div class="destination-card">`;
                        resultDiv.innerHTML += `<img src="${country.cities[i].imageUrl}" alt="">`;
                        resultDiv.innerHTML += `<h3>${country.cities[i].name}</h3>`;
                        resultDiv.innerHTML += `<p>${country.cities[i].description}</p>`;
                        resultDiv.innerHTML += `</div>`;
                    }
                } else {
                    resultDiv.innerHTML = '<p>Country not found</p>';
                }
            } else if (beaches.includes(input.toLowerCase())) {
                for (let i = 0; i < data.beaches.length; i++) {
                    resultDiv.innerHTML += `<div class="destination-card">`;
                    resultDiv.innerHTML += `<img src="${data.beaches[i].imageUrl}" alt="">`;
                    resultDiv.innerHTML += `<h3>${data.beaches[i].name}</h3>`;
                    resultDiv.innerHTML += `<p>${data.beaches[i].description}</p>`;
                    resultDiv.innerHTML += `</div>`;
                }
            } else if (temples.includes(input.toLowerCase())) {
                for (let i = 0; i < data.temples.length; i++) {
                    resultDiv.innerHTML += `<div class="destination-card">`;
                    resultDiv.innerHTML += `<img src="${data.temples[i].imageUrl}" alt="">`;
                    resultDiv.innerHTML += `<h3>${data.temples[i].name}</h3>`;
                    resultDiv.innerHTML += `<p>${data.temples[i].description}</p>`;
                    resultDiv.innerHTML += `</div>`;
                }
            } else {
                resultDiv.innerHTML = 'Destination not found.';
            }
        })
        
        .catch(error => {
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

searchBtn.addEventListener('click', searchPlace);

function thankyou(){
    console.log("Contact Sent");
    alert("Thanks for the contact");
}

contactBtn.addEventListener('click', thankyou);

function clear() {
    console.log('Clear button tapped.')
    document.getElementById('destination-input') = "";
    document.getElementById('result') = "";
}

clearBtn.addEventListener('click', clear);