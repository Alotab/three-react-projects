import { first151Pokemon, getFullPokedexNumber } from '../utils';



const SideNave = () => {
  return (
    <nav>
        <div className={'header'}>
            <h1 className='text-gradient'>Pokedex</h1>

        </div>
        <input type="text" />
        {first151Pokemon.map((pokemon, pokemonIndex) => {
            return ( 
                <button className={'nav-card '} key={pokemonIndex}>
                    <p>{getFullPokedexNumber(pokemonIndex)}</p>
                    <h2>{pokemon}</h2>
                </button>
            )
        })}
    </nav>
  )
}

export default SideNave;