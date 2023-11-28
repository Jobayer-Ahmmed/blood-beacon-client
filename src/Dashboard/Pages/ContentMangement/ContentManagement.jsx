import { Link } from "react-router-dom";

const ContentManagement = () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl text-gray-600 font-medium"> Content Management</h1>
        <div className="mt-3 mb-10 full h-[2px] bg-red-200"></div>
        <div className="flex justify-end">
        <Link to="/dashboard/content-management/add-blog" className="cursor-pointer  bg-red-600 px-10 py-2 text-white text-lg rounded-sm hover:rounded-xl active:bg-slate-300 active:text-red-600 active:border-[1px] active:border-red-600">Add Blog</Link>

        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
