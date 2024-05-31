let word = document.getElementById("word");
let resultDiv = document.getElementById("resultDiv");
let inputWord = document.getElementById("input-word");
let object = document.getElementById("object");
let submitBtn = document.getElementById("submit-btn");
let emptyInput = document.getElementById("emptyInput");
// let definitionHeading = document.getElementById('definitionHeading');

let partOfSpeech = null;
let definition = [];
let synonyms = [];
let antonyms = [];

submitBtn.addEventListener("click", function (e) {
    let wordValue = inputWord.value;

    e.preventDefault();
    if (wordValue != '') {
        let api = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordValue}`;
        word.textContent = "Word is: " + wordValue;
        // console.log(api);
        let apiFetch = fetch(api);
        apiFetch.then((response) => {
            return response.json();
        }).then((response) => {
            // console.log(response)
            // response.forEach(element => {
            //     console.log(element.meanings)
            // });

            resultDiv.innerHTML = '';
            // console.log(wordValue);
            emptyInput.textContent = '';
            if (response.title === "No Definitions Found") {

                let ul = document.createElement('ul');
                let li = document.createElement('li');
                ul.appendChild(li);
                li.textContent = `No definition found for ${wordValue}`;
                // console.log(li);
                resultDiv.appendChild(ul);
            }
            else {
                let ul = document.createElement('ul');
                response.forEach(element => {
                    element.meanings.forEach(meaning => {
                        partOfSpeech = meaning.partOfSpeech;
                        definition = [];
                        synonyms = [];
                        antonyms = [];
                        meaning.definitions.forEach(definitionObj => {
                            definition.push(definitionObj.definition)
                        })
                        meaning.synonyms.forEach(synonym => {
                            synonyms.push(synonym);
                        })
                        meaning.antonyms.forEach(antonym => {
                            antonyms.push(antonym);
                        })
                        let li = document.createElement('li');
                        if (synonyms.length === 0) {
                            synonyms.push("no Synonym")
                        }
                        if (antonyms.length === 0) {
                            antonyms.push("no Antonym")
                        }
                        li.innerHTML = `<p><strong>Part of Speech:</strong> <u>${partOfSpeech}</u> </br><strong>Definition: </strong> <ul>${definition.map(d => `<li> ${d} </li>`).join('')}</ul> <strong>Synonyms: </strong><ul>${synonyms.map(s => `<li>${s}</li>`).join('')} </ul> <strong>Antonyms: </strong> <ul>${antonyms.map(a => `<li>${a}</li>`).join('')} </ul></p> <br><br>`;
                        ul.appendChild(li);
                    })
                });
                resultDiv.appendChild(ul);
            }
        })
    }
    else {
        emptyInput.innerHTML = `<small>Enter a word!!</small>`;
    }
})

let catFactApi = fetch('https://meowfacts.herokuapp.com/?count=1');
let catFacts = document.getElementById("catfacts")
catFactApi.then((response) => {
    return response.json()
}).then((data) => {
    catFacts.innerHTML = `<u><b>Daily Cat facts:</b></u> ${data.data[0]}`;
})

// const catFactsElement = document.getElementById("catfacts");

// // Function to fetch a new cat fact from the API
// function fetchNewCatFact() {
//     fetch('https://meowfacts.herokuapp.com/?count=1')
//         .then(response => response.json())
//         .then(data => {
//             const catFact = data.data[0];
//             // Save the new cat fact and the current timestamp in local storage
//             const now = new Date().getTime();
//             localStorage.setItem('catFact', catFact);
//             localStorage.setItem('catFactTimestamp', now);
//             displayCatFact(catFact);
//         });
// }

// // Function to display a cat fact
// function displayCatFact(catFact) {
//     catFactsElement.innerHTML = `<u><b>Daily Cat Fact:</b></u> ${catFact}`;
// }

// // Check local storage for a saved cat fact and its timestamp
// const savedCatFact = localStorage.getItem('catFact');
// const savedTimestamp = localStorage.getItem('catFactTimestamp');
// const now = new Date().getTime();
// const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// if (savedCatFact && savedTimestamp && (now - savedTimestamp < oneDay)) {
//     // If a saved cat fact exists and is less than 24 hours old, display it
//     displayCatFact(savedCatFact);
// } else {
//     // Otherwise, fetch a new cat fact
//     fetchNewCatFact();
// }