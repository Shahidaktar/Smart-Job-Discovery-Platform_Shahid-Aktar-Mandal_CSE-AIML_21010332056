import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Layout from "../components/shared/Layout/Layout";

interface SalaryDetails {
  basic: number;
  hra: number;
  da: number;
  specialAllowance: number;
  pf: number;
  professionalTax: number;
  incomeTax: number;
  netSalary: number;
}

const SalaryCalculator = () => {
  const [basicSalary, setBasicSalary] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [salaryDetails, setSalaryDetails] = useState<SalaryDetails | null>(
    null
  );

  const calculateSalary = () => {
    const basic = parseFloat(basicSalary);
    if (isNaN(basic)) return;

    const hra = basic * 0.4;
    const da = basic * 0.1;
    const specialAllowance = basic * 0.2;
    const pf = Math.min(basic * 0.12, 1800);
    const professionalTax = 200;
    const grossSalary = basic + hra + da + specialAllowance;
    let incomeTax = 0;
    if (grossSalary * 12 > 500000) {
      incomeTax = grossSalary * 0.1;
    }

    const netSalary = grossSalary - (pf + professionalTax + incomeTax);

    setSalaryDetails({
      basic,
      hra,
      da,
      specialAllowance,
      pf,
      professionalTax,
      incomeTax,
      netSalary,
    });
  };

  return (
    <Layout>
      <div className="wrapper py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Salary Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your take-home salary and understand your salary structure
            with our comprehensive salary calculator.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Enter Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Basic Salary (Monthly)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CurrencyRupeeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={basicSalary}
                    onChange={(e) => setBasicSalary(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter basic salary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter years of experience"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select location</option>
                  <option value="metro">Metro City</option>
                  <option value="tier2">Tier 2 City</option>
                  <option value="tier3">Tier 3 City</option>
                </select>
              </div>

              <button
                onClick={calculateSalary}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Calculate Salary
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Salary Breakdown
            </h2>
            {salaryDetails ? (
              <div className="space-y-4">
                <SalaryItem label="Basic Salary" value={salaryDetails.basic} />
                <SalaryItem label="HRA" value={salaryDetails.hra} />
                <SalaryItem label="DA" value={salaryDetails.da} />
                <SalaryItem
                  label="Special Allowance"
                  value={salaryDetails.specialAllowance}
                />
                <div className="border-t border-gray-200 my-4"></div>
                <SalaryItem
                  label="PF Deduction"
                  value={salaryDetails.pf}
                  isDeduction
                />
                <SalaryItem
                  label="Professional Tax"
                  value={salaryDetails.professionalTax}
                  isDeduction
                />
                <SalaryItem
                  label="Income Tax"
                  value={salaryDetails.incomeTax}
                  isDeduction
                />
                <div className="border-t border-gray-200 my-4"></div>
                <SalaryItem
                  label="Net Salary"
                  value={salaryDetails.netSalary}
                  isTotal
                />
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Enter your details to see the salary breakdown
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const SalaryItem = ({
  label,
  value,
  isDeduction = false,
  isTotal = false,
}: {
  label: string;
  value: number;
  isDeduction?: boolean;
  isTotal?: boolean;
}) => (
  <div
    className={`flex justify-between items-center ${
      isTotal ? "font-semibold" : ""
    }`}
  >
    <span className="text-gray-700">{label}</span>
    <span
      className={`${
        isDeduction
          ? "text-red-600"
          : isTotal
          ? "text-blue-600"
          : "text-gray-900"
      }`}
    >
      ₹{value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
    </span>
  </div>
);

export default SalaryCalculator;
