import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Skeleton1 } from "../../components/Loader";
import AdminLayout from "../../components/shared/Layout/AdminLayout";
import { useAllAppliesQuery } from "../../redux/api/ApplyAPI";
import { useJobDetailsQuery } from "../../redux/api/jobAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";

const JobApplicants = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const params = useParams();
  const { data, isLoading, isError, error } = useAllAppliesQuery({
    adminId: user?._id!,
    jobId: params.id!,
  });
  const { data: jobData } = useJobDetailsQuery(params.id!);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  return (
    <AdminLayout>
      {isLoading ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton1 />
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-semibold text-gray-900 ">
            Applications ({jobData?.data.name})
          </h1>
          <div className="mt-8 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle">
                <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Applicant Name
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          DOB
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Score
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Manage
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {data?.data.map((record) => (
                        <tr key={record.user._id} className="hover:bg-gray-50">
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {record.user?.name}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {record.user.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {record.user.dob.slice(0, 10)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {record.score}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4">
                            <Link
                              to={`/admin/job/applications/status/${record._id}`}
                              className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700 hover:bg-blue-100"
                            >
                              Manage
                            </Link>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 ">
                            <span
                              className={`px-2 py-1 text-sm font-medium rounded-md ${
                                record.status === "Pending"
                                  ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                                  : record.status === "Selected"
                                  ? "bg-green-50 text-green-700 hover:bg-green-100"
                                  : "bg-red-50 text-red-700 hover:bg-red-100"
                              }`}
                            >
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default JobApplicants;
