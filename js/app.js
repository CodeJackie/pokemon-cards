const MAX = 251
let allThePokemon = []
const backpack = document.getElementById('pokemenu')
const searchField = document.querySelector('#search-field')
const numBox = document.querySelector('#number-button')
const nameBox = document.querySelector('#name-button')
const notFound = document.querySelector('#not-found')


fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX}`)
.then((response) => response.json())
.then((data) => {
    allThePokemon = data.results;
    showPokemon(allThePokemon)
});

async function getPokemon(id) {
    try {
        const {pokemon, pokemonspecies} = await Promise.all([fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => 
        res.json()
        ),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => res.json()
        ),
    ])
    return true
    } catch(error) {
        console.error('Failed to fetch pokemon data.')
    }
} 

function showPokemon(pokemon) {
    backpack.innerHTML = ""

    pokemon.forEach((pokemon) => {
        const pokemonID = pokemon.url.split("/")[6]
        const pokeball = document.createElement('div')
        pokeball.className = 'pokemon'
        pokeball.innerHTML = ` 
            <div class = 'pocket' id='${pokemonID}'>
                <img src ="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt='${pokemon.name}' />
            </div>
            <div class = 'sticker' id='${pokemon.name}' ><p>${pokemon.name}</p></div>
            `
        pokeball.addEventListener('click', async () => {
            const success = await getPokemon(pokemonID)
            if (success) {
                window.location.href = `?id=${pokemonID}`
            }
        })

        backpack.appendChild(pokeball)
    })
}

//search.js
searchField.addEventListener('keyup', search)

function search() {
    const term = searchField.value.toLowerCase();
    let filterPokemon

    if (numBox.checked) {
        filterPokemon = allThePokemon.filter((pokemon) => {
            const pokemonID = pokemon.url.split("/")[6]
            return pokemonID.startsWith(term)
        })
    } else if (nameBox.checked) {
        filterPokemon = allThePokemon.filter((pokemon) => { 
            return pokemon.name.toLowerCase().match(term)
        })
    } else {
        filterPokemon = allThePokemon
    }

    showPokemon(filterPokemon)

    if (filterPokemon.length === 0) {
        notFound.style.display = 'block'
    } else {
        notFound.style.display = 'none'
    }
}