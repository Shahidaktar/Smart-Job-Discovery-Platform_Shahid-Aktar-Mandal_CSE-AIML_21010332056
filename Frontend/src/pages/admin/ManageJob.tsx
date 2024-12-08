import { FormEvent, useEffect, useState } from "react";
import InputType from "../../components/shared/InputType";
import AdminLayout from "../../components/shared/Layout/AdminLayout";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

import MDEditor from "@uiw/react-md-editor";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Skeleton1 } from "../../components/Loader";
import {
  useDeleteJobMutation,
  useJobDetailsQuery,
  useUpdateJobMutation,
} from "../../redux/api/jobAPI";
import { RootState } from "../../redux/store";
import { responseToast } from "../../utils/features";

const ManageJob = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: productDetailsResponse,
    isLoading,
    isError,
  } = useJobDetailsQuery(params.id!);
  const {
    name,
    company,
    pay,
    experience,
    jobType,
    jobSummary,
    responsibities,
    skils,
    status,
    openings,
    location,
  } = productDetailsResponse?.data || {
    name: "",
    company: "",
    location: "",
    jobType: "",
    jobSummary: "",
    responsibities: "",
    skils: "",
    status: "",
    pay: "",
    openings: 0,
    experience: "",
  };
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [companyUpdate, setCompanyUpdate] = useState<string>(company);
  const [payUpdate, setPayUpdate] = useState<string>(pay);
  const [experienceUpdate, setExperienceUpdate] = useState<string>(experience);
  const [jobTypeUpdate, setJobTypeUpdate] = useState<string>(jobType);
  const [locationUpdate, setLocationUpdate] = useState<string>(location);
  const [jobSummaryUpdate, setJobSummaryUpdate] = useState<string>(jobSummary);
  const [responsibitiesUpdate, setResponsibitiesUpdate] =
    useState<string>(responsibities);
  const [skilsUpdate, setSkilsUpdate] = useState<string>(skils);
  const [statusUpdate, setStatusUpdate] = useState<string>(status);
  const [openingsUpdate, setOpeningsUpdate] = useState<number>(
    Number(openings)
  );

  const [updateJob] = useUpdateJobMutation();
  const [deleteJob] = useDeleteJobMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const JobData = {
      name: nameUpdate,
      company: companyUpdate,
      experience: experienceUpdate,
      jobType: jobTypeUpdate,
      location: locationUpdate,
      responsibities: responsibitiesUpdate,
      status: statusUpdate,
      jobSummary: jobSummaryUpdate,
      skils: skilsUpdate,
      pay: payUpdate.toString(),
      openings: openingsUpdate.toString(),
    };
    const res = await updateJob({
      userId: user?._id!,
      JobData,
      jobId: productDetailsResponse?.data._id!,
    });
    responseToast(res, navigate, "/admin/applications");
  };

  const deleteHandler = async () => {
    const res = await deleteJob({
      userId: user?._id!,
      jobId: productDetailsResponse?.data._id!,
    });
    responseToast(res, navigate, "/admin/applications");
  };

  useEffect(() => {
    if (productDetailsResponse) {
      setNameUpdate(productDetailsResponse.data.name);
      setCompanyUpdate(productDetailsResponse.data.company);
      setExperienceUpdate(productDetailsResponse.data.experience);
      setStatusUpdate(productDetailsResponse.data.status);

      setLocationUpdate(productDetailsResponse.data.location);
      setJobTypeUpdate(productDetailsResponse.data.jobType);
      setJobSummaryUpdate(productDetailsResponse.data.jobSummary);
      setSkilsUpdate(productDetailsResponse.data.skils);

      setResponsibitiesUpdate(productDetailsResponse.data.responsibities);
      setPayUpdate(productDetailsResponse.data.pay);
      setOpeningsUpdate(productDetailsResponse.data.openings);
    }
  }, [productDetailsResponse]);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <AdminLayout>
      {isLoading ? (
        <Skeleton1 />
      ) : (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Manage Job Position
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Update the job details using the form below.
                </p>
              </div>

              <button
                onClick={deleteHandler}
                className="inline-flex items-center rounded-md px-2 py-1 text-sm font-medium text-red-700 "
              >
                <TrashIcon className="mr-1.5 h-4 w-4" />
                Delete
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <form className="p-6 space-y-8" onSubmit={submitHandler}>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <InputType
                      id="name"
                      name="name"
                      placeholder="e.g., Senior Software Engineer"
                      type="text"
                      value={nameUpdate}
                      required
                      autoComplete="off"
                      label="Job Title"
                      labelFor="name"
                      onChange={(e) => setNameUpdate(e.target.value)}
                    />
                    <InputType
                      id="company"
                      name="company"
                      placeholder="e.g., Tech Solutions Inc."
                      type="text"
                      value={companyUpdate}
                      required
                      autoComplete="off"
                      label="Company Name"
                      labelFor="company"
                      onChange={(e) => setCompanyUpdate(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Job Details
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <InputType
                      id="pay"
                      name="pay"
                      placeholder="e.g., 8-12"
                      type="text"
                      value={payUpdate}
                      required
                      autoComplete="off"
                      label="Salary Range (LPA)"
                      labelFor="pay"
                      onChange={(e) => setPayUpdate(e.target.value)}
                    />
                    <InputType
                      id="experience"
                      name="experience"
                      placeholder="e.g., 3-5"
                      type="text"
                      value={experienceUpdate}
                      required
                      autoComplete="off"
                      label="Required Experience (years)"
                      labelFor="experience"
                      onChange={(e) => setExperienceUpdate(e.target.value)}
                    />
                    <InputType
                      id="jobType"
                      name="jobType"
                      placeholder="e.g., Full-time, Remote"
                      type="text"
                      value={jobTypeUpdate}
                      required
                      autoComplete="off"
                      label="Employment Type"
                      labelFor="jobType"
                      onChange={(e) => setJobTypeUpdate(e.target.value)}
                    />
                    <InputType
                      id="location"
                      name="location"
                      placeholder="e.g., New York, NY"
                      type="text"
                      value={locationUpdate}
                      required
                      autoComplete="off"
                      label="Location"
                      labelFor="location"
                      onChange={(e) => setLocationUpdate(e.target.value)}
                    />
                    <InputType
                      id="openings"
                      name="openings"
                      placeholder="e.g., 5"
                      type="number"
                      value={openingsUpdate}
                      required
                      autoComplete="off"
                      label="Number of Positions"
                      labelFor="openings"
                      onChange={(e) =>
                        setOpeningsUpdate(Number(e.target.value))
                      }
                    />
                    <InputType
                      id="status"
                      name="status"
                      placeholder="e.g., open/close"
                      type="text"
                      value={statusUpdate}
                      required
                      autoComplete="off"
                      label="Job Status"
                      labelFor="status"
                      onChange={(e) => setStatusUpdate(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Detailed Description
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="jobSummary"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Job Summary
                      </label>
                      <textarea
                        id="jobSummary"
                        name="jobSummary"
                        rows={3}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={jobSummaryUpdate}
                        onChange={(e) => setJobSummaryUpdate(e.target.value)}
                        placeholder="Provide a brief overview of the position..."
                      />
                    </div>

                    <div data-color-mode="light">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Responsibilities
                      </label>
                      <MDEditor
                        value={responsibitiesUpdate}
                        onChange={(value) =>
                          setResponsibitiesUpdate(value || "")
                        }
                        preview="edit"
                        className="min-h-[200px]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="skils"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Required Skills (Comma Separated)
                      </label>
                      <textarea
                        id="skils"
                        name="skils"
                        rows={3}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={skilsUpdate}
                        onChange={(e) => setSkilsUpdate(e.target.value)}
                        placeholder="List the required skills and qualifications..."
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Update Job Position
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageJob;
