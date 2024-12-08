import { ChangeEvent, FormEvent, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux";
import Layout from "../components/shared/Layout/Layout";
import { recomend } from "../redux/api/RankAPI";
import { useResumeUploadMutation } from "../redux/api/resumeAPI";
import { RootState, server } from "../redux/store";

const UploadResume = () => {
  const [job, setJob] = useState("");
  const [load, setLoad] = useState(false);
  const [buttonText, setButtonText] = useState("Submit");
  const [show, setShow] = useState(false);
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [resume, setResume] = useState<File>();
  const [resumeUpload] = useResumeUploadMutation();

  const resumeUploader = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setResume(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resume || !user?._id) return;

    setLoad(true);
    setButtonText("Processing...");
    try {
      const formData = new FormData();
      formData.set("user", user?._id!);
      formData.set("singleresume", resume);

      const resResumeUpload: any = await resumeUpload({ formdata: formData });

      let data = {
        url: `${server}/${resResumeUpload.data.resume.singleresume}`,
      };
      const rejob = await recomend(data.url);
      setJob(rejob.job);
      setButtonText("Submitted");
    } catch (error) {
      console.log(error);
      setButtonText("Submit");
    } finally {
      setLoad(false);
    }
  };
  return (
    <Layout>
      <form onSubmit={submitHandler}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-2 py-2 lg:px-2">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Your Profile
            </h2>
          </div>

          <img
            src={user?.photo}
            alt="Profile"
            height={150}
            width={150}
            className="mx-auto rounded-full mt-4 text-center border-2 border-gray-200"
          />
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
            <div className="flex flex-col items-start space-y-2">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="name"
              >
                Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                readOnly
                value={user?.name}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex flex-col items-start space-y-2">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="email"
              >
                Email
              </label>

              <input
                type="text"
                id="email"
                readOnly
                name="email"
                value={user?.email}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="flex flex-col items-start space-y-2">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="dob"
              >
                Date of Birth
              </label>

              <input
                type="text"
                id="dob"
                name="dob"
                readOnly
                value={user?.dob.slice(0, 10)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex flex-col items-start space-y-2">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="gender"
              >
                Gender
              </label>

              <input
                type="text"
                id="gender"
                name="gender"
                value={user?.gender}
                readOnly
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-2">
          {!show && (
            <div className="flex items-center justify-center">
              <button
                onClick={() => setShow(!show)}
                className=" space-x-3  p-3 text-gray-600 animate-bounce"
              >
                <IoIosArrowDown className="w-8 h-8" />
              </button>
            </div>
          )}

          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
            {show && (
              <div className="flex flex-col items-start space-y-2">
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                  htmlFor="job"
                >
                  Recommended Job
                </label>

                <input
                  type="text"
                  id="job"
                  readOnly
                  name="job"
                  value={job}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            )}
          </div>
        </div>

        {show && (
          <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-2">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-2 text-start text-sm font-medium leading-6 text-gray-900 tracking-tight ">
                  Resume
                </h2>
              </div>

              <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
                <div className="col-span-full ">
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <div className="mt-2 flex text-sm leading-6 text-gray-600">
                        <div className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none  hover:text-indigo-500">
                          <input
                            id="file"
                            required
                            type="file"
                            onChange={resumeUploader}
                            className="bg-gray-100 "
                          />
                        </div>
                      </div>
                      <p className="text-xs leading-5 text-gray-600 p-2">
                        PDF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={load}
                    className="flex w-full justify-center items-center space-x-3 rounded-md bg-indigo-600 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 border border-gray-300"
                  >
                    <span className="text-white">{buttonText}</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShow(!show)}
                  className=" space-x-3  p-3 text-gray-600 "
                >
                  <IoIosArrowUp className="w-8 h-8" />
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </Layout>
  );
};

export default UploadResume;
