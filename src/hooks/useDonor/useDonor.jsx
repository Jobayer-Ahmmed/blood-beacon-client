import { useEffect, useState } from "react"
import useAxios from "../useAxios/useAxios"


const useDonor = () => {
    const myAxios = useAxios()
    const [donor, setDonor] = useState([])

    useEffect(()=>{
        myAxios.get("/donor").then((res) => setDonor(res.data));
    },[myAxios])
    const b = donor?.map(d=>{
        return d.username
    })
    return b
}

export default useDonor