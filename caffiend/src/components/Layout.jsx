import { useState } from "react"
import Modal from "./Modal"
import Authentication from "./Authentication"


const Layout = (props) => {
    const { children } = props
    const [showModal, setShowModal] = useState(false)
    // const { globalUser, logout } = useAuth()

 

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">CAFFIEND</h1>
                <p>For Coffee Insatiates</p>
            </div>
            {'' ? (
                <button>
                    <p>Logout</p>
                </button>
            ) : (
                <button onClick={() => {setShowModal(true)}}>
                    <p>Sign up free</p>
                    <i className="fa-solid fa-mug-hot"></i>
                </button>
            )}
        </header>
    )

    const footer = (
        <footer>
            <p><span className="text-gradient">Caffiend</span> was made by 
            <a target="_blank" href="https://github.com/Alotab/three-react-projects/tree/main/caffiend"> Alotab</a> <br />using the <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a> design library.<br />Check out the project on <a target="_black" href="https://www.github.com/jamezmca/reactjs-full-course">GitHub</a>!</p>
        </footer>
    )
        
 
  return (
    <>
        {showModal && 
            (<Modal handleCloseModal={() => {setShowModal(false)}}>
                <Authentication />
            </Modal>)
        }
        {header}
        <main>
            { children }
        </main>
        {footer}
    </>
  )
}

export default Layout;