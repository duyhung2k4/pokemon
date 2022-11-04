async function getList() {
    const list_poke = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000")
    return list_poke.json()
}

async function getPoke(url) {
    const poke = await fetch(url)
    return poke.json()

}

async function renderPage(pokemon_page) {

    page = document.getElementById("list_pokemon");
    page.innerHTML = ''

    for (let i = 0; i < pokemon_page.length; i++) {


        if (pokemon_page[i]) {

            poke = await getPoke(pokemon_page[i].url)
            img =  poke.sprites.other.dream_world.front_default 
            
            const pokemon = `
            <div class="card">
            <img src="${img}" style="height:300px; width:300px">
            <h1>${pokemon_page[i].name}</h1>
            </div>`

            page.innerHTML += pokemon
        }
    }

}


async function main(pokemon_in_page) {
    list_poke = await getList()

    arrayPokemon = list_poke.results.slice(0, 50)

    const array_Page = [];


    for (let i = 0; i < arrayPokemon.length; i = i + pokemon_in_page) {
        list_poke_page = [];
        for (let j = 0; j < pokemon_in_page; j++) {
            list_poke_page.push(arrayPokemon[i + j]);
        }
        array_Page.push(list_poke_page);
    }


    const list_btn = document.getElementById("btn");
    for(let i = 0; i < array_Page.length; i++) {
        const btn = `
                <button id="btn_change_${i}">
                    ${i + 1}
                </button>
        `
        list_btn.innerHTML += btn
    }

    let pokemon_page = array_Page[0];

    renderPage(pokemon_page)

    for (let i = 0; i < array_Page.length; i++) {
        const button = document.getElementById(`btn_change_${i}`)
        button.addEventListener("click", () => {
            console.log("hello ", i);
            console.log("Page: ", array_Page[i]);
            renderPage(array_Page[i]);
        })

    }

}


main(4)


