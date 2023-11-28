import axios from "axios";



const useAxios=()=>{

    const createAxios = axios.create({
        // baseURL:"http://localhost:5000"
        baseURL:"https://ass-12-server-zeta.vercel.app"
        // baseURL:"https://ass-12-server-ct18jrl3e-jobayers-projects.vercel.app"
    })
    return createAxios
}

export default useAxios