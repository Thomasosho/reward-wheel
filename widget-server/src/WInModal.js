import React from 'react';
import styled from 'styled-components';

// Styled Components for Modal
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

const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  position: relative; /* Ensure that the close button is positioned relative to this container */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #696f79;
  &:hover {
    color: #000; /* Optional: Change color on hover */
  }
`;

const Title = styled.h2`
  font-size: 24px;
  color: #28a745;
  margin-bottom: 15px;
`;

const Message = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px; /* Optional: Add margin to space out the buttons */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const WinningModal = ({ onClose, rewardName, claimReward, winTitle, winDescription, winPrimaryButton, winSecondaryButton }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>{winTitle}</Title>
        <Message>{winDescription}</Message>
        <ButtonContainer>
            <Button onClick={claimReward}>{winPrimaryButton}</Button>
            <Button onClick={claimReward}>{winSecondaryButton}</Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default WinningModal;
