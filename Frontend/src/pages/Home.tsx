import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import JobCard from "../components/Card";
import { JobCardSkeleton } from "../components/Loader";
import Layout from "../components/shared/Layout/Layout";
import { useSearchJobsQuery } from "../redux/api/jobAPI";

const Home = () => {
  const [search, setSearch] = useState("");
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [pay, setPay] = useState("");
  const [page, setPage] = useState(1);
  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  const clearFilters = () => {
    setSearch("");
    setExperience("");
    setStatus("");
    setLocation("");
    setJobType("");
    setPay("");
  };
  const { data, isLoading, isError } = useSearchJobsQuery({
    search,
    page,
    experience,
    status,
    location,
    jobType,
    pay,
  });
  const distinctValues = useMemo(() => {
    if (!data?.allJobs)
      return {
        locations: [],
        jobTypes: [],
        experiences: [],
        statuses: [],
        pays: [],
      };
    const allJobs = data.allJobs;
    return {
      locations: [...new Set(allJobs.map((job) => job.location))],
      jobTypes: [...new Set(allJobs.map((job) => job.jobType))],
      experiences: [...new Set(allJobs.map((job) => job.experience))].sort(
        (a, b) => Number(a) - Number(b)
      ),
      statuses: [...new Set(allJobs.map((job) => job.status))],
      pays: [...new Set(allJobs.map((job) => job.pay))],
    };
  }, [data?.allJobs]);
  if (isError) toast.error("Cannot Fetch the Jobs");
  return (
    <Layout>
      <section id="jobs" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="relative w-full lg:w-1/3">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  id="search"
                  placeholder="Search Jobs by Title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 w-full lg:w-2/3">
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 py-2.5 px-3 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Status</option>
                  {distinctValues.statuses.map((statusValue) => (
                    <option key={statusValue} value={statusValue}>
                      {statusValue === "open" ? "Live" : "Closed"}
                    </option>
                  ))}
                </select>
                <select
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 py-2.5 px-3 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Experience</option>
                  {distinctValues.experiences.map((exp) => (
                    <option key={exp} value={exp}>
                      {exp === "0"
                        ? "Fresher"
                        : `${exp} Year${Number(exp) > 1 ? "s" : ""}`}
                    </option>
                  ))}
                </select>

                <select
                  id="pay"
                  value={pay}
                  onChange={(e) => setPay(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 py-2.5 px-3 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Salary</option>
                  {distinctValues.pays.map((pay) => (
                    <option key={pay} value={pay}>
                      {pay.trim().length > 5 ? pay : `${pay} LPA`}
                    </option>
                  ))}
                </select>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 py-2.5 px-3 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Location</option>
                  {distinctValues.locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc.charAt(0).toUpperCase() + loc.slice(1)}
                    </option>
                  ))}
                </select>
                <select
                  id="jobType"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 py-2.5 px-3 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Job Type</option>
                  {distinctValues.jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {(search || experience || status || location || jobType || pay) && (
              <div className="flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <XMarkIcon className="h-4 w-4" />
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-3 xl:gap-x-8">
            {isLoading ? (
              <>
                <JobCardSkeleton />
                <JobCardSkeleton />
                <JobCardSkeleton />
                <JobCardSkeleton />
                <JobCardSkeleton />
                <JobCardSkeleton />
              </>
            ) : (
              data?.jobs.map((job) => (
                <JobCard
                  key={job._id}
                  jobid={job._id}
                  name={job.name}
                  company={job.company}
                  location={job.location}
                  jobSummary={job.jobSummary}
                />
              ))
            )}
          </div>
        </div>
        {data && data.totalPage > 1 && (
          <div className="mt-8 mb-6 flex flex-col items-center gap-4">
            <div className="text-sm text-gray-700">
              <span className="font-medium">{page}</span> of{" "}
              <span className="font-medium">{data.totalPage}</span> pages
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={!isPrevPage}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Previous
              </button>
              <div className="hidden sm:flex items-center gap-1">
                {[...Array(Math.min(data.totalPage, 5))].map((_, idx) => {
                  const pageNumber = idx + 1;
                  return (
                    <button
                      key={idx}
                      onClick={() => setPage(pageNumber)}
                      className={`inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-lg transition-colors duration-200
                        ${
                          page === pageNumber
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                {data.totalPage > 5 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
              </div>

              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, data.totalPage))
                }
                disabled={!isNextPage}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Home;
