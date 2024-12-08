import { MapPinIcon } from "@heroicons/react/20/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToFavorite,
  removeFromFavorite,
} from "../redux/reducer/favoriteReducer";
import { RootState } from "../redux/store";

interface JobProps {
  jobid: string;
  name: string;
  company: string;
  location: string;
  jobSummary: string;
}

const JobCard = ({ jobid, name, company, location, jobSummary }: JobProps) => {
  const dispatch = useDispatch();
  const { favoriteJobs } = useSelector(
    (state: RootState) => state.favoriteReducer
  );
  const isFavorite = favoriteJobs.some((job) => job._id === jobid);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorite(jobid));
    } else {
      dispatch(
        addToFavorite({
          _id: jobid,
          name,
          company,
          location,
          jobSummary,
        })
      );
    }
  };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="flex h-full flex-col p-6">
        <div className="flex-1">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 line-clamp-1 hover:text-blue-600">
            {name}
          </h2>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-base font-medium text-gray-600">{company}</p>
            <div className="flex items-center text-gray-500">
              <MapPinIcon className="h-5 w-5" />
              <span className="ml-2 text-sm">{location}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 line-clamp-3">{jobSummary}</p>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handleFavorite}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500"
          >
            {isFavorite ? (
              <HeartSolid className="h-6 w-6 text-red-500" />
            ) : (
              <HeartOutline className="h-6 w-6" />
            )}
          </button>
          <Link
            to={`/job/${jobid}`}
            className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
          >
            More Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
