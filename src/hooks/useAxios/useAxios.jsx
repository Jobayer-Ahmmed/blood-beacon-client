import axios from "axios";



const useAxios=()=>{

    const createAxios = axios.create({
        baseURL:"http://localhost:5000"
    })
    return createAxios
}

export default useAxios