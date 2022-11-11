async function getList() {
    const list_poke = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000")
    return list_poke.json()
}

async function getPoke(url) {
    const poke = await fetch(url)
    return poke.json()

}

async function renderPage(pokemon_page /* mảng chứa pokemon trong 1 trang */, cout, pokemon_in_page) {

    page = document.getElementById("list_pokemon");//lấy id đựng danh sách pokemon
    page.innerHTML = ''//xóa pokemon cũ đi

    for (let i = 0; i < pokemon_page.length; i++) {
        if (pokemon_page[i] != undefined /*tại sẽ có những mảng ko có pokenmon (mảng ko có đủ số pokemon sẽ hiển thị là undefined)*/) {

            poke = await getPoke(pokemon_page[i].url)
            img = poke.sprites.other.dream_world.front_default

            const pokemon = `
            <div class="card" id="${cout}${i}">
                <img src="${img}" style="height:300px; width:300px">
                <h1>${pokemon_page[i].name}</h1>
            </div>`

            page.innerHTML += pokemon

        }
    }

    console.log(pokemon_page);

    for(let i = 0; i < pokemon_in_page; i++) {
        document.getElementById(`${cout}${i}`).addEventListener("mouseover", (e) => {
            const box = document.getElementById("box");
            box.innerHTML = `${pokemon_page[i].name}`
            box.style.display = "block";
        })

        document.getElementById(`${cout}${i}`).addEventListener("mouseleave", (e) => {
            const box = document.getElementById("box");
            box.style.display = "none";
        })
    }
}


async function main(pokemon_in_page /*số lượng pokemon trong 1 trang*/) {
    list_poke = await getList()

    arrayPokemon = list_poke.results.slice(0, 50)/* số lượng pokemon lấy*/

    const array_Page = [];/*mảng này sẽ chứa các trang pokemon*/


    for (let i = 0; i < arrayPokemon.length; i = i + pokemon_in_page) {
        list_poke_page = [];//mảng này chưa pokemon trong 1 trang
        for (let j = 0; j < pokemon_in_page; j++) {
            list_poke_page.push(arrayPokemon[i + j]);
        }
        array_Page.push(list_poke_page);
    }


    const list_btn = document.getElementById("btn");
    for (let i = 0; i < array_Page.length; i++) {
        const btn = `
                <button id="btn_change_${i}">
                    ${i + 1}
                </button>
        `

        list_btn.innerHTML += btn

    }

    //chỗ này để hiển thị trang đầu tiên (lúc mới tải trang)
    let pokemon_page = array_Page[0];

    renderPage(pokemon_page, 0, pokemon_in_page)

    //đoạn này sẽ hiển thị ra các button
    for (let i = 0; i < array_Page.length; i++) {
        const button = document.getElementById(`btn_change_${i}`)
        button.addEventListener("click", () => {

            console.log("hello ", i);
            console.log("Page: ", array_Page[i]);
            renderPage(array_Page[i], i, pokemon_in_page);
        })

    }


}


main(4)


