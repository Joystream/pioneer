import React from 'react'
import styled from 'styled-components'

import MaintenanceLogo from '@/app/assets/images/MaintenanceLogo.png'
import { GlobalStyle } from '@/app/providers/GlobalStyle'
import { TextBig, TextExtraHuge } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export const MaintenanceScreen = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <img src={MaintenanceLogo} alt="Logo of Pioneer application" />
        <TextExtraHuge>We’ll be right back!</TextExtraHuge>
        <TextBig lighter>
          Pioneer is currently undergoing maintenance work in order to ensure the best features and performance for our
          users.
        </TextBig>
      </Container>
    </>
  )
}

const Container = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;

  display: grid;
  gap: 20px;
  align-content: center;
  justify-items: center;

  background-color: ${Colors.Black[850]};

  ${TextExtraHuge} {
    color: #fff;
    font-size: 32px;
    margin-top: 100px;
  }

  p {
    max-width: max(30%, 400px);
    text-align: center;
  }
`
