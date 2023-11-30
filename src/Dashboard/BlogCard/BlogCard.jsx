import { useState } from "react"
import useAxios from "../../hooks/useAxios/useAxios"
import Swal from 'sweetalert2'



const BlogCard = ({draft}) => {
    const [isPublish, setIsPublish] = useState("Publish")
    const {status, image, title, content,_id} =draft
    const myAxios = useAxios()



    const handleStatus =() => {
        if(isPublish===status){
            setIsPublish("Publish")
            myAxios.put(`blog/${_id}`, {
                status:"Draft",
            })
            .then(()=>{
                Swal.fire({
                    title: "Blog is Published",
                    text:"For see change please reload the page",
                    icon: "success"
                  });
            })
        }
            
        else{
            setIsPublish("Draft")
            myAxios.put(`blog/${_id}`, {
                status:"Publish",
            })
            .then(()=>{
                Swal.fire({
                    title: "Blog is Drafted",
                    text:"For see change please reload the page",
                    icon: "success"
                  })
            })
        }
           
      }

  return (
<div className="card w-full bg-base-300 shadow-xl">
    
  <figure className="px-10 pt-10">
    <img src={image}  alt="Shoes" className="rounded-xl h-40 w-full" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{title}</h2>
    <p>{content.slice(0,50)} ...</p>
    <div className="card-actions">
        <button onClick={handleStatus} className={status==="Publish" ? "btn btn-secondary": "btn btn-primary"}>Make It {status}</button>
        
    </div>
    <div>
        {
            status==="Draft"?<p>blog is published</p>:<p>blog is not published</p>
            
        }
    </div>
  </div>
</div>
  )
}

export default BlogCard