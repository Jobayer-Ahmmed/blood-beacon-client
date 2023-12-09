import { useEffect, useState } from "react"
import useAxios from "../../hooks/useAxios/useAxios"




const Blog = () => {
  const [blogs, setBlogs] = useState([])
    const myAxios = useAxios()


    useEffect(()=>{
        myAxios.get("/blog/publish")
        .then((res)=>setBlogs(res.data))
    },[])

 


    
    return (
      <div className="w-full px-5 md:px-xPadding py-[120px]">
          <div>
              <h1 className="text-4xl text-gray-600 font-medium mb-10">Threre are {blogs?.length} Blogs in here</h1>
            <div className="flex justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {
                blogs?.map(blog=> <div key={blog._id} className="card w-full bg-base-300 shadow-xl">
            
            <figure className="px-10 pt-10">
              <img src={blog.image}  alt="Shoes" className="rounded-xl h-40 w-full" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{blog.title}</h2>
              <p>{blog.content}</p>

            </div>
          </div>) 
              }
            </div>
            </div>
          </div>
      </div>
    )
}

export default Blog