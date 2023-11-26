import { useEffect, useState } from "react"
import useAxios from "../useAxios/useAxios"


const useUpzilas = () => {
    const myAxios = useAxios()
    const [upzilas, setUpzilas] = useState([])

    useEffect(()=>{
        myAxios.get("/upzilas", {withCredentials:true})
        .then(res=> {
            setUpzilas(res.data)
        })
    },[])

    return upzilas
}

export default useUpzilas