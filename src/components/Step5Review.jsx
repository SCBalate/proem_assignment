import { useCampaign } from "../context/CampaignContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Step5Review = () => {
  const {} = useCampaign();

  const { campaignData, goToStep, resetCampaign } = useCampaign();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    simulateSubmit()
      .then(() => {
        localStorage.removeItem("campaignBuilderData"); // cleanup
        setSubmitted(true);
        toast.success("🎉 Campaign submitted successfully!");
      })
      .then(() => {
        resetCampaign();
        navigate("/thank-you");
      })

      .catch(() => {
        toast.error("❌ Failed to submit campaign. Please try again.");
      });
  };

  const simulateSubmit = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = true;
        success ? resolve() : reject();
      }, 1000);
    });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString();
  };

  const personalizedPreview = campaignData.message.content.replace(
    /{{first_name}}/g,
    "John"
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Review Your Campaign</h2>

      <div className="border rounded p-4 space-y-2">
        <div>
          <strong>🟢 Campaign Info:</strong>
          <p>
            <strong>Name:</strong> {campaignData.info.name}
          </p>
          <p>
            <strong>Description:</strong> {campaignData.info.description || "-"}
          </p>
          <button
            className="text-blue-600 text-sm mt-1"
            onClick={() => goToStep(1)}
          >
            Edit
          </button>
        </div>

        <div>
          <strong>🟡 Audience:</strong>
          <p>
            <strong>Type:</strong> {campaignData.audience.type}
          </p>
          {campaignData.audience.type === "Custom" && (
            <>
              <p>
                <strong>Platform:</strong>{" "}
                {campaignData.audience.filters.platform.join(", ") || "-"}
              </p>
              <p>
                <strong>Country:</strong>{" "}
                {campaignData.audience.filters.country || "-"}
              </p>
              <p>
                <strong>Signup Date:</strong>{" "}
                {campaignData.audience.filters.signupDate.from || "-"} to{" "}
                {campaignData.audience.filters.signupDate.to || "-"}
              </p>
            </>
          )}
          <button
            className="text-blue-600 text-sm mt-1"
            onClick={() => goToStep(2)}
          >
            Edit
          </button>
        </div>

        <div>
          <strong>🔵 Message:</strong>
          <p>
            <strong>Channel:</strong> {campaignData.message.channel}
          </p>
          <p>
            <strong>Message:</strong>
          </p>
          <div className="border p-2 rounded bg-dark-50 whitespace-pre-wrap">
            {personalizedPreview || "-"}
          </div>
          <button
            className="text-blue-600 text-sm mt-1"
            onClick={() => goToStep(3)}
          >
            Edit
          </button>
        </div>

        <div>
          <strong>🟣 Schedule:</strong>
          <p>
            {campaignData.schedule.sendNow
              ? "Send Now"
              : `Scheduled At: ${formatDate(
                  campaignData.schedule.scheduledAt
                )}`}
          </p>
          <button
            className="text-blue-600 text-sm mt-1"
            onClick={() => goToStep(4)}
          >
            Edit
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          onClick={() => goToStep(4)}
        >
          Back
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleSubmit}
          disabled={submitted}
        >
          {submitted ? "Submitted ✅" : "Confirm & Submit"}
        </button>
      </div>
    </div>
  );
};

export default Step5Review;
