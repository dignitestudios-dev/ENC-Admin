import { CiSearch } from "react-icons/ci";
import Pagination from "../../global/Pagination";
import { useUsers } from "../../../hooks/api/Get";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import AddBlog from "./AddBlog";
import { useDeleteSlot } from "../../../hooks/api/Delete";
import DeleteBlogModal from "./DeleteBlogModal";
import UpdateBlog from "./UpdateBlog";

export default function BlogsList() {
  const [pageNo, setPageNo] = useState(1);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [UpdateId, setUpdateId] = useState(false);
  const [isDeleteId, setDeleteId] = useState("");
  const [isUpdateData, setUpdateData] = useState({});
  const { loading, data, pagination, setReload, reload } = useUsers(
    `blogs`,
    pageNo,
    search
  );
  const { deleteLoading, deleteData } = useDeleteSlot();
  const handleDelete = (id) => {
    setDeleteId(id);
    if (!id) return;
    const url = `blogs/${id}`;
    deleteData(url, setReload, reload);
    setIsDelete(false);
  };
  return (
    <div className="border px-3 py-3 col-span-9 rounded-[13px] bg-white shadow-[0px_0.84px_2.52px_0px_#0000001A]">
      <div className="pb-2 flex items-center justify-between">
        <h3 className="text-[32px] font-[600] ">Blogs</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#181818] py-2 px-5 text-white rounded-md"
        >
          Create Blog
        </button>
      </div>
      <div className="flex items-center mb-3 w-full p-1 px-2 bg-gray-100 rounded-[8px] overflow-hidden">
        <div className="flex items-center pl-4">
          <CiSearch className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 text-[14px] h-[40px] font-[400] bg-transparent border-none outline-none text-[#0A150F80]"
        />
        {/* <button className="rounded-[8px] bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white px-6 py-2">
          Search
        </button> */}
      </div>

      <div>
        <div className="relative overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <FiLoader className="animate-spin text-lg " />
            </div>
          ) : data && data.length > 0 ? (
            <div className="container mx-auto px-4 py-8">
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data.map((blog, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <img
                      src={blog.media}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold ">{blog.title}</h2>
                        <p className="text-xs text-end text-gray-400">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div
                        className="text-gray-700 mt-2 text-sm"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                      />
                      <div className="flex items-center gap-4 mt-3">
                        <button
                          onClick={() => {
                            setUpdateData(blog)
                            setUpdateId(blog._id);
                            setIsUpdate(true);
                          }}
                          className="bg-[#181818] py-2 px-3 text-white w-full rounded-md"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => {
                            setDeleteId(blog._id);
                            setIsDelete(true);
                          }}
                          className="bg-red-500 py-2 px-3 text-white w-full rounded-md flex items-center justify-center gap-3"
                        >
                          Delete{" "}
                          {deleteLoading && isDeleteId === blog._id && (
                            <FiLoader className="animate-spin text-lg " />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center py-10">
              <p className="text-gray-500 text-lg">No blogs found.</p>
            </div>
          )}
        </div>
      </div>
      <AddBlog
        isReload={reload}
        setIsReload={setReload}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <UpdateBlog
        isReload={reload}
        setIsReload={setReload}
        isOpen={isUpdate}
        item={isUpdateData}
        setItem={setUpdateData}
        setIsOpen={setIsUpdate}
        updateId={UpdateId}
      />
      <div className="flex w-full justify-end">
        <Pagination
          currentPage={pageNo}
          totalPages={pagination?.totalPages || 1}
          onPageChange={setPageNo}
        />
      </div>
      <DeleteBlogModal
        deleteLoading={deleteLoading}
        handleDelete={handleDelete}
        isOpen={isDelete}
        isDeleteId={isDeleteId}
        setIsOpen={setIsDelete}
      />
    </div>
  );
}
