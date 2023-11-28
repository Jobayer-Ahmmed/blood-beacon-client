import axios from "axios";
import { useForm } from "react-hook-form";



const image_upload_key = import.meta.env.VITE_Image_Uploaded_key;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_upload_key}`;

const AddBlog = () => {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit=(data)=>{
        const imageFile = { image: data.image[0] };
        console.log(imageFile)

        axios.post(image_upload_api, imageFile, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res.data);
          })

      }

  return (
    <div>
        <div>
            <h1 className="text-3xl text-gray-600 font-medium"> Add Blog</h1>
            <div className="mt-3 mb-10 full h-[2px] bg-red-200"></div>
            <div  className="bg-base-300 p-10 rounded-lg">
            <form
            className="text-black lg:w-full"
            onSubmit={handleSubmit(onSubmit)}
            >
            <label className="text-xl">Title</label>
            <br />
            <input
              className="mt-3 w-full h-10 pl-3 text-lg rounded-sm"
              {...register("title", { required: true })}
              type="text"
              placeholder="Title"
            />
            <br />
            {errors.title && (
              <span className="text-red-600">Title is required</span>
            )}<br />

            <label className="text-xl">Insert a thumbnail image</label>
            <br />
            <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered mt-3 w-full h-10" />

            <br />
            {errors.title && (
              <span className="text-red-600">Thumbnail_image is required</span>
            )}<br />

            <label className="text-xl">Content</label>
            <br />
            <textarea
              className="mt-3 w-full h-96 pl-3 text-lg rounded-sm"
              {...register("content", { required: true })}
              type="text"
              placeholder="Content"
            />
            <br />
            {errors.title && (
              <span className="text-red-600">Content is required</span>
            )}<br />
            <input
              className="cursor-pointer mt-4  h-10 bg-red-600 px-10 text-white text-lg rounded-sm hover:rounded-xl active:bg-slate-300 active:text-red-600 active:border-[1px] active:border-red-600"
              type="submit"
              value="Create The Blog"
            />
            
            </form>
            </div>
        </div>
    </div>
  )
}

export default AddBlog