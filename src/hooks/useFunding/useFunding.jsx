import { useEffect, useState } from "react"
import useAxios from "../useAxios/useAxios"


const useFunding = () => {
    const [funding, setFunding] = useState([])
    const myAxios = useAxios()

    useEffect(()=>{
        myAxios.get("/funding")
        .then(res=>setFunding(res.data))
    },[myAxios])
    
    return funding
}

export default useFunding