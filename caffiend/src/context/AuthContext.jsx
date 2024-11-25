
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";
import { auth } from "../../firebase";

const AuthContext = createContext()

//make a global hook that can be passed in the project
export function useAuth() {
    return useContext(AuthContext)
}




export function AuthProvider(props) {
    const { children } = props
    const [globalUser, setGlobaUser] = useState(null)
    const [globalData, setGlobalData] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }


    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
        
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    function logout() {
        // clear user data or states when logout
        setUser(null)
        setGlobalData(null)
        return signOut(auth)
    }

    useEffect(() => {
        // onAuthStateChanged -- listens in when a user sign in, logout, signup
        const unsubscribe = onAuthStateChanged(auth, async (globalUser) => { 
            // if there's no user, empty the user state and return from this listener
            if (!user) { return }

            // if there is a user, then check if the user has data in the database, 
            // and if there do, then fetch said data and update the global
            try {
                setIsLoading(true)

            } catch (err) {

            } finally {
                setIsLoading(false)
            }

        })
        return unsubscribe
    },[])

    // Global state
    const value = {globalUser, globalData, setGlobalData, isLoading, signup, login, logout }


    return (
        // all the state values are accessible within our application
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}