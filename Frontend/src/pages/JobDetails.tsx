import {
  BriefcaseIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  MapPinIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import MDEditor from "@uiw/react-md-editor";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton1 } from "../components/Loader";
import Layout from "../components/shared/Layout/Layout";
import {
  useExistingApplyQuery,
  useNewApplyMutation,
} from "../redux/api/ApplyAPI";
import { useJobDetailsQuery } from "../redux/api/jobAPI";
import { useResumeScoreMutation } from "../redux/api/RankAPI";
import { useResumeUploadMutation } from "../redux/api/resumeAPI";
import { RootState, server } from "../redux/store";
import { responseToast } from "../utils/features";

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isLoading, isError } = useJobDetailsQuery(id!);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [buttonText, setButtonText] = useState("Submit Application");
  const [resume, setResume] = useState<File>();
  const navigate = useNavigate();

  const { data: ExistingApply } = useExistingApplyQuery({
    user: user?._id,
    job: id!,
  });
  const [resumeUpload] = useResumeUploadMutation();
  const [resumeScore] = useResumeScoreMutation();
  const [newApply] = useNewApplyMutation();

  if (isError) toast.error("Cannot Fetch the Job");

  const resumeUploader = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      setResume(file);
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resume || !user?._id) {
      toast.error("Please upload your resume");
      return;
    }
    setButtonText("Processing...");
    try {
      const formData = new FormData();
      formData.set("user", user?._id!);
      formData.set("singleresume", resume);

      const resResumeUpload: any = await resumeUpload({ formdata: formData });
      let scoreData = {
        url: `${server}/${resResumeUpload.data.resume.singleresume}`,
        skills: data?.data.skils.split(",")!,
      };
      const resResumeScore: any = await resumeScore(scoreData);

      const dataSubmit = {
        job: id!,
        resume: resResumeUpload.data.resume.singleresume!,
        score: resResumeScore.data.score,
        phone,
        location: currentLocation,
        workExperience,
      };
      const res = await newApply({
        user: user?._id as string,
        data: dataSubmit,
      });
      setButtonText("Application Submitted!");
      setIsModalOpen(false);

      responseToast(res, navigate, "/applies");
    } catch (error) {
      console.log(error);
      setButtonText("Submit Application");
      toast.error("Something went wrong!");
    }
  };
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {isLoading ? (
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <Skeleton1 />
          </div>
        ) : (
          <>
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative">
                  <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                  <div className="px-6 pb-6">
                    <div className="-mt-6 flex items-center">
                      <span className="inline-flex items-center justify-center p-3 bg-white rounded-xl shadow-lg">
                        <BriefcaseIcon className="w-8 h-8 text-cyan-600" />
                      </span>
                    </div>
                    <div className="mt-3">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {data?.data.name}
                      </h1>
                      <p className="mt-1 text-lg text-gray-600">
                        {data?.data.company}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 pb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CurrencyRupeeIcon className="h-6 w-6 text-cyan-600" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Annual Package
                          </p>
                          <p className="font-medium">
                            {data && data?.data.pay.trim().length > 5
                              ? data?.data.pay
                              : `₹${data?.data.pay} LPA`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <ClockIcon className="h-6 w-6 text-cyan-600" />
                        <div>
                          <p className="text-sm text-gray-500">Experience</p>
                          <p className="font-medium">
                            {data?.data.experience} Years
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <BriefcaseIcon className="h-6 w-6 text-cyan-600" />
                        <div>
                          <p className="text-sm text-gray-500">Job Type</p>
                          <p className="font-medium">{data?.data.jobType}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MapPinIcon className="h-6 w-6 text-cyan-600" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">{data?.data.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200">
                  <div className="px-6 py-6">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          About the Job
                        </h3>
                        <div className="mt-4 prose prose-sm max-w-none">
                          <div data-color-mode="light">
                            <MDEditor.Markdown
                              source={data?.data.responsibities}
                              style={{
                                backgroundColor: "transparent",
                                color: "#374151",
                                fontFamily: "inherit",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Required Skills
                        </h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {data?.data.skils.split(",").map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-cyan-50 text-cyan-700"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Positions Available
                          </h3>
                          <p className="mt-2 text-gray-600">
                            {data?.data.openings}{" "}
                            {data?.data.openings === 1
                              ? "Position"
                              : "Positions"}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Annual CTC
                          </h3>
                          <p className="mt-2 text-gray-600">
                            {data && data?.data.pay.trim().length > 5
                              ? data?.data.pay
                              : `₹${data?.data.pay} LPA`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-6 py-5">
                    <div className="flex justify-center">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        disabled={
                          ExistingApply?.status || data?.data.status === "close"
                        }
                        className={`inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white transition-all duration-200 shadow-sm ${
                          ExistingApply?.status || data?.data.status === "close"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                        }`}
                      >
                        {data?.data.status === "close"
                          ? "Applications Closed"
                          : ExistingApply?.status
                          ? "Already Applied"
                          : "Apply for this Position"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isModalOpen && (
              <div
                className="fixed inset-0 z-50 overflow-y-auto"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
              >
                <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                  ></div>
                  <span
                    className="hidden sm:inline-block sm:h-screen sm:align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>

                  <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                    <div className="absolute right-0 top-0 pr-4 pt-4">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                            Apply for {data?.data.name}
                          </h3>

                          <form onSubmit={submitHandler} className="space-y-4">
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
                                value={user?.name}
                                readOnly
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
                                name="email"
                                value={user?.email}
                                readOnly
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <div className="flex flex-col items-start space-y-2">
                              <label
                                className="block text-sm font-medium leading-6 text-gray-900"
                                htmlFor="phone"
                              >
                                Phone
                              </label>

                              <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <div className="flex flex-col items-start space-y-2">
                              <label
                                className="block text-sm font-medium leading-6 text-gray-900"
                                htmlFor="location"
                              >
                                Current Location
                              </label>

                              <input
                                type="text"
                                id="location"
                                name="location"
                                value={currentLocation}
                                onChange={(e) =>
                                  setCurrentLocation(e.target.value)
                                }
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <div className="flex flex-col items-start space-y-2">
                              <label
                                className="block text-sm font-medium leading-6 text-gray-900"
                                htmlFor="work"
                              >
                                Work Experience
                              </label>

                              <input
                                type="text"
                                id="work"
                                name="work"
                                value={workExperience}
                                onChange={(e) =>
                                  setWorkExperience(e.target.value)
                                }
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>

                            <div className="flex flex-col items-start space-y-2">
                              <label className="block text-sm font-medium text-gray-900 mb-1">
                                Upload Resume
                              </label>
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={resumeUploader}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-cyan-500 focus:outline-none"
                                required
                              />
                            </div>

                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                              <button
                                type="submit"
                                disabled={buttonText === "Processing..."}
                                className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-cyan-600 hover:to-blue-600 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {buttonText}
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
