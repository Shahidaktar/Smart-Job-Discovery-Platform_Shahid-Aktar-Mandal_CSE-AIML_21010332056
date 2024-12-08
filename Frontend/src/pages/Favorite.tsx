import { HeartIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import JobCard from "../components/Card";
import Layout from "../components/shared/Layout/Layout";
import { RootState } from "../redux/store";

const Favorite = () => {
  const { favoriteJobs } = useSelector(
    (state: RootState) => state.favoriteReducer
  );

  return (
    <Layout>
      <div className="wrapper my-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Favorite Jobs
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Your collection of saved job opportunities
          </p>
        </div>

        {favoriteJobs.length === 0 ? (
          <div className="text-center py-12">
            <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              No favorites
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Start adding jobs to your favorites list.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {favoriteJobs.map((job) => (
              <JobCard
                key={job._id}
                jobid={job._id}
                name={job.name}
                company={job.company}
                location={job.location}
                jobSummary={job.jobSummary}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Favorite;
