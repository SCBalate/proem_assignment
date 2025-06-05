import { useState ,useEffect} from 'react';
import { useCampaign } from '../context/CampaignContext';

export default function Step1CampaignInfo() {
  const { updateStepData, goToStep,campaignData } = useCampaign();
  const [form, setForm] = useState({ name: '', description: '' });
  const [error, setError] = useState('');

   useEffect(() => {
    if (campaignData.info) {
      setForm(campaignData.info);
    }
  }, [campaignData.info]);

  const handleNext = () => {
    if (!form.name.trim()) {
      setError('Campaign Name is required');
      return;
    }
    updateStepData('info', form);
    goToStep(2);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-semibold">Campaign Name *</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded  bg-white dark:bg-gray-800 dark:text-white"
   

          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
      <div>
        <label className="block font-semibold">Campaign Description</label>
        <textarea
          className="w-full border px-3 py-2 rounded  bg-white dark:bg-gray-800 dark:text-white"
          rows="3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
