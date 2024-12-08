import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Layout from "../components/shared/Layout/Layout";

const resumeTips = {
  bestPractices: [
    "Keep it concise and relevant",
    "Use action verbs to describe achievements",
    "Include quantifiable results",
    "Customize for each job application",
    "Proofread thoroughly",
  ],
  commonMistakes: [
    "Including irrelevant information",
    "Using generic descriptions",
    "Having spelling and grammar errors",
    "Making it too long",
    "Using an unprofessional email address",
  ],
  sections: [
    {
      title: "Professional Summary",
      description:
        "A brief overview of your professional background and key achievements.",
      example:
        "Results-driven software engineer with 5+ years of experience in full-stack development...",
    },
    {
      title: "Work Experience",
      description:
        "Highlight your relevant work experience and accomplishments.",
      example:
        "Led a team of 4 developers to successfully deliver a client project ahead of schedule...",
    },
    {
      title: "Skills",
      description: "List technical and soft skills relevant to the position.",
      example:
        "Technical: React, Node.js, TypeScript | Soft Skills: Leadership, Communication",
    },
  ],
};

const ResumeTips = () => {
  return (
    <Layout>
      <div className="wrapper py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resume Writing Tips
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn how to create a compelling resume that stands out to employers
            and showcases your skills effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
              Best Practices
            </h2>
            <ul className="space-y-3">
              {resumeTips.bestPractices.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <XCircleIcon className="h-6 w-6 text-red-500 mr-2" />
              Common Mistakes to Avoid
            </h2>
            <ul className="space-y-3">
              {resumeTips.commonMistakes.map((mistake, index) => (
                <li key={index} className="flex items-start">
                  <XCircleIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Key Resume Sections
          </h2>
          <div className="space-y-8">
            {resumeTips.sections.map((section) => (
              <div
                key={section.title}
                className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
              >
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-600 mb-3">{section.description}</p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700 font-medium">Example:</p>
                  <p className="text-gray-600 italic">{section.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResumeTips;
