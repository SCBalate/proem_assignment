import { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';

const Step4Schedule = () => {
  const { campaignData, updateStepData, goToStep } = useCampaign();

  const [sendNow, setSendNow] = useState(campaignData.schedule.sendNow ?? true);
  const [scheduledAt, setScheduledAt] = useState(
    campaignData.schedule.scheduledAt || ''
  );
  const [error, setError] = useState('');

  const isValidSchedule = () => {
    if (sendNow) return true;
    if (!scheduledAt) {
      setError('Please select a valid future date and time.');
      return false;
    }

    const selectedTime = new Date(scheduledAt).getTime();
    const now = Date.now();
    if (selectedTime <= now) {
      setError('Scheduled time must be in the future.');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!isValidSchedule()) return;

    updateStepData('schedule', {
      sendNow,
      scheduledAt: sendNow ? '' : scheduledAt,
    });

    goToStep(5);
  };

  const handleBack = () => {
    goToStep(3);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-semibold mb-2">Schedule</label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="schedule"
              checked={sendNow}
              onChange={() => setSendNow(true)}
            />
            <span>Send Now</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="schedule"
              checked={!sendNow}
              onChange={() => setSendNow(false)}
            />
            <span>Schedule Later</span>
          </label>
        </div>
      </div>

      {!sendNow && (
        <div>
          <label className="block font-semibold mb-1">Pick Date & Time</label>
          <input
            type="datetime-local"
            className="w-full border px-3 py-2 rounded  bg-white dark:bg-gray-800 dark:text-white"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
          />
          {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
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
          disabled={!sendNow && !scheduledAt}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step4Schedule;
