import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import RewardWidget from './App';

const initializeWidget = () => {
  const defaultSettings = {
    nameOfReward: 'Default Reward Name',
    rewardOptions: [
      { id: 1, description: 'Default Reward 1' },
      { id: 2, description: 'Default Reward 2' }
    ]
  };
  const defaultContainerId = 'default-container';

  // Use settings from the window object if available
  const settings = window.rewardWidgetSettings || defaultSettings;
  const containerId = window.rewardWidgetContainerId || defaultContainerId;

  console.log('Settings:', settings);
  console.log('Container ID:', containerId);

  const container = document.getElementById(containerId);

  if (container) {
    const widgetRoot = createRoot(container);
    widgetRoot.render(<RewardWidget settings={settings} />);
  } else {
    console.error('Container not found');
  }
};

// Initialize on script load
document.addEventListener('DOMContentLoaded', initializeWidget);
reportWebVitals();
