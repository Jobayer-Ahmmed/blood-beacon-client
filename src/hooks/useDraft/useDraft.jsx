import { useEffect, useState } from "react";
import useAxios from "../useAxios/useAxios";


const useDraft = () => {
    const [drafts, setDrafts] = useState([])
    const myAxios = useAxios()

    useEffect(()=>{
    myAxios.get("/blog")
    .then(res=>setDrafts(res.data))
    },[])

    return drafts
}

export default useDraft