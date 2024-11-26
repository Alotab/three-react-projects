import CoffeeForm from "./components/CoffeeForm"
import Hero from "./components/Hero"
import History from "./components/History"
import Layout from "./components/Layout"
import Stats from "./components/Stats"
import { useAuth } from "./context/AuthContext"



function App() {
  const { globalUser, globalData, isLoading } = useAuth()

  // if there is a globalUser, then they are authenticated
  const isAuthenticated = globalUser

  // so global data has to exist and the length of the entries is greater than zero
  // if we have zero entries or we just dont have any data in the first place, then we dont have any data
  // we throw !! to an object that can be truthy or falsy value to "make it" a boolean value
  const isData = globalData && !!Object.keys(globalData || {}).length
 

  const authenticatedContent = (
    <>
      <Stats />
      <History />
    </>
  );
  

  return (
    <Layout>
      <Hero />
      <CoffeeForm isAuthenticated={isAuthenticated}/>
      {(isAuthenticated && isLoading) && (
        <p>Loading data...</p>
      )}


      {/* so if we are authenticated and have data, then so the authenticated data/components  */}
      {(isAuthenticated && isData) && (authenticatedContent)}
    </Layout>
 
  )
}

export default App
