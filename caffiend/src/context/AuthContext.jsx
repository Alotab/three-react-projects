
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

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
        setGlobaUser(null)
        setGlobalData(null)
        return signOut(auth)
    }

    useEffect(() => {
        // onAuthStateChanged -- listens in when a user sign in, logout, signup
        const unsubscribe = onAuthStateChanged(auth, async (user) => { 
            console.log('CURRENT USER: ', user)
            setGlobaUser(user)

            // if there's no user, empty the user state and return from this listener
            if (!user) {
                console.log('No active user')
                return
             }

            // if there is a user, then check if the user has data in the database, 
            // and if there do, then fetch said data and update the global
            try {
                setIsLoading(true)

                // first, we create a reference for the the document (labelled json object)
                // and the we get the doc, and then we snapshot it to see if there's anything there
                const docRef = doc(db, 'users', user.id)
                const docSnap = await getDoc(docRef)

                let firebaseData = {}
                if (docSnap.exists()) {
                    console.log('Found user data')
                    firebaseData = docSnap.data()

                }
                setGlobalData(firebaseData)

            } catch (err) {
                console.log(err.message)
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