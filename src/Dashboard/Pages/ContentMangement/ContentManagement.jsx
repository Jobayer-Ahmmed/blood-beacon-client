import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios/useAxios";
import { FaRegEdit } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

const ContentManagement = () => {
  const [isPublish, setIsPublish] = useState("Publish")
  const [drafts, setDrafts] = useState([])
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  const myAxios = useAxios()

  const getBlogData=()=>{
    myAxios.get("/blog")
    .then(res=>setDrafts(res.data))
  }
  useEffect(()=>{
    getBlogData()
  },[myAxios, isPublish, count])



  const handleStatus =(id, status) => {
    setCount(count+1)
      if(status==="Publish"){
        console.log(status)
        setCount(count+1)
          setIsPublish("Publish")
          myAxios.put(`blog/${id}`, {
              status:"Draft",
          })
          .then(()=>{
            setCount(count+1)
              Swal.fire({
                  title: "Blog is Published",
                  icon: "success"
                });
          })
      }
          
      else{
        setCount(count+1)
          setIsPublish("Draft")
          myAxios.put(`blog/${id}`, {
              status:"Publish",
          })
          .then(()=>{
            setCount(count+1)
              Swal.fire({
                  title: "Blog is Drafted",
                  icon: "success"
                })
          })
        }
    }

    const handleDelete= (id)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        myAxios.delete(`/dashboard/blog/delete/${id}`)
        .then(()=>{
          if (result.isConfirmed) {
            getBlogData()
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        })

      });
    }
   
  return (
    <div className="w-full px-5">
      <div>
        <h1 className="text-3xl text-gray-600 font-medium"> Content Management</h1>
        <div className="mt-3 mb-10 full h-[2px] bg-red-200"></div>
        <div className="flex justify-end">
          <Link to="/dashboard/content-management/add-blog" className="cursor-pointer  bg-red-600 px-10 py-2 text-white text-lg rounded-sm hover:rounded-xl active:bg-slate-300 active:text-red-600 active:border-[1px] active:border-red-600">Add Blog</Link>
        </div>
        <div className="mt-10 flex justify-center">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          {
            drafts?.map(draft=> <div key={draft._id} className="card w-full bg-base-300 shadow-xl">
            
    <figure className="px-10 pt-10">
      <img src={draft.image}  alt="Shoes" className="rounded-xl h-40 w-full" />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title">{draft.title}</h2>
      <p>{draft.content.slice(0,50)} ... <Link to={`/dashboard/blog/read/${draft._id}`} className="underline">Read Full</Link></p>
      <div className="card-actions mt-3">
          <button onClick={()=>handleStatus(draft._id, draft.status)} className={draft.status==="Publish" ? "btn btn-secondary": "btn btn-primary"}>Make It {draft.status}</button>
          
      </div>
      <div className="flex justify-center gap-10 my-4">
      <button className="text-3xl font-bold" onClick={()=>navigate(`/dashboard/blog/edit/${draft._id}`)}><FaRegEdit/></button>
       <button className="text-4xl font-bold text-red-600" onClick={()=>handleDelete(draft._id)}><TiDeleteOutline/></button>
      </div>
      <div>
          {
            draft.status==="Draft"?<p>blog is published</p>:<p>blog is not published</p>
              
          }
      </div>
    </div>
  </div>)
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement
