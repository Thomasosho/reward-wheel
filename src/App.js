import React, { useState, useEffect } from 'react';
import NewWheel from './NewWheel';
import { createRoot } from 'react-dom/client';

const RewardWidget = ({ settings }) => {
  const [rewards, setRewards] = useState(settings.rewardOptions || []);

  useEffect(() => {
    setRewards(settings.rewardOptions || []);
  }, [settings]);

  if (!settings || !settings.rewardOptions) {
    return <div>Error: Invalid settings</div>;
  }

  return (
    <div>
      <h1>{settings.nameOfReward}</h1>
      <NewWheel rewardList={rewards} />
    </div>
  );
};

export default RewardWidget;

window.renderRewardWidget = (settings, containerId) => {
  console.log('renderRewardWidget called', settings, containerId);
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<RewardWidget settings={settings} />);
  } else {
    console.error('Container not found');
  }
};
