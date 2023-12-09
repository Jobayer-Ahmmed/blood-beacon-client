import { useLoaderData } from "react-router-dom"


const BlogRead = () => {
  const {data} = useLoaderData()
    const {title, image, content}  = data


    
  return (
    <div>
        <div>
            <h1 className="text-3xl text-gray-600 font-medium"> Blog Read</h1>
            <div className="mt-3 mb-10 full h-[2px] bg-red-200"></div>
            <div>
                <div className="w-80 h-64 flex justify-center" >
                <img  src={image} alt="" className="w-full h-full" />
                </div>
                <h3 className="my-5 text-2xl font-medium text-gray-600">{title}</h3>
                <p className="text-gray-600">{content}</p>
            </div>
        </div>
    </div>
  )
}

export default BlogRead