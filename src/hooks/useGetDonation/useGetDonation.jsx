import {  useEffect, useState } from "react"
import useAxios from "../useAxios/useAxios"


const useGetDonation = () => {
    const myAxios = useAxios()
    const [getDonation, setGetDonation] = useState([])

    useEffect(()=>{
        myAxios.get("/donation")
        .then(res=>{
            setGetDonation(res.data)
        })
    }, [])

    return getDonation
}

export default useGetDonation