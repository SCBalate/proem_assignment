import { createContext, useContext, useEffect, useState } from "react";

const CampaignContext = createContext();

export const useCampaign = () => useContext(CampaignContext);

const LOCAL_KEY = "campaignBuilderData";

const defaultData = {
  step: 1,
  info: { name: "", description: "" },
  audience: { type: "All" },
  message: { channel: "Email", content: "" },
  schedule: { sendNow: true, scheduledAt: "" },
};

export const CampaignProvider = ({ children }) => {
  const [campaignData, setCampaignData] = useState(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    return stored ? JSON.parse(stored) : defaultData;
  });

  // Persist campaignData to localStorage on every change
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(campaignData));
  }, [campaignData]);

  const updateStepData = (key, data) => {
    setCampaignData((prev) => ({ ...prev, [key]: data }));
  };

  const goToStep = (step) => {
    setCampaignData((prev) => ({ ...prev, step }));
  };

  const resetCampaign = () => {
    localStorage.removeItem(LOCAL_KEY);
    setCampaignData(defaultData);
  };

  return (
    <CampaignContext.Provider
      value={{ campaignData, updateStepData, goToStep, resetCampaign }}
    >
      {children}
    </CampaignContext.Provider>
  );
};
