import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../components/shared/Layout/Layout";
import { useApplyDetailsQuery } from "../redux/api/ApplyAPI";
import { RootState } from "../redux/store";
import { CustomError } from "../types/api-types";

const Applies = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isLoading, isError, error } = useApplyDetailsQuery(user?._id!);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <Layout>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            My Applications
          </h1>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : data?.data.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No applications yet
              </h3>
              <p className="text-gray-500">
                Start exploring and applying for jobs!
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data?.data.map((application) => (
                  <div
                    key={application.job?._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex justify-end mb-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            application.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : application.status === "Selected"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {application.status}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-1">
                        {application.job?.name || "N/A"}
                      </h2>

                      <div className="space-y-3 text-sm">
                        <div className="flex items-center text-gray-600">
                          <BuildingOfficeIcon className="h-5 w-5 mr-2" />
                          <span>{application.job?.company || "N/A"}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPinIcon className="h-5 w-5 mr-2" />
                          <span>{application.job?.location || "N/A"}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <BriefcaseIcon className="h-5 w-5 mr-2" />
                          <span>{application.job?.jobType || "N/A"}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <CalendarIcon className="h-5 w-5 mr-2" />
                          <span>
                            Applied on {format(new Date(), "MMM dd, yyyy")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                      <Link to={`/job/${application.job?._id}`}>
                        <button className="w-full px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none">
                          View Application
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Applies;
