import React, { useState } from 'react';
import styled from 'styled-components';
// import { toast } from 'sonner';

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
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 600px;
  width: auto;
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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ClaimImage = styled.img`
  transform: scale(0.6);
  margin-bottom: 14px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #e5e9eb;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
`;

const Label = styled.label`
  color: #696f79;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 1px;
  margin-bottom: 2px;
`;

const Input = styled.input`
  padding-left: 10px;
  background: white;
  border: 1px solid #dde0eb;
  border-radius: 0.375rem;
  padding: 10px;
  width: 85%;
`;

const SubmitButton = styled.button`
  background-color: #f15822;
  color: white;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  margin-top: 10px;
  cursor: pointer;
  opacity: ${props => (props.disabled ? '0.6' : '1')};
`;

const Title = styled.h2`
  font-size: 24px;
  color: #28a745;
  margin-bottom: 15px;
`;

// Component
const ClaimModal = ({ onClose, claimData }) => {
  const [formState, setFormState] = useState({
    fullName: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleClaimReward = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.rewardclan.com/api/v1/customer/add-winners/${claimData?.RewardId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          index: claimData?.index,
          rewardOptionDesc: claimData?.OptionDescription,
          fullName: formState.fullName,
          email: formState.email,
          sessionId: claimData?.sessionId
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Reward claimed successfully:', result);
        // toast.success('Reward claimed successfully');
        onClose();
      } else {
        const errorText = await response.text();
        console.error('Failed to claim reward:', errorText);
        // toast.error('Failed to claim reward. Please try again.');
      }
    } catch (error) {
      console.error('Error claiming reward:', error);
    //   toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalOverlay onClick={() => onClose()}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => onClose()}>&times;</CloseButton>
        <FormContainer>
          <Title>Claim Reward</Title>
          <Form onSubmit={(e) => e.preventDefault()}>
            <div>
              <Label htmlFor='name'>Full Name</Label>
              <Input
                value={formState.fullName}
                type="text"
                id="name"
                placeholder="Enter your full name"
                onChange={(e) => setFormState(prev => ({
                  ...prev, fullName: e.target.value
                }))}
              />
            </div>
            <div>
              <Label htmlFor='email'>Email Address</Label>
              <Input
                value={formState.email}
                type="email"
                id="email"
                placeholder="name@mail.com"
                onChange={(e) => setFormState(prev => ({
                  ...prev, email: e.target.value
                }))}
              />
            </div>
            <SubmitButton
              type="button"
              disabled={isLoading}
              onClick={handleClaimReward}
            >
              {isLoading ? 'Claiming...' : 'Claim Reward'}
            </SubmitButton>
          </Form>
        </FormContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ClaimModal;
