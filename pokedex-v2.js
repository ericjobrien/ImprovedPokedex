/*
    What do we need?

    Our toolbox:
    HTML
        -Bootstrap later
    
    CSS
        -Selectors
    
    JS
        -Fetch API
            -Promises, async/await
            -JSON
        -Event Listeners
        -DOM Manipulation

    Element IDs
        -dataInput - our input box
        -getData - our button
        -data - our HTML section
*/

var dataInputBox = document.getElementById('dataInput');
var getDataButton = document.getElementById('getData');
var dataSection = document.getElementById('data');
var listSection = document.getElementById('list');
var nameInputBox = document.getElementById('nameInput');
var nameButton = document.getElementById('getName');

const apiURL = 'http://pokeapi.co/api/v2/';

/*
Monday we took care of events by saying something like button.onclick = doSomething()
Instead we pass in the method type, as well as a function that we will use as a *callback*
Meaning: a callback function is a function passed in as a parameter that will be executed later
*/



getDataButton.addEventListener('click', generateData);

/*
async function:
meaning, asynchronous function:
it allows for asynchronous execution while waiting for an await
*/

async function generateData() {
    /*
        rudimentary DOM manipulation:
        DOM - Document Object Model:
        A tree representation of the structure of the page
    */
    // dataSection.innerHTML = 'PokePlackeholder';
    let userInput = dataInputBox.value;
    /*
    Await
    (wait)
    for a
    Promise
    (some variable that will eventually be filled)
    */
    


    let response = await fetch(apiURL + 'pokemon/' + userInput);
    console.log(response);

    if(response.status === 200) {
        let data = await response.json();
        console.log(data);
        populateData(data);
    } else {
        dataSection.innerHTML = 'It got away!';
    }
}

function populateData(pokemonObject) {
    
    /*
    Clear the datasection so that we don't have multiple bulbasaurs
    */
    dataSection.innerHTML = '';

    //create a nameTag
    let nameTag = document.createElement('h3');
    nameTag.innerHTML = pokemonObject.name;
    dataSection.appendChild(nameTag);
    for(let spriteNum in pokemonObject.sprites) {
        /*
            Because JS doesn't ever caremuch about types,
            every variable is technically equivalent to a boolean
            what this means is certain variables are false and certain are true
            generally this follows a sensible pattern:
            null, 0 and '' are false
            most everything else is true
            These are called 'truthy' and 'falsy' values

            This stems from a larger understanding that JS is loosely typed
            as opposed to Java, which is strongly typed
        */
        if(pokemonObject.sprites[spriteNum] && (typeof pokemonObject.sprites[spriteNum] != 'object')) {
            let spriteImg = document.createElement('img');
            spriteImg.src = pokemonObject.sprites[spriteNum];
            dataSection.appendChild(spriteImg);
        }
      
    }

    let abilitiesList = document.createElement('ul');
        
    for(let abilityNum in pokemonObject.abilities) {
        let ability = document.createElement('li');
        ability.innerHTML = pokemonObject.abilities[abilityNum].ability.name;
        abilitiesList.appendChild(ability);
    }

    dataSection.appendChild(abilitiesList);

}

async function generateList () {
     
      
        let response = await fetch(apiURL + 'pokemon?limit=151');
        console.log(response);
    
        if(response.status === 200) {
            let data = await response.json();
            console.log(data);
            for(let pokemon of data.results){
                allPokemonArr.push(pokemon);
            }
            populateList();
        } else {
            dataSection.innerHTML = 'It got away!';
        }
    
}

function populateList(populateList) {
    listSection.innerHTML = '';
    pokemonName = nameInputBox.value;
    document.createElement('ol');

    pokeList = allPokemonArr.filter(pokemon => pokemon.name.includes(pokemonName));
    pokeList = pokeList.sort();
    
    for(let pokemon of pokemonListObject.results) {
        console.log(pokemon);

        pokemonListItem = document.createElement('li');
        pokemonList.appendChild(pokemonListItem);
    }

    listSection.appendChild(pokemonList);
}