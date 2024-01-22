import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,  signOut } from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react"
import myAuth from "../firebase/firebase.config"


const MyContext = createContext()

const MyAuthProvider = ({children}) => {
    const [myUser, setMyUser] = useState()
    const [loading, setLoading] = useState(true)

    const createMyUser=(email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(myAuth, email, password)
    }
    const myLogin = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(myAuth, email, password)
    }

    const myLogOut=()=>{
        setLoading(true)
        return signOut(myAuth)
    }
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(myAuth, (myCurrentUser)=>{
            setLoading(false)
            setMyUser(myCurrentUser)
        })
        return ()=>unSubscribe()
    },[])

    const info = {
        myUser,
        loading,
        createMyUser,
        myLogin,
        myLogOut,

    }

  return (
    <MyContext.Provider value={info}>
        {children}
    </MyContext.Provider>
  )
}
MyAuthProvider.propTypes={
    children:PropTypes.node
}
export default MyAuthProvider
export {MyContext}