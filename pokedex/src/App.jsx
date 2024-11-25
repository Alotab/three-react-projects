import { useState } from "react";
import Header from "./components/Header";
import PokeCard from "./components/PokeCard";
import SideNave from "./components/SideNave";



function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0)
 
  return (
    <>
      <Header />
      <SideNave selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon}/>
      <PokeCard selectedPokemon={selectedPokemon}/>
    </>
  )
}

export default App;
