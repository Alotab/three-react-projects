import { useState } from "react";
import Header from "./components/Header";
import PokeCard from "./components/PokeCard";
import SideNave from "./components/SideNave";



function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0)
  const [showSideMenu, setShowSideMenu] = useState(false)

  function handleToggleMenu() {
    setShowSideMenu(!showSideMenu)
  }
 
  return (
    <>
      <Header handleToggleMenu={handleToggleMenu}/>
      <SideNave selectedPokemon={selectedPokemon} 
        setSelectedPokemon={setSelectedPokemon} 
        handleToggleMenu={handleToggleMenu}
        showSideMenu={showSideMenu}/>
      <PokeCard selectedPokemon={selectedPokemon}/>
    </>
  )
}

export default App;
