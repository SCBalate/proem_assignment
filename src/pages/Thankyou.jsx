import { useEffect, useRef } from "react";
import { useCampaign } from "../context/CampaignContext";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const { goToStep } = useCampaign();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-center px-4">
      <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Thank You!
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Your campaign has been submitted successfully. You can now create a
          new one or exit the wizard.
        </p>
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            goToStep(1);
            navigate("/");
          }}
        >
          Create New Campaign
        </button>
      </div>
    </div>
  );
}
