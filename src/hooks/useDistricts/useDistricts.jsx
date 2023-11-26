import { useEffect, useState } from "react"
import useAxios from "../useAxios/useAxios"


const useDistricts = () => {
    const myAxios = useAxios()
    const [districts, setDistricts] = useState([])

    useEffect(()=>{
        myAxios.get("/districts", {withCredentials:true})
        .then(res=> {
            setDistricts(res.data)
        })
    },[myAxios])

    return districts
}

export default useDistricts