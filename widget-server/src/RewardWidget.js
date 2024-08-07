import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import NewWheel from './NewWheel';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const RewardWidgetContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  flex-direction: column;
`;

const RewardTitle = styled.h1`
  color: #fff;
  font-size: 24px;
  margin-bottom: 20px;
`;

const RewardImage = styled.img`
  max-width: 15%;
  height: auto;
  margin-bottom: 20px;
  animation: ${pulse} 1s ease-in-out 7;
`;

const SpinButton = styled.button`
  width: 162px;
  height: 54px;
  padding: 15px 20px 15px 25px;
  gap: 8px;
  border-radius: 10px;
  opacity: 1;
  background-color: #F15822;
  color: #fff;
  border: none;
  margin-top: 20px;
  margin-bottom: 40px;
  cursor: pointer;
`;

const PoweredByImage = styled.img`
  width: 190px; 
  height: auto; 
  marginBottom: 40px;
`;

const RewardWidget = ({ settings }) => {
  const [rewards, setRewards] = useState(settings.rewardOptions || []);
  const wheelRef = useRef(null);

  const handleSelectReward = (selectedReward) => {
    console.log('Selected reward:', selectedReward);
  };

  useEffect(() => {
    setRewards(settings.rewardOptions || []);
  }, [settings]);

  const handleSpinClick = () => {
    if (wheelRef.current) {
      wheelRef.current.spinWheel();
    }
  };

  if (!settings || !settings.rewardOptions) {
    return <div style={{ color: 'red', fontWeight: 'bold' }}>Error: Invalid settings</div>;
  }

  return (
    <RewardWidgetContainer>
      {settings.nameOfReward && <RewardTitle>{settings.nameOfReward}</RewardTitle>}
      {settings.image && <RewardImage src={settings.image} alt={settings.nameOfReward} />}
      <NewWheel rewardList={rewards} ref={wheelRef} onSelectReward={handleSelectReward} pointer={settings.pointer} />
      <SpinButton onClick={handleSpinClick}>Spin Now</SpinButton>
      {settings.poweredBy && <PoweredByImage src={settings.poweredBy} alt={settings.nameOfReward} />}
    </RewardWidgetContainer>
  );
};

export default RewardWidget;
