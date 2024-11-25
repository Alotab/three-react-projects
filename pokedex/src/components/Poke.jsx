const PokeCard = (props) => {
    const { selectedPokemon } = props
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [skill, setSkill] = useState(null)
    const [loadingSkill, setLoadingSkill] = useState(false)

    const {name, height, abilities, stats, types, moves, sprites} = data || {}

    const imgList = Object.keys(sprites || {}).filter(val => {
        if (!sprites[val]) { return false }
        if (['versions', 'other'].includes(val)) { return false }
        return true
    })

    async function fetchMoveData(move, moveUrl) {
        if (loadingSkill || !localStorage || !moveUrl) {return}

        // check cache for move
        let c ={}
        if (localStorage.getItem('pokemon-moves')) {
            c = JSON.parse(localStorage.getItem('pokemon-moves'))
        }

        if (move in c) {
            setSkill(c[move])
            console.log('Find move in cache')
            return
        }

        try {
            setLoading(true)
            const res = await fetch(moveUrl)
            const moveData = await res.json()
            console.log('Fetched move from API', moveData)
            const description = moveData?.flavor_text_entries.filter(val => {
                return val.version_group.name = 'firered-leafgreen'
            })[0]?.flavor_text

            const skillData = {
                name: move,
                description
            }
            setSkill(skillData)
            c[move] = skillData
            localStorage.setItem('pokemon-moves', JSON.stringify(c))

        } catch (err) {
            console.log(err)
        } finally {
            setLoadingSkill(false)
        }
    }

    useEffect(() => {
        //if loading, exit logic
        if (loading || !localStorage) {return}

        ///check if the selected pokemon information is available to the cache
        // 1. define the cache
        let cache = {}
        if (localStorage.getItem('pokedex')) {
            cache = JSON.parse(localStorage.getItem('pokedex'))
           
        }

        //2. check if the selected pokemon is in the cache, otherwise fetch from the api
        if (selectedPokemon in cache) {
            //read cache
            setData(cache[selectedPokemon])
            console.log('Found pokemon in cache')
            return
        }

        // we passed all the cache stuff to no avail and 
        // now need to fetch the data from the api
        async function fetchPokemonData() {
            try {
                const baseUrl = 'https://pokeapi.co/api/v2/'
                const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon)
                const finalUrl = baseUrl + suffix
                const res = await fetch(finalUrl)
                const pokemonData = await res.json()
                setData(pokemonData)
                console.log("Fetched pokemon")
                cache[selectedPokemon] = pokemonData
                localStorage.setItem('pokedex', JSON.stringify(cache))

            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchPokemonData()

        //3. if we fetch from the api, make sure to save the info to the caceh for next time fetching


    },[selectedPokemon])

    if (loading || !data) {
        return (
            <div>
                <h4>Loading ...</h4>
            </div>
        )
    }

    return (
        <div className="poke-card">
            {/* call the modal component like html tag and anything in it becomes the children 
            render the modal only when we have a skill
            setKill(null) means if the user clicks on the displayed modal, the skill becomes 
            and null/false and the modal goes away */}
            {skill && ( 
                <Modal handleCloseModal={() => { setSkill(null)}}>
                     <div>
                        <h6>Name</h6>
                        <h2 className='skill-name'>{skill.name.replaceAll('-', ' ')}</h2>
                    </div>
                    <div>
                        <h6>Description</h6>
                        <p>{skill.description}</p>
                    </div>

                </Modal>
            )}
            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div className="type-container">
                {types.map((typeObj, typeIndex) => {
                    return (
                        <TypeCard key={typeIndex} type={typeObj?.type?.name}/>
                    )
                })}
            </div>
            <img className="default-img" 
                src={'/pokemon/' + getFullPokedexNumber(selectedPokemon) + '.png'} alt={`${name}-large-img`}/>
            
            <div className="img-container">
                {imgList.map((spriteUrl, spriteIndex) => {
                    const imgUrl = sprites[spriteUrl]
                    return (
                        <img key={spriteUrl} src={imgUrl} alt={`${name}-img-${spriteUrl}`}/>
                    )
                })}
            </div>
            <h3>Stats</h3>
            <div className="stats-card">
                {
                    stats.map((statObj, statIndex) => {
                        const { stat, base_stat } = statObj
                        return (
                            <div key={statIndex} className="stat-icon">
                                <p>{stat?.name.replace('-', '')}</p>
                                <h4>{base_stat}</h4>
                            </div>
                        )
                    })
                }
            </div>
            <h3>Moves</h3>
            <div className="pokemon-move-grid">
                {
                    moves.map((moveObj, moveIndex) => {
                        return (
                            <button className="button-card pokemon-move" 
                            key={moveIndex} onClick={() => {
                                fetchMoveData(moveObj?.move?.name, moveObj?.move?.url)
                            }}>
                                <p>{moveObj?.move?.name.replaceAll('-', ' ')}</p>
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PokeCard;