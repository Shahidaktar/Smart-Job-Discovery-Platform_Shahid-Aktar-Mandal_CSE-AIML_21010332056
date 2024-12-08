import {
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Layout from "../components/shared/Layout/Layout";

const interviewData = {
  preparation: [
    "Research the company thoroughly",
    "Review the job description",
    "Practice common interview questions",
    "Prepare relevant examples of your work",
    "Plan your interview outfit",
  ],
  commonQuestions: [
    {
      question: "Tell me about yourself",
      tips: "Focus on professional background and relevant achievements",
      example: "I'm a software developer with 3 years of experience...",
    },
    {
      question: "Why do you want to work here?",
      tips: "Show knowledge of company and alignment with values",
      example: "I'm impressed by your company's innovative approach to...",
    },
    {
      question: "What are your strengths and weaknesses?",
      tips: "Be honest and show self-awareness",
      example: "One of my strengths is problem-solving...",
    },
  ],
  types: [
    {
      name: "Behavioral",
      description: "Questions about past experiences and behaviors",
      example: "Tell me about a time when you faced a challenging situation...",
    },
    {
      name: "Technical",
      description: "Questions testing technical knowledge and skills",
      example: "How would you optimize this database query?",
    },
    {
      name: "Situational",
      description: "Hypothetical scenarios to assess problem-solving",
      example: "What would you do if a team member isn't contributing?",
    },
  ],
};

const InterviewGuide = () => {
  const [selectedType, setSelectedType] = useState(interviewData.types[0]);

  return (
    <Layout>
      <div className="wrapper py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interview Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master your next interview with our comprehensive guide covering
            preparation tips, common questions, and expert advice.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <ClockIcon className="h-7 w-7 text-blue-600 mr-3" />
            Interview Preparation Checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interviewData.preparation.map((step, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                  {index + 1}
                </div>
                <span className="text-gray-700">{step}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <ChatBubbleLeftRightIcon className="h-7 w-7 text-blue-600 mr-3" />
            Common Interview Questions
          </h2>
          <div className="space-y-6">
            {interviewData.commonQuestions.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
              >
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600 mb-3">Tip: {item.tips}</p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700">
                    <span className="font-medium">Example Answer: </span>
                    {item.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <BriefcaseIcon className="h-7 w-7 text-blue-600 mr-3" />
            Types of Interviews
          </h2>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-wrap gap-4 mb-6">
              {interviewData.types.map((type) => (
                <button
                  key={type.name}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedType.name === type.name
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                {selectedType.name} Interviews
              </h3>
              <p className="text-gray-600 mb-4">{selectedType.description}</p>
              <div className="bg-white p-4 rounded-md border border-gray-200">
                <p className="text-gray-700">
                  <span className="font-medium">Example Question: </span>
                  {selectedType.example}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewGuide;
