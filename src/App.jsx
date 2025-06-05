import ThemeToggle from './components/ThemeToggle';
import { useCampaign } from './context/CampaignContext';
import Step1CampaignInfo from './components/Step1CampaignInfo';
import Step2AudienceSegment from './components/Step2AudienceSegment';
import Step3MessageEditor from './components/Step3MessageEditor';
import Step4Schedule from './components/Step4Schedule';
import Step5Review from './components/Step5Review';

export default function App() {
  const { campaignData } = useCampaign();

  const renderStep = () => {
    switch (campaignData.step) {
      case 1: return <Step1CampaignInfo />;
      case 2: return <Step2AudienceSegment />;
      case 3: return <Step3MessageEditor />;
      case 4: return <Step4Schedule />;
      case 5: return <Step5Review />;
      default: return <Step1CampaignInfo />;
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6 text-gray-900 dark:text-gray-100 shadow bg-white dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🎯 Campaign Builder</h1>
        <ThemeToggle />
      </div>
      {renderStep()}
    </main>
  );
}
