import MDEditor from "@uiw/react-md-editor";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputType from "../../components/shared/InputType";
import AdminLayout from "../../components/shared/Layout/AdminLayout";
import { useNewJobMutation } from "../../redux/api/jobAPI";
import { RootState } from "../../redux/store";
import { responseToast } from "../../utils/features";

const AddJob = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [name, setName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [pay, setPay] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [jobSummary, setJobSummary] = useState<string>("");
  const [responsibities, setResponsibities] = useState<string>("");
  const [skils, setSkils] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [openings, setOpenings] = useState<number>(0);

  const [newJob] = useNewJobMutation();
  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !name ||
      !company ||
      !pay ||
      openings < 0 ||
      !experience ||
      !jobType ||
      !location ||
      !jobSummary ||
      !responsibities ||
      !skils ||
      !status
    )
      return;

    const JobData = {
      name,
      company,
      experience: experience,
      jobType,
      location,
      responsibities,
      status,
      jobSummary,
      skils,
      pay: pay.toString(),
      openings: openings.toString(),
    };
    const res = await newJob({ id: user?._id!, JobData });

    responseToast(res, navigate, "/admin/applications");
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Create New Job Position
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Fill in the details below to post a new job opportunity.
            </p>
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
                    value={name}
                    required
                    autoComplete="off"
                    label="Job Title"
                    labelFor="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <InputType
                    id="company"
                    name="company"
                    placeholder="e.g., Tech Solutions Inc."
                    type="text"
                    value={company}
                    required
                    autoComplete="off"
                    label="Company Name"
                    labelFor="company"
                    onChange={(e) => setCompany(e.target.value)}
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
                    value={pay}
                    required
                    autoComplete="off"
                    label="Salary Range ( LPA )"
                    labelFor="pay"
                    onChange={(e) => setPay(e.target.value)}
                  />
                  <InputType
                    id="experience"
                    name="experience"
                    placeholder="e.g., 3-5"
                    type="text"
                    value={experience}
                    required
                    autoComplete="off"
                    label="Required Experience ( years )"
                    labelFor="experience"
                    onChange={(e) => setExperience(e.target.value)}
                  />
                  <InputType
                    id="jobType"
                    name="jobType"
                    placeholder="e.g., Full-time, Remote"
                    type="text"
                    value={jobType}
                    required
                    autoComplete="off"
                    label="Employment Type"
                    labelFor="jobType"
                    onChange={(e) => setJobType(e.target.value)}
                  />
                  <InputType
                    id="location"
                    name="location"
                    placeholder="e.g., New York, NY"
                    type="text"
                    value={location}
                    required
                    autoComplete="off"
                    label="Location"
                    labelFor="location"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <InputType
                    id="openings"
                    name="openings"
                    placeholder="e.g., 5"
                    type="number"
                    value={openings}
                    required
                    autoComplete="off"
                    label="Number of Positions"
                    labelFor="openings"
                    onChange={(e) => setOpenings(Number(e.target.value))}
                  />
                  <InputType
                    id="status"
                    name="status"
                    placeholder="e.g., open/close"
                    type="text"
                    value={status}
                    required
                    autoComplete="off"
                    label="Job Status"
                    labelFor="status"
                    onChange={(e) => setStatus(e.target.value)}
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
                      placeholder="Provide a brief overview of the position..."
                      value={jobSummary}
                      onChange={(e) => setJobSummary(e.target.value)}
                    />
                  </div>

                  <div data-color-mode="light">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Responsibilities
                    </label>
                    <MDEditor
                      value={responsibities}
                      onChange={(value) => setResponsibities(value || "")}
                      preview="edit"
                      className="min-h-[200px] rounded-lg"
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
                      placeholder="List the required skills and qualifications..."
                      value={skils}
                      onChange={(e) => setSkils(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddJob;
