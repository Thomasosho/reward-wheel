import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import NewWheel from './NewWheel';
import WinningModal from './WInModal';
import ClaimModal from './ClaimModal';
import LoseModal from './LoseModal';

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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  z-index: 10000;
`;

const RewardWidgetContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: transparent;
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
  marginBottom: 80px;
`;

const RewardWidget = ({ settings }) => {
  const [rewards, setRewards] = useState(settings.rewardOptions || []);
  const [isOpen, setIsOpen] = useState(false);
  const [congratsModal, setCongratsModal] = useState(false);
  const [claimModal, setClaimModal] = useState(false);
  const [loseModal, setLoseModal] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [claimData, setClaimData] = useState(null);
  const wheelRef = useRef(null);

  console.log('settings', settings);

  // Use a single effect for setting rewards
  useEffect(() => {
    setRewards(settings.rewardOptions || []);
  }, [settings]);

  // Handle page load, exit, and time-based triggers in a single effect
  useEffect(() => {
    if (settings.isOnPageLoad) {
      setIsOpen(true);
    }

    const handleExit = (e) => {
      e.preventDefault();
      if (settings.isOnExit) {
        setIsOpen(true);
      }
    };

    if (settings.isOnExit) {
      window.addEventListener('beforeunload', handleExit);
    }

    if (settings.seconds) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, settings.seconds * 1000);
      return () => clearTimeout(timer);
    }

    if (settings.days) {
      const daysInMs = settings.days * 24 * 60 * 60 * 1000;
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, daysInMs);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeunload', handleExit);
    };
  }, [settings]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const result = {
    "index": 3,
    "OptionDescription": "Cutlass",
    "RewardId": "997bd139-7e8d-4da8-acb0-32f0995f1641",
    "sessionId": "df3fca63-f4d8-417d-819e-cdf82aa3cb12"
  }

  // const handleSpinClick = async () => {
  //   setIsSpinning(true);
  //   if (wheelRef.current) {
  //     wheelRef.current.spinWheel();
  //   }
  //   try {
  //     const response = await fetch(`https://api.rewardclan.com/api/v1/widget/spin?id=${settings.rewardId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       setClaimData(result);
  //       console.log('Spin result:', result);
  //     } else {
  //       const error = await response.text();
  //       console.error('Error:', error);
  //       setIsSpinning(false);
  //     }
  //   } catch (error) {
  //     console.error('Fetch error:', error.message);
  //     setIsSpinning(false);
  //   } finally {
  //     setIsSpinning(false);
  //   }
  // };

  const handleSpinUPDATE= async () => {
    try {
      const response = await fetch(`https://api.rewardclan.com/api/v1/widget/update-spinner?rewardId?id=${settings.rewardId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setRewards(result);
      } else {
        const error = await response.text();
        console.error('Error:', error);
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
    }
  };

  const handleSpinClick = async () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Start spinning immediately
    if (wheelRef.current) {
      wheelRef.current.startSpinning();
    }

    try {
      const response = await fetch(`https://api.rewardclan.com/api/v1/widget/spin?id=${settings.rewardId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setClaimData(result);
        console.log('Spin result:', result);
        await handleSpinUPDATE();
        if (wheelRef.current) {
          wheelRef.current.stopSpinning(result.index);
        }
      } else {
        const error = await response.text();
        console.error('Error:', error);
        setIsSpinning(false);
        if (wheelRef.current) {
          wheelRef.current.stopSpinning();
        }
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
      setIsSpinning(false);
      if (wheelRef.current) {
        wheelRef.current.stopSpinning();
      }
    } finally {
      // if (wheelRef.current) {
      //   wheelRef.current.stopSpinning();
      // }
      setIsSpinning(false);
    }
  };

  useEffect(() => {
    if (claimData) {
      if (claimData.isWinner) {
        setCongratsModal(true);
      } else {
        setLoseModal(true);
      }
    }
  }, [claimData]);

  const handleSelectReward = (selectedReward) => {
    console.log('Selected reward:', selectedReward);
    // setClaimModal(true);
  };

  const handleCloseModal = () => {
    setLoseModal(false);
    setCongratsModal(true);
  };

  const handleCongratsModal = () => {
    setCongratsModal(false);
    setClaimModal(true);
  };

  const handleCloseClaimModal = () => {
    setCongratsModal(false);
    setLoseModal(false);
    setClaimModal(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay onClick={handleCloseModal}>
      <CloseButton onClick={handleClose}>&times;</CloseButton>
      <Modal onClick={(e) => e.stopPropagation()}>
        <RewardWidgetContainer onClick={(e) => e.stopPropagation()}>
          {settings.nameOfReward && <RewardTitle>{settings.nameOfReward}</RewardTitle>}
          {settings.image && <RewardImage src={settings.image} alt={settings.nameOfReward} />}
          <NewWheel
            rewardList={rewards}
            ref={wheelRef}
            onSelectReward={handleSelectReward}
            pointer={settings.pointer}
            primaryColor={settings.primaryColor}
            secondaryColor={settings.secondaryColor}
            textColor={settings.textColor}
            selectedFont={settings.selectedFont}
          />
          <SpinButton onClick={handleSpinClick} disabled={isSpinning}>
            {isSpinning ? 'Spinning...' : 'Spin Now'}
          </SpinButton>
          {settings.poweredBy && <PoweredByImage src={settings.poweredBy} alt={settings.nameOfReward} />}
        </RewardWidgetContainer>

        {congratsModal && (
          <WinningModal
            onClose={handleCongratsModal}
            rewardName={claimData?.rewardName}
            claimReward={() => setClaimModal(true)}
            winTitle={settings.winTitle}
            winDescription={settings.winDescription}
            winPrimaryButton={settings.winPrimaryButton}
            winSecondaryButton={settings.winSecondaryButton}
          />
        )}

        {claimModal && (
          <ClaimModal
            onClose={handleCloseClaimModal}
            rewardName={claimData?.rewardName}
          />
        )}

        {loseModal && (
          <LoseModal
            onClose={handleCloseModal}
            loseTitle={settings.loseTitle}
            loseDescription={settings.loseDescription}
            losePrimaryButton={settings.losePrimaryButton}
            loseSecondaryButton={settings.loseSecondaryButton}
          />
        )}
      </Modal>
    </ModalOverlay>
  );
};

export default RewardWidget;
