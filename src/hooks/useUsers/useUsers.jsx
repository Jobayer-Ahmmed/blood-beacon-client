import { useEffect, useState } from "react";
import useAxios from "../useAxios/useAxios";

const useUsers = () => {
  const myAxios = useAxios();
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    myAxios.get(`/users`, {withCredentials : true})
    .then((res)=>{
        setUsers(res.data)
    })
  },[])
  return users
};

export default useUsers;
