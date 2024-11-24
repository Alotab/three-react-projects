import { useState } from "react";
import { useEffect } from "react";



const PokeCard = (props) => {
    const { selectedPokemon } = props
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        //if loading, exit logic
        if (loading || !localStorage) {return}

        ///check if the selected pokemon information is available to the cache
        // 1. define the cache
        let cache = {}
        if (localStorage.getItem('pokemon')) {
            cache = JSON.parse(localStorage.getItem('pokemon'))
        }

        //2. check if the selected pokemon is in the cache, otherwise fetch from the api
        if (selectedPokemon in cache) {
            //read cache
            setData(cache[selectedPokemon])
            return
        }

        // we passed all the cache stuff to no avail and 
        // now need to fetch the data from the api


        //3. if we fetch from the api, make sure to save the info to the caceh for next time fetching


    },[selectedPokemon])

  return (
    <div>PokeCard</div>
  )
}

export default PokeCard;