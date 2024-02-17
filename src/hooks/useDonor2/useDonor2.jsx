import { useEffect, useState } from "react"
import useAxios from "../useAxios/useAxios"


const useDonor2 = () => {
    const myAxios = useAxios()
    const [donor, setDonor] = useState([])

    useEffect(()=>{
        myAxios.get("/donor").then((res) => setDonor(res.data));
    },[myAxios])

    return donor
}

export default useDonor2