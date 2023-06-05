import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import NotificationLogo from '@/app/assets/images/NotificationLogo.png';
import NotificationMark from '@/app/assets/images/NotificationMark.png';

export const EmailNotification = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal280, setShowModal280] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const openModal280 = () => {
    setShowModal280(true);
  };

  return (
    <div>
     <ButtonContainer>
         <Button onClick={openModal}>600px Notification</Button>
         <Button onClick={openModal280}>280px Notification</Button>
     </ButtonContainer>
      {showModal && (
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <Link>
                <img src={NotificationLogo} alt="Mark" />
              </Link>
            </ModalHeader>
            <ModalContent>
              <ContentTitle>
                Hi {'{name}'},
              </ContentTitle>
              <ContentBody>
                New proposal {'{proposal name}'} is created... there are 2 days left to vote...
              </ContentBody>
              <ContentView>
                <p>View on Pioneer</p>
              </ContentView>
            </ModalContent>
            <ModalFooter>
              <FavIcon>
                <img src={NotificationMark} alt="NotificationMark" />
              </FavIcon>
              <FooterContent>
                <LinkRow>
                  <PioneerLink>
                    Pioneer.xyz
                  </PioneerLink>
                  |
                  <JoystreamLink>
                    Joystream.org
                  </JoystreamLink>
                </LinkRow>
                <DetailRow>
                  <CouncilLink>
                    Council
                  </CouncilLink>
                  <ProposalsLink>
                    Proposals
                  </ProposalsLink>
                  <ForumLink>
                    Forum
                  </ForumLink>
                </DetailRow>
                <UnsubscribeRow>
                  You can <u>unsubscribe</u> anytime.
                </UnsubscribeRow>
              </FooterContent>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      )}
      {showModal280 && (
        <ModalOverlay>
          <ModalContainer280>
            <ModalHeader280>
              <Link>
                <img src={NotificationLogo} alt="Mark" />
              </Link>
            </ModalHeader280>
            <ModalContent280>
              <ContentTitle280>
                Hi {'{name}'},
              </ContentTitle280>
              <ContentBody280>
                New proposal {'{proposal name}'} is created... there are 2 days left to vote...
              </ContentBody280>
              <ContentView>
                <p>View on Pioneer</p>
              </ContentView>
            </ModalContent280>
            <ModalFooter280>
              <FavIcon>
                <img src={NotificationMark} alt="NotificationMark" />
              </FavIcon>
              <FooterContent>
                <LinkRow>
                  <PioneerLink>
                    Pioneer.xyz
                  </PioneerLink>
                  |
                  <JoystreamLink>
                    Joystream.org
                  </JoystreamLink>
                </LinkRow>
                <DetailRow>
                  <CouncilLink>
                    Council
                  </CouncilLink>
                  <ProposalsLink>
                    Proposals
                  </ProposalsLink>
                  <ForumLink>
                    Forum
                  </ForumLink>
                </DetailRow>
                <UnsubscribeRow>
                  You can <u>unsubscribe</u> anytime.
                </UnsubscribeRow>
              </FooterContent>
            </ModalFooter280>
          </ModalContainer280>
        </ModalOverlay>
      )}
    </div>
  );
};

const Link = styled.a`
  img {
    width: 194px;
    height: 47px;
  }
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Button = styled.button`
  background-color: #3f51b5;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #303f9f;
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align: center;
`;
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  position: relative;
  width: 600px;
  height: 493px;
  background: #FFFFFF;
`;
const ModalContainer280 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  position: relative;
  width: 280px;
  height: 517px;
  background: #FFFFFF;
`;
const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 0px;
  gap: 10px;
  width: 600px;
  height: 111px;
  background: #4038FF;
`;
const ModalHeader280 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 0px;
  gap: 10px;
  width: 280px;
  height: 111px;
  background: #4038FF;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 80px;
  gap: 24px;
  width: 600px;
  height: 236px;
  button {
    background-color: #4caf50;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
  }
`;
const ModalContent280 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 20px;
  gap: 24px;
  width: 280px;
  height: 517px;
  button {
    background-color: #4caf50;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
  }
`;
const ContentTitle = styled.div`
  width: 440px;
  height: 32px;
  /* H/3 - Bold */
  font-family: 'Px Grotesk';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  /* identical to box height, or 133% */
  color: #000000;
`
const ContentTitle280 = styled.div`
  width: 240px;
  height: 32px;
  /* H/3 - Bold */
  font-family: 'Px Grotesk';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  /* identical to box height, or 133% */
  color: #000000;
`
const ContentBody = styled.div`
  width: 440px;
  height: 48px;
  /* Body/1 - Regular */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  /* or 150% */
  color: #000000;
`
const ContentBody280 = styled.div`
  width: 240px;
  height: 72px;
  /* Body/1 - Regular */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  /* or 150% */
  color: #000000;
`
const ContentView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 16px;

  width: 144px;
  height: 44px;

  background: #4038FF;
  border-radius: 2px;

  p {
    width: 112px;
    height: 20px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    /* identical to box height, or 20px */
    color: #FFFFFF;
  }
`
const ModalFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 80px 20px;
  gap: 10px;
  width: 600px;
  height: 146px;
  background: #000000;
`;
const ModalFooter280 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 80px 20px;
  gap: 10px;
  width: 280px;
  height: 146px;
  background: #000000;
`;
const FavIcon = styled.a`
  img {
    width: 24px;
    height: 24px;
  }
`
const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 3px;

  width: 193px;
  // height: 68px;
`
const PioneerLink = styled.div`
  width: 77px;
  height: 20px;
`
const JoystreamLink = styled.div`
  width: 95px;
  height: 20px;
`
const LinkRow = styled.div`
  font-family: 'Px Grotesk';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  display: flex;
  align-items: center;
  text-align: center;

  /* Black/25 */

  color: #F9FAFC;
`
const CouncilLink = styled.div`
  width: 38px;
  height: 14px;
  `
const ProposalsLink = styled.div`
  width: 49px;
  height: 14px;
  `
const ForumLink = styled.div`
  width: 32px;
  height: 14px;
  `
const DetailRow = styled.div`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 140%;
  color: #F9FAFC;

  display: flex;
  align-items: center;
  text-align: center;

`
const UnsubscribeRow = styled.div`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 140%;
  color: #C4CCD6;
  padding-top: 10px;
`

export default EmailNotification;
