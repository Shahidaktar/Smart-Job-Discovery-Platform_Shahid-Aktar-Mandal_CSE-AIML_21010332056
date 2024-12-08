import { onAuthStateChanged } from "firebase/auth";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/protectedRoute";
import Footer from "./components/shared/Layout/Footer";
import { auth } from "./firebase";
import { getUser } from "./redux/api/userAPI";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { UserReducerInitialState } from "./types/reducer-types";

const Home = lazy(() => import("./pages/Home"));
const Landing = lazy(() => import("./pages/Landing"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const UploadResume = lazy(() => import("./pages/UploadResume"));
const Favorite = lazy(() => import("./pages/Favorite"));
const CareerAdvice = lazy(() => import("./pages/CareerAdvice"));
const ResumeTips = lazy(() => import("./pages/ResumeTips"));
const InterviewGuide = lazy(() => import("./pages/InterviewGuide"));
const SalaryCalculator = lazy(() => import("./pages/SalaryCalculator"));

const Job = lazy(() => import("./pages/admin/Job"));
const User = lazy(() => import("./pages/admin/User"));
const Apply = lazy(() => import("./pages/admin/Apply"));
const AddJob = lazy(() => import("./pages/admin/AddJob"));
const ManageJob = lazy(() => import("./pages/admin/ManageJob"));
const JobApplicants = lazy(() => import("./pages/admin/JobApplicants"));
const Applicant = lazy(() => import("./pages/admin/Applicant"));
const Applies = lazy(() => import("./pages/Applies"));
const Posts = lazy(() => import("./pages/Posts"));

const App = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      } else {
        dispatch(userNotExist());
      }
    });
  }, []);
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/posts" element={<Posts />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />

          {/* admin*/}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                adminOnly={true}
                admin={
                  user?.role === "admin" || user?.role === "recruiter"
                    ? true
                    : false
                }
              />
            }
          >
            <Route path="/admin/job" element={<Job />} />
            <Route path="/admin/job/new" element={<AddJob />} />
            <Route path="/admin/job/:id" element={<ManageJob />} />
            <Route
              path="/admin/job/applications/:id"
              element={<JobApplicants />}
            />
            <Route path="/admin/applications" element={<Applicant />} />
            <Route path="/admin/user" element={<User />} />
            <Route
              path="/admin/job/applications/status/:id"
              element={<Apply />}
            />
          </Route>

          {/* login needed*/}
          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/applies" element={<Applies />} />
            <Route path="/upload-resume" element={<UploadResume />} />
          </Route>

          <Route path="/career-advice" element={<CareerAdvice />} />
          <Route path="/resume-tips" element={<ResumeTips />} />
          <Route path="/interview-guide" element={<InterviewGuide />} />
          <Route path="/salary-calculator" element={<SalaryCalculator />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
