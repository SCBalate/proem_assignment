import { useState } from "react";
import { useCampaign } from "../context/CampaignContext";

const Step2AudienceSegment = () => {
  const { campaignData, updateStepData, goToStep } = useCampaign();
  const [type, setType] = useState(campaignData.audience.type || "All");
  const [filters, setFilters] = useState({
    platform: [],
    country: "",
    signupDate: { from: "", to: "" },
  });

  const handleCheckboxChange = (platform) => {
    setFilters((prev) => ({
      ...prev,
      platform: prev.platform.includes(platform)
        ? prev.platform.filter((p) => p !== platform)
        : [...prev.platform, platform],
    }));
  };

  const handleNext = () => {
    const audience = type === "Custom" ? { type, filters } : { type };
    updateStepData("audience", audience);
    goToStep(3);
  };

  const handleBack = () => {
    goToStep(1);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-semibold mb-2">
          Select Audience Segment
        </label>
        {["All", "New", "Inactive", "Custom"].map((option) => (
          <div key={option} className="mb-1">
            <label className="inline-flex items-center space-x-2">
              <input
                type="radio"
                name="audienceType"
                value={option}
                checked={type === option}
                onChange={() => setType(option)}
              />
              <span>{option} Users</span>
            </label>
          </div>
        ))}
      </div>

      {type === "Custom" && (
        <div className="space-y-4 border-t pt-4">
          <div>
            <label className="block font-semibold mb-1">Platform</label>
            {["Web", "Android", "iOS"].map((p) => (
              <label key={p} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  value={p}
                  checked={filters.platform.includes(p)}
                  onChange={() => handleCheckboxChange(p)}
                />
                <span className="ml-1">{p}</span>
              </label>
            ))}
          </div>

          <div>
            <label className="block font-semibold mb-1">Country</label>
            <input
              type="text"
              placeholder="Enter country"
              className="w-full border px-3 py-2 rounded  bg-white dark:bg-gray-800 dark:text-white"
              value={filters.country}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, country: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Signup Date Range
            </label>
            <div className="flex space-x-2">
              <input
                type="date"
                className="border px-3 py-2 rounded w-full  bg-white dark:bg-gray-800 dark:text-white"
                value={filters.signupDate.from}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    signupDate: { ...prev.signupDate, from: e.target.value },
                  }))
                }
              />
              <input
                type="date"
                className="border px-3 py-2 rounded w-full  bg-white dark:bg-gray-800 dark:text-white"
                value={filters.signupDate.to}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    signupDate: { ...prev.signupDate, to: e.target.value },
                  }))
                }
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2AudienceSegment;
