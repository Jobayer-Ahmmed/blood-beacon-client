import { useContext, useEffect, useState } from "react"
import useAxios from "../useAxios/useAxios"
import { MyContext } from "../../ContextApi/MyAuthProvider"


const useProfile = () => {
    const [profile, setProfile] = useState({})
    const myAxios = useAxios()
    const {myUser} = useContext(MyContext)
    const email = myUser?.email

    useEffect(()=>{
        myAxios.get(`/dashboard/profile/${email}`)
        .then((res)=>setProfile(res.data))
    },[])
    return profile
}

export default useProfile