import {
  AcademicCapIcon,
  BriefcaseIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import Layout from "../components/shared/Layout/Layout";

const careerAdviceData = [
  {
    title: "Career Planning",
    icon: LightBulbIcon,
    articles: [
      {
        title: "How to Choose the Right Career Path",
        content:
          "Understanding your interests, skills, and values is crucial...",
      },
      {
        title: "Setting Career Goals",
        content: "Learn how to set SMART career goals...",
      },
    ],
  },
  {
    title: "Industry Insights",
    icon: BriefcaseIcon,
    articles: [
      {
        title: "Emerging Tech Trends",
        content: "Stay updated with the latest technology trends...",
      },
      {
        title: "Growing Industries in 2024",
        content: "Discover which industries are experiencing rapid growth...",
      },
    ],
  },
  {
    title: "Professional Development",
    icon: AcademicCapIcon,
    articles: [
      {
        title: "Continuous Learning",
        content: "Tips for staying relevant in your field...",
      },
      {
        title: "Networking Strategies",
        content: "Build and maintain professional relationships...",
      },
    ],
  },
];

const CareerAdvice = () => {
  return (
    <Layout>
      <div className="wrapper py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Career Advice
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert guidance and insights to help you navigate your career path
            and achieve your professional goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careerAdviceData.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <section.icon className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">
                  {section.title}
                </h2>
              </div>
              <div className="space-y-4">
                {section.articles.map((article) => (
                  <div
                    key={article.title}
                    className="border-b border-gray-100 pb-4 last:border-0"
                  >
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600">{article.content}</p>
                    <button className="mt-2 text-blue-600 hover:text-blue-800 font-medium">
                      Read more →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CareerAdvice;
