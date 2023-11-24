import { useEffect, useState } from "react"
import useAxios from "../useAxios/useAxios"


const useDistricts = () => {
    const myAxios = useAxios()
    const [districts, setDistricts] = useState([])

    useEffect(()=>{
        myAxios.get("/districts")
        .then(res=> {
            setDistricts(res.data)
        })
    },[])

    return districts
}

export default useDistricts