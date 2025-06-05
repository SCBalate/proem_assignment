import { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';

const Step3MessageEditor = () => {
  const { campaignData, updateStepData, goToStep } = useCampaign();

  const [channel, setChannel] = useState(campaignData.message.channel || 'Email');
  const [content, setContent] = useState(campaignData.message.content || '');
  const [mode, setMode] = useState('edit');

  const handleNext = () => {
    updateStepData('message', { channel, content });
    goToStep(4);
  };

  const handleBack = () => {
    goToStep(2);
  };

  const renderEditor = () => {
    if (channel === 'Email') {
      return (
        <textarea
          className="w-full border p-2 rounded h-40  bg-white dark:bg-gray-800 dark:text-white"
          placeholder="Write your Email message here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      );
    }

    return (
      <>
        {mode === 'edit' ? (
          <textarea
            className="w-full border p-2 rounded h-40  bg-white dark:bg-gray-800 dark:text-white"
            placeholder={`Type your ${channel} message here...`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <div className="border p-4 rounded  whitespace-pre-wrap bg-white dark:bg-gray-800 dark:text-white">
            {content || 'Nothing to preview'}
          </div>
        )}
        <div className="text-right mt-2 text-sm text-gray-600">
          Character Count: {content.length} / {channel === 'SMS' ? 160 : 1024}
        </div>
      </>
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Select Channel</label>
        <div className="flex space-x-4">
          {['Email', 'WhatsApp', 'SMS'].map((opt) => (
            <button
              key={opt}
              className={`px-4 py-2 rounded border ${
                channel === opt
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-black'
              }`}
              onClick={() => setChannel(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-1">Message</label>
        {renderEditor()}
      </div>

      {(channel === 'WhatsApp' || channel === 'SMS') && (
        <div className="flex justify-end gap-2">
          <button
            className={`px-3 py-1 text-sm rounded border ${
              mode === 'edit' ? 'bg-blue-600 text-white' : 'bg-white text-black'
            }`}
            onClick={() => setMode('edit')}
          >
            Edit
          </button>
          <button
            className={`px-3 py-1 text-sm rounded border  ${
              mode === 'preview' ? 'bg-blue-600 text-white' : 'bg-white text-black'
            }`}
            onClick={() => setMode('preview')}
          >
            Preview
          </button>
        </div>
      )}

      <div className="flex justify-between mt-4">
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

export default Step3MessageEditor;
