import { useContext, useEffect, useState } from "react"
import useAxios from "../useAxios/useAxios"
import { MyContext } from "../../ContextApi/MyAuthProvider"


const useGetDonation = () => {
    const myAxios = useAxios()
    const {myUser} = useContext(MyContext)
    const email = myUser?.email
    const [getDonation, setGetDonation] = useState([])

    useEffect(()=>{
        myAxios.get(`/donation/${email}`)
        .then(res=>{
            setGetDonation(res.data)
        })
    }, [])

    return getDonation
}

export default useGetDonation