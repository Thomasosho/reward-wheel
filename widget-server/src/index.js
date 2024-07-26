import React from 'react';
import ReactDOM from 'react-dom';
import RewardWidget from './RewardWidget';

window.renderRewardWidget = (settings, containerId) => {
  const container = document.getElementById(containerId);
  if (container) {
    ReactDOM.render(<RewardWidget settings={settings} />, container);
  } else {
    console.error('Container not found');
  }
};
