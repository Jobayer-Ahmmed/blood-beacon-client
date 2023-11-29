

import {  useContext, useEffect, useState } from "react"
import useAxios from "../useAxios/useAxios"
import { MyContext } from "../../ContextApi/MyAuthProvider"


const useGetDonationByEmail = () => {
    const [getDonation, setGetDonation] = useState({})
    const {myUser} = useContext(MyContext) 
    const email = myUser?.email
    const myAxios = useAxios()

    useEffect(()=>{
        myAxios.get(`/donation/${email}`)
        .then(res=>setGetDonation(res.data))
    }, [])

    return getDonation
}

export default useGetDonationByEmail