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
            const countries = ['country', 'countries'];
            const beaches = ['beach', 'beaches'];
            const temples = ['temple', 'temples'];
            if (countries.includes(input.toLowerCase())) {
                for (let i = 0; i < data.countries.length; i++) {
                    for (let j = 0; j < data.countries[i].cities.length; j++) {
                        resultDiv.innerHTML += `<div class="destination-card">`;
                        resultDiv.innerHTML += `<img src="${data.countries[i].cities[j].imageUrl}" alt="">`;
                        resultDiv.innerHTML += `<h3>${data.countries[i].cities[j].name}</h3>`;
                        resultDiv.innerHTML += `<p>${data.countries[i].cities[j].description}</p>`;
                        resultDiv.innerHTML += `</div>`;
                    }
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

searchBtn.addEventListener('click', searchDestination);

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