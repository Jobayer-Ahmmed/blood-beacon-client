import axios from "axios";



const useAxios=()=>{

    const createAxios = axios.create({
        // baseURL:"http://localhost:5000"
        baseURL:"https://ass-12-server-zeta.vercel.app"

    })
    return createAxios
}

export default useAxios

// make sure, url of URL.jsx and this url are same