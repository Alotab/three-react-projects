import { useState } from 'react';
import { first151Pokemon, getFullPokedexNumber } from '../utils';



const SideNave = (props) => {
    const { selectedPokemon, setSelectedPokemon } = props;

    const [searchValue, setSearchValue] = useState('')

    const filteredPokemon = first151Pokemon.filter((ele, eleIndex) =>{
        //if full pokemon number includes the current search value, return true
        if ((getFullPokedexNumber(eleIndex)).includes(searchValue)) {return true}

        // if the pokemon name includes the current value , return true
        if (ele.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {return true}

        //otheriwse, exlude from the array
        return false
    })

  return (
    <nav>
        <div className={'header'}>
            <h1 className='text-gradient'>Pokedex</h1>

        </div>
        <input placeholder='E.g 001 or Bulba..' value={ searchValue } onChange={(e) => {
            setSearchValue(e.target.value)
        }} type="text" />
        {filteredPokemon.map((pokemon, pokemonIndex) => {
            const truePokedecNumber = first151Pokemon.indexOf(pokemon)
            return ( 
                <button onClick={() => {setSelectedPokemon(truePokedecNumber)}} className={'nav-card ' + 
                    (pokemonIndex === selectedPokemon ? 'nav-card-selected' : ' ')
                } key={pokemonIndex}>
                    <p>{getFullPokedexNumber(truePokedecNumber)}</p>
                    <h2>{pokemon}</h2>
                </button>
            )
        })}
    </nav>
  )
}

export default SideNave;