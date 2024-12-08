import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/shared/Layout/AdminLayout";

import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateApplyMutation } from "../../redux/api/ApplyAPI";
import { RootState } from "../../redux/store";
import { responseToast } from "../../utils/features";

const Apply = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const params = useParams();
  const [updateApply] = useUpdateApplyMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      id: params.id!,
      status: status,
    };
    const res = await updateApply({ user: user?._id, data });

    responseToast(res, navigate, "/admin/applications");
  };

  return (
    <AdminLayout>
      <form onSubmit={submitHandler}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-14 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Change Status
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
            <div className="flex flex-col items-start space-y-2">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="status"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                autoComplete="off"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="Pending">Pending</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center items-center space-x-3 rounded-md bg-green-600 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  border "
              >
                <span className="">Update </span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default Apply;
