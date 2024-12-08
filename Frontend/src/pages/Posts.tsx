import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PhotoIcon, PlusIcon } from "@heroicons/react/24/solid";
import MDEditor from "@uiw/react-md-editor";
import { formatDistanceToNow } from "date-fns";
import { FormEvent, Fragment, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Layout from "../components/shared/Layout/Layout";
import { createPost, useGetAllPostsQuery } from "../redux/api/PostAPI";
import { RootState } from "../redux/store";

const Posts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: postsData, isLoading: isLoadingPosts } = useGetAllPostsQuery();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent("");
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user?._id) {
      toast.error("Please login to create a post");
      return;
    }
    if (!content.trim()) {
      toast.error("Please enter some content");
      return;
    }

    try {
      const formData = new FormData();
      formData.set("content", content);
      if (selectedImage) {
        formData.set("photo", selectedImage);
      }

      await createPost({ data: formData, user: user._id });
      alert("Post created successfully");
      closeModal();
      window.location.reload();
    } catch (error) {
      alert("Failed to create post");
    }
  };

  return (
    <Layout>
      <div data-color-mode="light" className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Posts
          </h1>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Post
          </button>
        </div>
        <div className="space-y-6">
          {isLoadingPosts ? (
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-4 animate-pulse"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
          ) : postsData?.posts && postsData.posts.length > 0 ? (
            postsData.posts.map((post: any) => (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={post.user?.photo || "https://via.placeholder.com/40"}
                      alt={post.user?.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-100"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {post.user?.name || "Anonymous"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Posted {formatDistanceToNow(new Date(post.createdAt))}{" "}
                        ago
                      </p>
                    </div>
                  </div>
                  <div data-color-mode="light" className="mb-6">
                    <MDEditor.Markdown source={post.content} />
                  </div>
                  {post.image && (
                    <div className="rounded-lg overflow-hidden bg-gray-50">
                      <img
                        src={post.image.url}
                        alt="Post"
                        className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center mb-6">
                <PhotoIcon className="h-12 w-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No posts yet
              </h3>
              <p className="text-gray-500 mb-6">
                Be the first one to share something amazing!
              </p>
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Your First Post
              </button>
            </div>
          )}
        </div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={closeModal}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                    <div className="flex justify-between items-center mb-6">
                      <DialogTitle className="text-xl font-semibold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Create New Post
                      </DialogTitle>
                      <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-500 transition-colors"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div data-color-mode="light">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What's on your mind?
                        </label>
                        <MDEditor
                          value={content}
                          onChange={(val) => setContent(val || "")}
                          preview="edit"
                          height={200}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Add a photo
                        </label>
                        <div className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-6 hover:border-blue-400 transition-colors duration-200">
                          <div className="text-center">
                            {previewUrl ? (
                              <div>
                                <img
                                  src={previewUrl}
                                  alt="Preview"
                                  className="mx-auto h-40 w-40 object-cover rounded-lg shadow-md"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedImage(null);
                                    setPreviewUrl(null);
                                    if (fileInputRef.current) {
                                      fileInputRef.current.value = "";
                                    }
                                  }}
                                  className="mt-4 text-sm text-red-600 hover:text-red-800 transition-colors"
                                >
                                  Remove photo
                                </button>
                              </div>
                            ) : (
                              <>
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
                                <div className="mt-4">
                                  <label
                                    htmlFor="photo"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500 transition-colors"
                                  >
                                    <span>Upload a photo</span>
                                    <input
                                      id="photo"
                                      ref={fileInputRef}
                                      type="file"
                                      accept="image/*"
                                      onChange={handleImageChange}
                                      className="sr-only"
                                    />
                                  </label>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                  PNG, JPG, GIF up to 10MB
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                          Create Post
                        </button>
                      </div>
                    </form>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </Layout>
  );
};

export default Posts;
