import { FaBriefcase, FaBuilding, FaSearch, FaUserTie } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/shared/Layout/Header";
import { RootState } from "../redux/store";

const Landing = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} />
      <div className="flex-grow bg-gradient-to-b from-blue-50 to-white">
        <section className="container mx-auto px-6 py-16 text-center md:py-24">
          <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
            Find Your Dream Job Today
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            Connect with top employers and discover opportunities that match
            your skills
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
            <Link
              to="/home"
              className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Jobs
            </Link>
            <Link
              to="/home"
              className="rounded-lg border border-blue-600 bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Upload Resume
            </Link>
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="container mx-auto px-6">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Why Choose Our Platform
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<FaSearch className="h-8 w-8 text-blue-600" />}
                title="Smart Job Search"
                description="Advanced filters to find the perfect job match"
              />
              <FeatureCard
                icon={<FaBriefcase className="h-8 w-8 text-blue-600" />}
                title="Latest Opportunities"
                description="Access to thousands of new job postings daily"
              />
              <FeatureCard
                icon={<FaUserTie className="h-8 w-8 text-blue-600" />}
                title="Career Growth"
                description="Professional development resources and guidance"
              />
              <FeatureCard
                icon={<FaBuilding className="h-8 w-8 text-blue-600" />}
                title="Top Companies"
                description="Connect with leading employers worldwide"
              />
            </div>
          </div>
        </section>
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-6">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Popular Job Categories
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobCategories.map((category) => (
                <div
                  key={category.title}
                  className="rounded-lg bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {category.title}
                  </h3>
                  <p className="text-gray-600">
                    {category.count} open positions
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-blue-600 py-16 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="mb-6 text-3xl font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="mb-8 text-lg">
              Join thousands of professionals who found their dream jobs through
              our platform
            </p>
            <Link
              to="/login"
              className="inline-block rounded-lg bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition hover:bg-gray-100"
            >
              Get Started Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const jobCategories = [
  { title: "Technology & IT", count: "1,234" },
  { title: "Marketing & Sales", count: "867" },
  { title: "Design & Creative", count: "543" },
  { title: "Finance & Banking", count: "432" },
  { title: "Healthcare", count: "765" },
  { title: "Education", count: "321" },
];

export default Landing;
