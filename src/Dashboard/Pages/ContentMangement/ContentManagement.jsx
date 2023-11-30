import { Link } from "react-router-dom";
import useDraft from "../../../hooks/useDraft/useDraft";
import BlogCard from "../../BlogCard/BlogCard";

const ContentManagement = () => {
  const drafts = useDraft()
    
  

  return (
    <div>
      <div>
        <h1 className="text-3xl text-gray-600 font-medium"> Content Management</h1>
        <div className="mt-3 mb-10 full h-[2px] bg-red-200"></div>
        <div className="flex justify-end">
          <Link to="/dashboard/content-management/add-blog" className="cursor-pointer  bg-red-600 px-10 py-2 text-white text-lg rounded-sm hover:rounded-xl active:bg-slate-300 active:text-red-600 active:border-[1px] active:border-red-600">Add Blog</Link>
        </div>
        <div className="mt-10 flex justify-center">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          {
            drafts?.map(draft=> <BlogCard key={draft._id} draft={draft}/>)
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
