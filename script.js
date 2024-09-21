const SUPERHERO_TOKEN='e2c5eeaabf011285df5f2e5a5907df4d'
const BASE_URL=`https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`

const newHeroButton=document.getElementById('newHeroButton')

const heroImageDiv=document.getElementById('heroImage')

const searchButton = document.getElementById('searchButton')

const searchInput = document.getElementById('searchInput')

const getSuperHero=(id)=>{
    fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json => {
        console.log(json.powerstats)
        const superHero=json
        showHeroInfo(superHero)
    })
}

const statToEmoji={
    intelligence: '🧠',
    strength: '💪',
    speed: '⚡',
    durability: '🏋️‍♂️',
    power: '📊',
    combat: '⚔️',
}

const showHeroInfo = (character) => {
    const name = `<h2>${character.name}</h2>`;
    const img = `<img src="${character.image.url}" alt="${character.name}"/>`;
    
    const stats = Object.keys(character.powerstats).map(stat => {
        return `<p><strong> ${stat}: ${character.powerstats[stat]}</p>`;
    }).join('');

    const biography = `
        <p><strong>Full Name:</strong> ${character.biography['full-name']}</p>
        <p><strong>Alter Egos:</strong> ${character.biography['alter-egos']}</p>
        <p><strong>Aliases:</strong> ${character.biography.aliases.join(', ')}</p>
        <p><strong>Place of Birth:</strong> ${character.biography['place-of-birth']}</p>
        <p><strong>First Appearance:</strong> ${character.biography['first-appearance']}</p>
        <p><strong>Publisher:</strong> ${character.biography.publisher}</p>
        <p><strong>Alignment:</strong> ${character.biography.alignment}</p>
    `;

    heroImageDiv.innerHTML = `${name}${img}${biography}${stats}`;
}


const getSearchSuperHero = (name) => {
    console.log(searchInput.value)
    fetch(`${BASE_URL}/search/${name}`)
      .then(response => response.json())
      .then(json => {
        const hero = json.results[0]
        showHeroInfo(hero) 
      })
}

const randomHero = () => {
    const numberOfHeroes = 731
    return Math.floor(Math.random() * numberOfHeroes) + 1
}

newHeroButton.onclick = () => getSuperHero(randomHero())

searchButton.onclick = () => getSearchSuperHero(searchInput.value)
