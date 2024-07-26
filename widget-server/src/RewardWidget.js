import React, { useState, useEffect } from 'react';
import NewWheel from './NewWheel';

const RewardWidget = ({ settings }) => {
  const [rewards, setRewards] = useState(settings.rewardOptions || []);

  useEffect(() => {
    setRewards(settings.rewardOptions || []);
  }, [settings]);

  if (!settings || !settings.rewardOptions) {
    return <div style={{ color: 'red', fontWeight: 'bold' }}>Error: Invalid settings</div>;
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{ 
        textAlign: 'center', 
        padding: '20px', 
        border: '1px solid #ccc', 
        borderRadius: '10px', 
        backgroundColor: '#fff'
      }}>
        <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>{settings.nameOfReward}</h1>
        <NewWheel rewardList={rewards} />
      </div>
    </div>
  );
};

export default RewardWidget;
