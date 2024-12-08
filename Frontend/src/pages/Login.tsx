import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import InputType from "../components/shared/InputType";
import Layout from "../components/shared/Layout/Layout";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import { responseToast } from "../utils/features";

const Login = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const res = await login({
        name,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role,
        dob: date,
        _id: user.uid,
      });
      responseToast(res, navigate, "/home");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Sign in Fail");
    }
  };
  return (
    <Layout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8 mb-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-6 text-center text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <InputType
            id="name"
            name="name"
            placeholder="Enter your name"
            type="text"
            value={name}
            required
            autoComplete="off"
            label="Name"
            labelFor="name"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex flex-col items-start space-y-2">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Choose Role</option>
              <option value="user">Candidate</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>
          <div className="flex flex-col items-start space-y-2">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Choose Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <InputType
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            id="date"
            name="date"
            label="Date of Birth"
            labelFor="date"
          />

          <p className="mt-10 text-center text-sm text-gray-500">
            Already Sign in Once
          </p>
          <div>
            <button
              onClick={loginHandler}
              className="flex w-full justify-center items-center space-x-3 rounded-md bg-white p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 border border-gray-300"
            >
              <FcGoogle className="h-6 w-6" />
              <span className="text-black">Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
